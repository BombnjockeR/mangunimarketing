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
