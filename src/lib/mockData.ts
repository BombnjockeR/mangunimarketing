// Mock data layer. Shapes here are written to match what a real backend
// would return, so swapping in real endpoints later is a data-fetching
// change, not a component rewrite.

export type Role = "brand" | "creator";

export type BriefStatus = "todo" | "in_progress" | "in_review" | "done";

export interface Brief {
  id: string;
  title: string;
  brand: string;
  creator: string;
  platform: "instagram" | "tiktok";
  status: BriefStatus;
  dueDate: string;
  payout: number; // USD, cents-free for mock simplicity
  thumbnail: string; // emoji stand-in for artwork
  brief: string;
}

export interface Pin {
  id: string;
  x: number; // percent
  y: number; // percent
  note: string;
  resolved: boolean;
  author: string;
  createdAt: string;
}

export interface PostPerformance {
  id: string;
  briefId: string;
  platform: "instagram" | "tiktok";
  postedAt: string;
  views: number;
  likes: number;
  comments: number;
  shares: number;
  retention: number; // percent watched through
  history: { day: string; views: number }[];
}

export interface Transaction {
  id: string;
  briefId: string;
  creator: string;
  amount: number;
  status: "escrowed" | "released" | "pending_review";
  releasedAt?: string;
  milestone: string;
}

export const briefs: Brief[] = [
  {
    id: "b1",
    title: "Unboxing — Aurora Skincare set",
    brand: "Aurora Skincare",
    creator: "Nadia Putri",
    platform: "tiktok",
    status: "in_review",
    dueDate: "2026-09-24",
    payout: 450,
    thumbnail: "🧴",
    brief: "15s vertical unboxing, hook in first 2s, show texture on skin, end on the 3-step routine card.",
  },
  {
    id: "b2",
    title: "Reel — Kopi Senja cold brew, café-hop edit",
    brand: "Kopi Senja",
    creator: "Rizky Ramadhan",
    platform: "instagram",
    status: "in_progress",
    dueDate: "2026-09-23",
    payout: 300,
    thumbnail: "☕️",
    brief: "30s café-hop montage, natural light only, no on-screen text over the pour shot.",
  },
  {
    id: "b3",
    title: "TikTok — Bela Running Co. treadmill test",
    brand: "Bela Running Co.",
    creator: "Amelia Wong",
    platform: "tiktok",
    status: "todo",
    dueDate: "2026-09-28",
    payout: 600,
    thumbnail: "👟",
    brief: "Honest first-run review, include a full-speed clip and a cooldown clip, mention the arch support.",
  },
  {
    id: "b4",
    title: "Reel — Studio Alun home décor styling",
    brand: "Studio Alun",
    creator: "Nadia Putri",
    platform: "instagram",
    status: "done",
    dueDate: "2026-09-18",
    payout: 380,
    thumbnail: "🪴",
    brief: "Before/after styling of one corner, warm tone grade, caption should ask a question.",
  },
  {
    id: "b5",
    title: "TikTok — Warung Digital app walkthrough",
    brand: "Warung Digital",
    creator: "Fajar Nugroho",
    platform: "tiktok",
    status: "in_progress",
    dueDate: "2026-09-25",
    payout: 250,
    thumbnail: "📱",
    brief: "Screen-record checkout flow, voiceover in Bahasa, keep it under 40s.",
  },
  {
    id: "b6",
    title: "Reel — Aurora Skincare SPF launch",
    brand: "Aurora Skincare",
    creator: "Amelia Wong",
    platform: "instagram",
    status: "todo",
    dueDate: "2026-10-01",
    payout: 500,
    thumbnail: "☀️",
    brief: "Morning routine framing, SPF applied last, outdoor daylight shot to close.",
  },
];

export const pins: Record<string, Pin[]> = {
  b1: [
    {
      id: "p1",
      x: 28,
      y: 62,
      note: "Texture close-up is too dark — reshoot near the window light.",
      resolved: false,
      author: "Aurora Skincare",
      createdAt: "2026-09-20T09:12:00",
    },
    {
      id: "p2",
      x: 70,
      y: 20,
      note: "Love the hook — keep this exact framing.",
      resolved: true,
      author: "Aurora Skincare",
      createdAt: "2026-09-19T14:03:00",
    },
    {
      id: "p3",
      x: 50,
      y: 85,
      note: "Swap the end card font to match the brand kit (Poppins, not the default).",
      resolved: false,
      author: "Aurora Skincare",
      createdAt: "2026-09-20T09:15:00",
    },
  ],
};

export const performance: PostPerformance[] = [
  {
    id: "pp1",
    briefId: "b4",
    platform: "instagram",
    postedAt: "2026-09-18",
    views: 184200,
    likes: 12400,
    comments: 340,
    shares: 890,
    retention: 71,
    history: [
      { day: "Day 1", views: 42000 },
      { day: "Day 2", views: 91000 },
      { day: "Day 3", views: 138000 },
      { day: "Day 4", views: 163000 },
      { day: "Day 5", views: 178000 },
      { day: "Day 6", views: 184200 },
    ],
  },
  {
    id: "pp2",
    briefId: "b2",
    platform: "instagram",
    postedAt: "2026-09-15",
    views: 56300,
    likes: 3100,
    comments: 88,
    shares: 210,
    retention: 58,
    history: [
      { day: "Day 1", views: 9000 },
      { day: "Day 2", views: 21000 },
      { day: "Day 3", views: 34000 },
      { day: "Day 4", views: 44000 },
      { day: "Day 5", views: 51000 },
      { day: "Day 6", views: 56300 },
    ],
  },
  {
    id: "pp3",
    briefId: "b5",
    platform: "tiktok",
    postedAt: "2026-09-12",
    views: 412000,
    likes: 38900,
    comments: 1200,
    shares: 5400,
    retention: 82,
    history: [
      { day: "Day 1", views: 88000 },
      { day: "Day 2", views: 176000 },
      { day: "Day 3", views: 260000 },
      { day: "Day 4", views: 330000 },
      { day: "Day 5", views: 383000 },
      { day: "Day 6", views: 412000 },
    ],
  },
  {
    id: "pp4",
    briefId: "b1",
    platform: "tiktok",
    postedAt: "2026-09-10",
    views: 91500,
    likes: 6700,
    comments: 210,
    shares: 460,
    retention: 64,
    history: [
      { day: "Day 1", views: 18000 },
      { day: "Day 2", views: 38000 },
      { day: "Day 3", views: 58000 },
      { day: "Day 4", views: 74000 },
      { day: "Day 5", views: 85000 },
      { day: "Day 6", views: 91500 },
    ],
  },
  {
    id: "pp5",
    briefId: "b6",
    platform: "instagram",
    postedAt: "2026-09-08",
    views: 27800,
    likes: 1900,
    comments: 52,
    shares: 90,
    retention: 49,
    history: [
      { day: "Day 1", views: 4000 },
      { day: "Day 2", views: 9500 },
      { day: "Day 3", views: 15200 },
      { day: "Day 4", views: 20800 },
      { day: "Day 5", views: 25000 },
      { day: "Day 6", views: 27800 },
    ],
  },
  {
    id: "pp6",
    briefId: "b3",
    platform: "tiktok",
    postedAt: "2026-09-05",
    views: 268000,
    likes: 21300,
    comments: 780,
    shares: 3100,
    retention: 76,
    history: [
      { day: "Day 1", views: 52000 },
      { day: "Day 2", views: 108000 },
      { day: "Day 3", views: 162000 },
      { day: "Day 4", views: 210000 },
      { day: "Day 5", views: 245000 },
      { day: "Day 6", views: 268000 },
    ],
  },
];

export const transactions: Transaction[] = [
  { id: "t1", briefId: "b4", creator: "Nadia Putri", amount: 380, status: "released", releasedAt: "2026-09-18T16:40:00", milestone: "Final delivery approved" },
  { id: "t2", briefId: "b1", creator: "Nadia Putri", amount: 225, status: "pending_review", milestone: "Draft 1 (50% milestone)" },
  { id: "t3", briefId: "b2", creator: "Rizky Ramadhan", amount: 150, status: "escrowed", milestone: "Draft 1 (50% milestone)" },
  { id: "t4", briefId: "b5", creator: "Fajar Nugroho", amount: 250, status: "released", releasedAt: "2026-09-12T11:05:00", milestone: "Final delivery approved" },
  { id: "t5", briefId: "b3", creator: "Amelia Wong", amount: 600, status: "escrowed", milestone: "Brief funded, awaiting draft" },
];

export const walletBalance = {
  brand: { funded: 18500, escrowed: 3200, available: 15300 },
  creator: { lifetimeEarned: 4260, availableNow: 225, pendingReview: 600 },
};

export const statusLabel: Record<BriefStatus, string> = {
  todo: "To do",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
};
