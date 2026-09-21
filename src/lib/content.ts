// Site copy. Short on purpose — see STRATEGY.md for the thinking behind it.

export const hero = {
  headline: "Pay for views, not followers.",
  sub: "Brief creators, review their work, and pay them the moment it's approved — all in one place.",
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
    title: "Get paid instantly",
    body: "Brands fund once. Creators are paid the moment work is approved.",
  },
] as const;

export const finalCta = {
  heading: "Run your first brief this week.",
  cta: "Get started",
};
