create extension if not exists pgcrypto;

create type public.user_role as enum ('admin', 'team_member', 'viewer');
create type public.project_status as enum ('Draft', 'Generating', 'Review', 'Ready', 'Archived');

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.current_workspace_role()
returns public.user_role
language sql
stable
as $$
  select role
  from public.profiles
  where auth_user_id = auth.uid()
  limit 1
$$;

create or replace function public.is_workspace_member(target_workspace_id text)
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.profiles
    where auth_user_id = auth.uid()
      and workspace_id = target_workspace_id
  )
$$;

create or replace function public.can_edit_workspace(target_workspace_id text)
returns boolean
language sql
stable
as $$
  select exists(
    select 1
    from public.profiles
    where auth_user_id = auth.uid()
      and workspace_id = target_workspace_id
      and role in ('admin', 'team_member')
  )
$$;

create table if not exists public.workspaces (
  id text primary key,
  name text not null,
  slug text not null unique,
  company_name text not null,
  plan text not null,
  accent_hsl text not null,
  support_email text,
  logo_placeholder text not null,
  seat_count integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id text primary key,
  auth_user_id uuid unique,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  full_name text not null,
  email text not null unique,
  title text not null,
  avatar text not null,
  role public.user_role not null default 'viewer',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.settings (
  id text primary key,
  workspace_id text not null unique references public.workspaces(id) on delete cascade,
  portal_name text not null,
  workspace_name text not null,
  company_name text not null,
  logo_placeholder text not null,
  accent_hsl text not null,
  support_email text not null,
  default_tone text not null,
  default_platform text not null,
  default_cta_style text not null,
  future_api_settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.templates (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  name text not null,
  industry text not null,
  summary text not null,
  best_for text not null,
  deliverables jsonb not null default '[]'::jsonb,
  style_preset text not null,
  platform_focus jsonb not null default '[]'::jsonb,
  category text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  template_id text references public.templates(id) on delete set null,
  name text not null,
  client_name text not null,
  industry text not null,
  business_type text not null,
  business_name text not null,
  product_service text not null,
  audience text not null,
  goal text not null,
  platform text not null,
  tone text not null,
  offer text not null,
  preferred_output text not null,
  owner_name text not null,
  description text not null,
  tags jsonb not null default '[]'::jsonb,
  favorite boolean not null default false,
  archived boolean not null default false,
  status public.project_status not null default 'Draft',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.campaigns (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  project_id text not null unique references public.projects(id) on delete cascade,
  input_payload jsonb not null default '{}'::jsonb,
  output_payload jsonb not null default '{}'::jsonb,
  summary text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.storyboards (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  project_id text not null unique references public.projects(id) on delete cascade,
  output_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.image_prompts (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  project_id text not null unique references public.projects(id) on delete cascade,
  output_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.video_prompts (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  project_id text not null unique references public.projects(id) on delete cascade,
  output_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.brand_profiles (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  project_id text references public.projects(id) on delete set null,
  name text not null,
  industry text not null,
  personality text not null,
  audience text not null,
  content_style text not null,
  color_system jsonb not null default '[]'::jsonb,
  tone_summary text not null,
  messaging_rules jsonb not null default '[]'::jsonb,
  typography_mood jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_calendars (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  project_id text not null unique references public.projects(id) on delete cascade,
  output_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.prompt_packs (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  project_id text not null references public.projects(id) on delete cascade,
  name text not null,
  pack_type text not null,
  owner_name text not null,
  sections jsonb not null default '[]'::jsonb,
  status text not null,
  exported_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.exports (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  project_id text references public.projects(id) on delete cascade,
  title text not null,
  export_type text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  profile_id text references public.profiles(id) on delete set null,
  title text not null,
  description text not null,
  unread boolean not null default true,
  audience text not null default 'all',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.activity_logs (
  id text primary key,
  workspace_id text not null references public.workspaces(id) on delete cascade,
  profile_id text references public.profiles(id) on delete set null,
  project_id text references public.projects(id) on delete set null,
  category text not null,
  title text not null,
  detail text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger workspaces_set_updated_at before update on public.workspaces for each row execute function public.set_updated_at();
create trigger profiles_set_updated_at before update on public.profiles for each row execute function public.set_updated_at();
create trigger settings_set_updated_at before update on public.settings for each row execute function public.set_updated_at();
create trigger templates_set_updated_at before update on public.templates for each row execute function public.set_updated_at();
create trigger projects_set_updated_at before update on public.projects for each row execute function public.set_updated_at();
create trigger campaigns_set_updated_at before update on public.campaigns for each row execute function public.set_updated_at();
create trigger storyboards_set_updated_at before update on public.storyboards for each row execute function public.set_updated_at();
create trigger image_prompts_set_updated_at before update on public.image_prompts for each row execute function public.set_updated_at();
create trigger video_prompts_set_updated_at before update on public.video_prompts for each row execute function public.set_updated_at();
create trigger brand_profiles_set_updated_at before update on public.brand_profiles for each row execute function public.set_updated_at();
create trigger content_calendars_set_updated_at before update on public.content_calendars for each row execute function public.set_updated_at();
create trigger prompt_packs_set_updated_at before update on public.prompt_packs for each row execute function public.set_updated_at();
create trigger exports_set_updated_at before update on public.exports for each row execute function public.set_updated_at();
create trigger notifications_set_updated_at before update on public.notifications for each row execute function public.set_updated_at();
create trigger activity_logs_set_updated_at before update on public.activity_logs for each row execute function public.set_updated_at();

alter table public.workspaces enable row level security;
alter table public.profiles enable row level security;
alter table public.settings enable row level security;
alter table public.templates enable row level security;
alter table public.projects enable row level security;
alter table public.campaigns enable row level security;
alter table public.storyboards enable row level security;
alter table public.image_prompts enable row level security;
alter table public.video_prompts enable row level security;
alter table public.brand_profiles enable row level security;
alter table public.content_calendars enable row level security;
alter table public.prompt_packs enable row level security;
alter table public.exports enable row level security;
alter table public.notifications enable row level security;
alter table public.activity_logs enable row level security;

create policy "workspace members can view workspace" on public.workspaces
  for select using (public.is_workspace_member(id));

create policy "workspace members can view profiles" on public.profiles
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view settings" on public.settings
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view templates" on public.templates
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view projects" on public.projects
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view campaigns" on public.campaigns
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view storyboards" on public.storyboards
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view image prompts" on public.image_prompts
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view video prompts" on public.video_prompts
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view brand profiles" on public.brand_profiles
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view content calendars" on public.content_calendars
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view prompt packs" on public.prompt_packs
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view exports" on public.exports
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view notifications" on public.notifications
  for select using (public.is_workspace_member(workspace_id));

create policy "workspace members can view activity logs" on public.activity_logs
  for select using (public.is_workspace_member(workspace_id));

create policy "editors can manage profiles" on public.profiles
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage settings" on public.settings
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage templates" on public.templates
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage projects" on public.projects
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage campaigns" on public.campaigns
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage storyboards" on public.storyboards
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage image prompts" on public.image_prompts
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage video prompts" on public.video_prompts
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage brand profiles" on public.brand_profiles
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage content calendars" on public.content_calendars
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage prompt packs" on public.prompt_packs
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage exports" on public.exports
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage notifications" on public.notifications
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));

create policy "editors can manage activity logs" on public.activity_logs
  for all using (public.can_edit_workspace(workspace_id))
  with check (public.can_edit_workspace(workspace_id));
