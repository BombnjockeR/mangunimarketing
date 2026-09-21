// Site copy. Short on purpose — see STRATEGY.md for the thinking behind it.

export const hero = {
  headline: "Pay for views, not followers.",
  sub: "Creator content for your campaigns — briefed, approved, and boosted as ads, from one place.",
};

// Fixed prices by target views. Answers "how much?" before anyone asks.
export const pricing = {
  heading: "Simple pricing. Fixed by target views.",
  sub: "Paid usage rights included, so the winners can run as ads from your own account.",
  tiers: [
    { views: "10K+", price: "$170" },
    { views: "50K+", price: "$360" },
    { views: "100K+", price: "$670" },
    { views: "250K+", price: "$1,470" },
  ],
  note: "Typical result: $3–5 CPM vs. $9+ on paid social.",
};

export const roles = {
  brand: {
    title: "I'm a brand",
    body: "Post a brief, get matched with creators, and see what every post actually did.",
    cta: "Start a campaign",
  },
  creator: {
    title: "I'm a creator",
    body: "Get picked for your views, not your follower count. Get paid the same day.",
    cta: "Join as a creator",
  },
};

export const features = [
  {
    icon: "users",
    title: "Find the right creators",
    body: "Ranked by what their last ten posts did — not how many people follow them.",
  },
  {
    icon: "pin",
    title: "Review in one place",
    body: "Click on the frame to leave a note. No more feedback lost in chat threads.",
  },
  {
    icon: "bolt",
    title: "Boost what works",
    body: "See cost per view next to your paid ads. Put budget behind the winners.",
  },
] as const;

export const finalCta = {
  heading: "Run your first brief this week.",
  cta: "Get started",
};
