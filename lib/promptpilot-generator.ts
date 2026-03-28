import type {
  BrandDirectionOutput,
  BrandVisualizerInput,
  CalendarDayPlan,
  CampaignInput,
  CampaignOutput,
  ContentCalendarInput,
  ContentCalendarOutput,
  ImagePromptInput,
  ImagePromptOutput,
  ImagePromptVariation,
  LandingCopyInput,
  LandingCopyOutput,
  OutputBundle,
  StoryboardInput,
  StoryboardOutput,
  StoryboardScene,
  VideoPromptInput,
  VideoPromptOutput
} from "@/lib/promptpilot-types";

function hashSeed(value: string) {
  return Array.from(value).reduce((total, character, index) => {
    return total + character.charCodeAt(0) * (index + 17);
  }, 0);
}

function pick<T>(items: T[], seed: number, offset = 0) {
  return items[(seed + offset) % items.length];
}

function pickMany<T>(items: T[], seed: number, count: number, offset = 0) {
  return Array.from({ length: count }, (_, index) => pick(items, seed, offset + index * 3));
}

const conceptBlueprints = [
  "Authority-building education",
  "Offer-led conversion sprint",
  "Lifestyle aspiration campaign",
  "Trust and proof sequence",
  "Before-and-after transformation",
  "Limited-slot launch reveal",
  "Community credibility rollout",
  "Founder-led expert insight"
];

const heroAngles = [
  "Lead with the high-contrast problem, then move quickly into the promised outcome.",
  "Show the product in context so the audience can picture the upgrade immediately.",
  "Frame the campaign around proof, momentum, and ease rather than feature overload.",
  "Use a premium editorial tone with concise claims and one strong primary action."
];

const hookTemplates = [
  "Still relying on {oldWay}? {businessName} makes {result} feel simple.",
  "What if {audience} could get {result} without the usual {pain}?",
  "{offer} is how {businessName} turns {goal} into a fast decision.",
  "This is the {platform} angle built to stop the scroll for {audience}.",
  "From first glance to booked action: the {businessType} campaign built for {goal}.",
  "Most {audience} do not need more noise. They need a sharper path to {result}.",
  "The creative system behind {businessName}'s next {goal} push starts with one promise."
];

const ctaTemplates = [
  "Book a strategy call",
  "Claim the launch offer",
  "See the campaign plan",
  "Get the proof deck",
  "Reserve your spot",
  "Request the concept pack"
];

const messagingPillarTemplates = [
  "Clarity: make the outcome obvious in the first three seconds.",
  "Proof: use believable specifics, numbers, and client cues to reduce friction.",
  "Ease: position the offer as the simpler next step for busy buyers.",
  "Momentum: create urgency without sounding desperate or promotional.",
  "Fit: speak directly to the audience's current stage, not a generic market."
];

const painPointTemplates = [
  "They are tired of generic providers promising the same thing.",
  "They do not have time to decode vague offers or unclear packages.",
  "They want confidence before they commit budget or attention.",
  "They need creative that feels premium without becoming abstract or over-designed.",
  "They are comparing options quickly and default to whoever feels most trusted."
];

const transitionTemplates = [
  "Match cut into the next proof beat",
  "Fast push with text wipe",
  "Soft dissolve into branded close-up",
  "Snap zoom into CTA frame",
  "Lateral swipe to shift pacing"
];

const sceneGoals = [
  "Set context and define the buyer tension",
  "Reveal the offer in a visually memorable way",
  "Anchor the claim with proof or transformation",
  "Introduce the emotional payoff",
  "Drive a clean call to action"
];

const contentThemes = [
  "Audience pain-point decode",
  "Founder perspective",
  "Offer spotlight",
  "Behind-the-scenes craft",
  "Case study proof",
  "Quick-tip carousel",
  "Myth versus reality"
];

const contentFormats = [
  "Short-form video",
  "Carousel",
  "Single image",
  "Founder note",
  "Story sequence",
  "Mini case study"
];

const proofIdeas = [
  "Feature a client result with one precise metric and the setup behind it.",
  "Show the campaign pack itself as a deliverable buyers receive after onboarding.",
  "Highlight the speed from brief to approved direction with a small timeline.",
  "Use side-by-side before and after messaging examples to show the upgrade."
];

const typographyMoods = [
  "Editorial sans with bold geometric headlines",
  "High-contrast display type for hero moments",
  "Clean grotesk body copy with roomy spacing",
  "Condensed accent headlines for offer cards"
];

const colorSystems = [
  "Graphite, mineral white, and tidepool teal",
  "Midnight navy, parchment, and ember orange",
  "Deep forest, warm sand, and polished copper",
  "Charcoal, shell, and signal coral"
];

export interface PromptPilotGenerator {
  generateCampaign(input: CampaignInput): CampaignOutput;
  generateStoryboard(input: StoryboardInput): StoryboardOutput;
  generateImagePrompts(input: ImagePromptInput): ImagePromptOutput;
  generateVideoPrompts(input: VideoPromptInput): VideoPromptOutput;
  generateBrandDirection(input: BrandVisualizerInput): BrandDirectionOutput;
  generateContentCalendar(input: ContentCalendarInput): ContentCalendarOutput;
  generateLandingCopy(input: LandingCopyInput): LandingCopyOutput;
  generateBundle(input: CampaignInput): OutputBundle;
}

class MockPromptPilotGenerator implements PromptPilotGenerator {
  generateCampaign(input: CampaignInput): CampaignOutput {
    const seed = hashSeed(JSON.stringify(input));
    const result = `${input.campaignObjective.toLowerCase()} on ${input.platform}`;
    const pain = pick(painPointTemplates, seed).toLowerCase().replace(/\.$/, "");

    return {
      concepts: pickMany(conceptBlueprints, seed, 3).map((concept, index) => ({
        title: `${input.businessName} ${concept}`,
        summary: `${input.businessName} positions ${input.productService} as the easiest way for ${input.audience.toLowerCase()} to move toward ${input.campaignObjective.toLowerCase()}, using a ${input.tone.toLowerCase()} voice and a ${input.visualStyle.toLowerCase()} presentation system.`,
        heroAngle: pick(heroAngles, seed, index),
        channelStrategy: `Designed for ${input.platform} with ${input.ctaPreference.toLowerCase()} as the primary action and ${input.offer.toLowerCase()} as the conversion hook.`
      })),
      adHooks: pickMany(hookTemplates, seed, 5).map((template) =>
        template
          .replace("{oldWay}", "fragmented creative")
          .replace("{businessName}", input.businessName)
          .replace("{result}", result)
          .replace("{audience}", input.audience)
          .replace("{pain}", pain)
          .replace("{offer}", input.offer)
          .replace("{goal}", input.campaignObjective)
          .replace("{platform}", input.platform)
          .replace("{businessType}", input.businessType)
      ),
      ctaIdeas: pickMany(ctaTemplates, seed, 3),
      messagingPillars: pickMany(messagingPillarTemplates, seed, 4),
      audiencePainPoints: pickMany(painPointTemplates, seed, 4),
      valuePropositionSummary: `${input.businessName} gives ${input.audience.toLowerCase()} a clearer path to ${input.campaignObjective.toLowerCase()} by turning ${input.productService.toLowerCase()} into premium, platform-ready campaign direction without the lag of a traditional agency process.`
    };
  }

  private buildScenes(input: StoryboardInput, count: number) {
    const seed = hashSeed(`${JSON.stringify(input)}-${count}`);

    return Array.from({ length: count }, (_, index) => {
      const number = index + 1;
      return {
        sceneNumber: number,
        title: `Scene ${number}: ${pick(contentThemes, seed, index)}`,
        shotDescription: `${pick(heroAngles, seed, index)} Frame the ${input.campaignConcept.toLowerCase()} angle with ${input.style.toLowerCase()} styling and ${input.pacing.toLowerCase()} pacing.`,
        textOverlay: number === count ? input.campaignConcept : `${input.platform} / ${input.emotionalTone}`,
        voiceover: `For ${input.duration}, keep the narration ${input.emotionalTone.toLowerCase()} and focused on why this matters right now.`,
        transition: pick(transitionTemplates, seed, index),
        goal: pick(sceneGoals, seed, index)
      } satisfies StoryboardScene;
    });
  }

  generateStoryboard(input: StoryboardInput): StoryboardOutput {
    return {
      threeSceneConcept: this.buildScenes(input, 3),
      fiveSceneConcept: this.buildScenes(input, 5),
      tenSceneConcept: this.buildScenes(input, 10)
    };
  }

  generateImagePrompts(input: ImagePromptInput): ImagePromptOutput {
    const seed = hashSeed(JSON.stringify(input));
    const prompts = pickMany(
      [
        "Hero product close-up",
        "Lifestyle conversion moment",
        "Editorial brand frame",
        "Offer announcement visual",
        "Premium behind-the-scenes scene"
      ],
      seed,
      3
    ).map((title, index) => {
      const advancedPrompt = `${title} for ${input.subject}, ${input.brandStyle.toLowerCase()} brand style, ${input.mood.toLowerCase()} mood, ${input.lighting.toLowerCase()} lighting, ${input.colorStyle.toLowerCase()} palette, ${input.composition.toLowerCase()} composition, optimized for ${input.platform}, ${input.realismLevel.toLowerCase()} rendering, premium advertising quality, sharp focal subject, brand-safe styling.`;

      return {
        title,
        shortPrompt: `${input.subject}, ${input.mood.toLowerCase()}, ${input.colorStyle.toLowerCase()}, ${input.composition.toLowerCase()}`,
        advancedPrompt,
        variationPrompt: `${advancedPrompt} Alternate variation: shift framing toward ${pick(
          ["closer crop", "wider environmental context", "more negative space", "layered foreground detail"],
          seed,
          index
        )}.`
      } satisfies ImagePromptVariation;
    });

    return {
      prompts,
      alternateDirections: pickMany(
        [
          "Minimal luxury studio direction with disciplined whitespace.",
          "Cinematic narrative direction with tactile textures and shadow play.",
          "Bold commercial direction with brighter contrast and assertive typography zones.",
          "Organic lifestyle direction with warmer tone and candid product interaction."
        ],
        seed,
        3
      )
    };
  }

  generateVideoPrompts(input: VideoPromptInput): VideoPromptOutput {
    const seed = hashSeed(JSON.stringify(input));
    const shared = `${input.productService}, ${input.style.toLowerCase()} style, ${input.duration}, ${input.cameraFeel.toLowerCase()} camera language, ${input.motionType.toLowerCase()} motion, ${input.emotionalTone.toLowerCase()} energy`;

    return {
      cinematicPrompt: `Create a cinematic ${input.campaignAngle.toLowerCase()} film for ${shared}. Focus on one central promise, polished transitions, and an ending built around ${input.ctaType.toLowerCase()}.`,
      productDemoPrompt: `Build a product demo sequence for ${shared}. Open on the problem, reveal the product in use, show one proof beat, and land on a clean ${input.ctaType.toLowerCase()} close.`,
      socialAdPrompt: `Produce a social ad for ${shared}. Hook in the first second, highlight the most buyer-relevant benefit, and keep overlays concise for mobile viewing.`,
      alternateHookVersions: pickMany(
        [
          "The smarter way to show the offer in under 15 seconds.",
          "What the buyer notices first when the creative finally feels premium.",
          "A sharper hook for audiences already comparing options.",
          "A scroll-stopping reveal anchored in proof instead of hype."
        ],
        seed,
        4
      ),
      textOverlayIdeas: pickMany(
        [
          "Built for teams who need faster conversion",
          "Premium direction without production drag",
          "Clear offer. Clear proof. Clear next step.",
          "From concept to campaign-ready assets",
          "Designed to move buyers, not just impress them"
        ],
        seed,
        5
      )
    };
  }

  generateBrandDirection(input: BrandVisualizerInput): BrandDirectionOutput {
    const seed = hashSeed(JSON.stringify(input));

    return {
      brandToneSummary: `${input.brandPersonality} positioning for ${input.targetAudience.toLowerCase()} with language that feels ${input.marketPosition.toLowerCase()} and consistently actionable.`,
      visualIdentityDirection: `Blend ${input.colorPreference.toLowerCase()} preferences with a ${input.contentStyle.toLowerCase()} system that feels confident in premium sales contexts and clean in everyday content workflows.`,
      campaignLookAndFeel: `The campaign world should feel ${input.brandPersonality.toLowerCase()}, composed, and ready for repeatable rollout across ${input.industry.toLowerCase()} touchpoints.`,
      suggestedColorSystem: pickMany(colorSystems, seed, 3),
      typographyMood: pickMany(typographyMoods, seed, 3),
      contentThemes: pickMany(contentThemes, seed, 5),
      brandSafeMessagingRules: [
        "Avoid vague superlatives unless a proof point follows immediately.",
        "Keep claims grounded in outcomes, speed, clarity, or trust.",
        "Use one primary CTA per asset to reduce decision friction.",
        "Preserve a premium tone by writing short, specific, high-confidence lines."
      ]
    };
  }

  private buildCalendarPlan(
    seed: number,
    count: number,
    input: ContentCalendarInput
  ): CalendarDayPlan[] {
    return Array.from({ length: count }, (_, index) => ({
      day: `Day ${index + 1}`,
      theme: pick(contentThemes, seed, index),
      format: pick(contentFormats, seed, index),
      hook: `${input.campaignTheme}: ${pick(
        [
          "start with the tension the buyer already feels",
          "turn the offer into a sharper contrast",
          "show the transformation before the explanation",
          "lead with a surprising truth the audience recognizes"
        ],
        seed,
        index
      )}`,
      cta: `${pick(ctaTemplates, seed, index)} on ${input.primaryPlatform}`
    }));
  }

  generateContentCalendar(input: ContentCalendarInput): ContentCalendarOutput {
    const seed = hashSeed(JSON.stringify(input));
    return {
      sevenDayPlan: this.buildCalendarPlan(seed, 7, input),
      thirtyDayPlan: this.buildCalendarPlan(seed + 11, 30, input),
      campaignSequence: [
        "Awareness burst with pattern-interrupt creative",
        "Credibility phase with proof and founder perspective",
        "Offer explanation with clearer CTA framing",
        "Retargeting sequence built around urgency and proof",
        "Conversion push with FAQ and objection handling"
      ]
    };
  }

  generateLandingCopy(input: LandingCopyInput): LandingCopyOutput {
    const seed = hashSeed(JSON.stringify(input));
    return {
      headline: `${input.businessName} turns ${input.productService.toLowerCase()} into a clearer yes for ${input.audience.toLowerCase()}.`,
      subheadline: `Use a ${input.tone.toLowerCase()} landing page narrative to move visitors toward ${input.primaryGoal.toLowerCase()} while making ${input.offer.toLowerCase()} the obvious next step.`,
      benefits: [
        "Clarifies the offer in language buyers can act on quickly.",
        "Builds trust with proof-led framing instead of generic promises.",
        "Keeps the CTA visible without overwhelming the page narrative."
      ],
      featureBlurbs: [
        "Campaign-ready hero copy with immediate offer context.",
        "Benefit blocks written for scanability and buyer confidence.",
        "Proof section prompts that make testimonials and numbers easier to place."
      ],
      ctaVariations: pickMany(ctaTemplates, seed, 3),
      proofSectionIdeas: pickMany(proofIdeas, seed, 3),
      faqPrompts: [
        "What makes this offer different from the usual option?",
        "How quickly can a client expect to see movement?",
        "Who is this best suited for right now?",
        "What happens after the first strategy call?"
      ]
    };
  }

  generateBundle(input: CampaignInput): OutputBundle {
    const campaign = this.generateCampaign(input);
    const storyboard = this.generateStoryboard({
      campaignConcept: campaign.concepts[0]?.title ?? `${input.businessName} launch angle`,
      duration: "30 seconds",
      style: input.visualStyle,
      platform: input.platform,
      pacing: "Punchy but premium",
      emotionalTone: input.tone
    });
    const imagePrompts = this.generateImagePrompts({
      brandStyle: input.visualStyle,
      subject: input.productService,
      mood: input.tone,
      lighting: "Cinematic soft key light",
      colorStyle: "Brand-led, premium contrast",
      composition: "Layered focal composition",
      platform: input.platform,
      realismLevel: "Photoreal with art-directed polish"
    });
    const videoPrompts = this.generateVideoPrompts({
      productService: input.productService,
      campaignAngle: campaign.concepts[0]?.title ?? input.campaignObjective,
      style: input.visualStyle,
      duration: "15-30 seconds",
      cameraFeel: "Confident handheld with smooth push-ins",
      motionType: "Purposeful movement",
      emotionalTone: input.tone,
      ctaType: input.ctaPreference
    });
    const brandDirection = this.generateBrandDirection({
      industry: input.businessType,
      brandPersonality: input.tone,
      colorPreference: "Elevated contrast with controlled accent color",
      targetAudience: input.audience,
      marketPosition: "Premium but approachable",
      contentStyle: input.visualStyle
    });
    const contentCalendar = this.generateContentCalendar({
      businessType: input.businessType,
      audience: input.audience,
      campaignTheme: campaign.concepts[0]?.title ?? input.campaignObjective,
      primaryPlatform: input.platform,
      cadence: "5 posts per week",
      offer: input.offer
    });
    const landingCopy = this.generateLandingCopy({
      businessName: input.businessName,
      productService: input.productService,
      audience: input.audience,
      offer: input.offer,
      tone: input.tone,
      primaryGoal: input.campaignObjective
    });

    return {
      id: `bundle-${input.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      projectId: `project-${input.businessName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
      stylePreset: input.visualStyle,
      updatedAt: new Date("2026-03-28T06:45:00.000Z").toISOString(),
      campaign,
      storyboard,
      imagePrompts,
      videoPrompts,
      brandDirection,
      contentCalendar,
      landingCopy
    };
  }
}

const generator = new MockPromptPilotGenerator();

export function getPromptPilotGenerator() {
  return generator;
}
