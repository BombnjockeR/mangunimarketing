import type { BriefStatus } from "../lib/mockData";

const colors: Record<BriefStatus, string> = {
  todo: "bg-mist",
  in_progress: "bg-gold",
  in_review: "bg-signal",
  done: "bg-aurora",
};

export function StatusDot({ status }: { status: BriefStatus }) {
  return <span className={`inline-block h-2 w-2 rounded-full ${colors[status]}`} aria-hidden />;
}
