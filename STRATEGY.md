# Manguni — strategy note

## Where creator marketing is heading (12–24 months)

1. **Views replace followers as the unit of trust.** Follower counts are inflatable
   and stale; they measure an account's history, not whether *this* piece of
   content will move product. Platforms already reward distribution over
   subscription (For You / Explore / Suggested), so a 4,000-follower creator
   can outperform a 400,000-follower one on a given brief. Brands that keep
   buying followers are buying the wrong metric. Expect deal terms to shift
   from "rate per post" to "rate per guaranteed view band," the way TV moved
   from show sponsorship to GRPs.
2. **The unit of work shrinks from "campaign" to "brief."** Instead of one
   quarterly campaign with one agency, brands run a constant stream of small,
   specific briefs ("15s UGC unboxing, vertical, hook in first 2s") to a pool
   of creators, and keep what performs. This only works if briefing, review
   and payout are fast enough to run continuously — which is an operations
   problem, not a creative one.
3. **Whoever removes payment friction wins the supply side.** Creators are
   increasingly treating brand work like gig work: they compare who pays
   fastest, not just who pays most. A brand able to pay on delivery (or
   escrow + instant release) will get first pick of in-demand creators over
   a brand on 60-day net terms.
4. **Performance proof becomes part of the deliverable**, not a separate
   reporting step brands chase weeks later. Creators who can hand over
   verified view/engagement data at delivery (not "trust me, check my
   profile") close deals faster and command a premium.
5. **Review and revision become the bottleneck**, not sourcing creators.
   As brief volume goes up, the expensive part stops being "find a
   creator" and becomes "get async, specific feedback to them without a
   40-message WhatsApp thread," especially for teams reviewing video/image
   drafts against brand guidelines.

## Feature list, mapped to who it's for and what pain it removes

| Feature | For | Pain point it solves |
|---|---|---|
| Brief marketplace (post a brief, creators apply or get matched) | Brand | Sourcing creators per-brief instead of per-campaign is slow by hand |
| Creator scorecards ranked by *recent view performance*, not follower count | Brand | Follower count doesn't predict performance |
| Work board (To do / In progress / In review / Done) per brief | Both | No shared source of truth for where deliverables stand |
| Visual review tool — pin comments directly on the image/frame | Both | Feedback over chat/email is vague and gets lost |
| Connected performance dashboard (views, engagement, retention by post) | Both | Reporting is manual, delayed, and easy to dispute |
| Escrow-based instant payout | Both | Brands can't wire money same-day at scale; creators want to be paid on delivery, not on a 30–60 day invoice cycle |
| Rate-card / auto-quote by expected view band | Both | Negotiating price per creator per brief doesn't scale |
| Brand guideline library attached to every brief | Both | Creators re-ask the same questions; brands repeat themselves |

## The payment problem, specifically

The mismatch: a brand's finance team pays creators through a batch AP process
(invoice → approval → batch run) that takes days to weeks, because paying
hundreds of individual creators one wire at a time doesn't scale on their
side. A creator, meanwhile, delivered today and wants to be paid today —
underpayment risk is a bigger day-to-day problem for creators than
under-exposure.

The fix isn't "pay faster" on the brand's existing process — it's decoupling
the two clocks:

- The brand funds a **campaign wallet** up front (one transfer, batched,
  fits existing AP workflow) or is approved for **post-paid credit** if
  established.
- The moment a deliverable is approved, Manguni releases the creator's cut
  **immediately** from that pooled balance — the creator never waits on the
  brand's individual payment run.
- Manguni carries the float / underwrites the gap for approved brands, and
  takes a small fee on the instant-release leg (like a card network) rather
  than making the creator wait.
- Everything is milestone-based, so partial delivery = partial release, not
  all-or-nothing — this also reduces revision disputes because money isn't
  on the table until a specific milestone is marked approved.

This is the same shape as payroll-advance or marketplace instant-payout
products (build it as a real integration later — the current version below
is a fully designed mock so the product can be evaluated end-to-end and the
real processor can be dropped in without changing any UI).

## Brand voice for the copy

Direct, a little contrarian, no hustle-bro energy. Say the quiet thing
("followers don't guarantee anything") plainly instead of hedging it. Speak
to both audiences without picking a side — brand copy leans operational,
creator copy leans respectful of their time and money. Avoid marketing
clichés ("supercharge," "unlock," "revolutionize").

---

## CMO review of the prototype (21 Sep 2026)

**What holds up.** The positioning is sharp and defensible. Creator
scorecards ranked by median views make the thesis tangible. Pin-based review
and instant payout each remove a real, daily friction. The UI is simple
enough for a first-time user.

**Where it fell short for a marketing team, and what changed:**

| Gap | Why a CMO cares | Fix shipped |
|---|---|---|
| Creator-collab tool, not a marketing platform | Marketing budgets live in paid media; creator posts matter as *ad creative* (Spark Ads / Partnership Ads) | "Boost as ad" on any post with paid rights; boosted spend/views/clicks roll into results |
| Views without cost is still vanity | The only number that survives a budget meeting is cost per outcome | Results leads with Spend, effective CPM, CPC — side by side with the brand's paid-social benchmark, plus "saved vs paid" |
| No campaign layer | Teams budget, pace and report by campaign, not by post | Campaigns page: budget pacing, views vs target, CPM, clicks, conversions, boost spend, per-brief status |
| Testing not operationalized | The thesis implies test-then-scale | Hook test card: variants compared on views/retention/clicks, winner flagged, one-click boost |
| No usage rights | Legal asks on day one; rights decide whether a post can become an ad | Rights chosen in the brief, priced into the quote (×1.4 / ×1.9), shown on cards and in Review; posts without paid rights can't be boosted |
| Approval and payment disconnected | Approval *is* the payment trigger | "Approve & pay" lives in Review and is gated on open notes being resolved |
| Numbers stuck in the app | Marketing lives in decks | CSV export of every post with spend and CPM |
| Homepage silent on price | "Pay for views" invites "how much?" | Fixed price tiers by target views, rights included, with the CPM comparison |

**Still missing for a production version (in priority order):**

1. Ad-account connections (Meta, TikTok) so the paid benchmark and boost
   results are real, not seeded — this makes the CPM comparison credible.
2. Attribution: tracked links / promo codes per post, feeding conversions.
3. Approval chains: content approval vs. spend approval above a threshold,
   with legal/brand-safety sign-off as an optional step.
4. Creative library: approved posts with rights and expiry dates, searchable
   by hook / product / performance, so the ads team can pull creative
   without asking.
5. Consolidated monthly invoice for finance — the operational selling point
   behind the "fund once" story.
6. Disclosure compliance (#ad) checks and platform policy flags before boost.
