import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { LiveFeedWall } from "../../components/LiveFeedWall";
import { hero, trustBar, painPoints, features, forCreators, paymentStory, finalCta } from "../../lib/content";

export function Home() {
  return (
    <div className="min-h-screen bg-ink">
      <Navbar />

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-5 pb-16 pt-14 sm:px-8 sm:pt-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm text-mist">{hero.eyebrow}</p>
            <h1 className="mt-4 max-w-xl font-display text-4xl leading-[1.08] text-paper sm:text-5xl">
              {hero.headline}
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist">{hero.sub}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/login"
                className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-white hover:bg-signal/90"
              >
                {hero.ctaPrimary}
              </Link>
              <a href="#product" className="text-sm text-paper underline decoration-ink-line underline-offset-4 hover:decoration-paper">
                {hero.ctaSecondary}
              </a>
            </div>
          </div>
          <LiveFeedWall />
        </div>

        <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-ink-line/60 pt-8 text-sm text-mist">
          <span className="text-xs uppercase tracking-wide text-mist/70">Running briefs with</span>
          {trustBar.map((b) => (
            <span key={b}>{b}</span>
          ))}
        </div>
      </section>

      {/* Pain points */}
      <section id="product" className="bg-paper py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="max-w-xl font-display text-3xl leading-tight text-charcoal">
            The friction isn't finding creators. It's everything after.
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2">
            {painPoints.map((p) => (
              <div key={p.title} className="border-t border-charcoal/15 pt-5">
                <h3 className="font-display text-lg text-charcoal">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="bg-ink py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <h2 className="max-w-xl font-display text-3xl leading-tight text-paper">
            One workspace, from brief to paid.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {features.map((f) => (
              <div key={f.name} className="rounded-lg border border-ink-line bg-ink-soft p-6">
                <h3 className="font-display text-lg text-paper">{f.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* For creators */}
      <section id="creators" className="border-t border-ink-line/60 bg-ink py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-3xl leading-tight text-paper">{forCreators.heading}</h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-mist">{forCreators.sub}</p>
              <Link
                to="/login"
                className="mt-8 inline-block rounded-md border border-mist/40 px-5 py-3 text-sm font-medium text-paper hover:border-paper"
              >
                See open briefs
              </Link>
            </div>
            <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
              {forCreators.points.map((p) => (
                <div key={p.title} className="border-t border-ink-line pt-4">
                  <h3 className="font-display text-base text-paper">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Payment story */}
      <section id="payment" className="bg-paper py-20">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <h2 className="font-display text-3xl leading-tight text-charcoal">{paymentStory.heading}</h2>
              <p className="mt-4 text-sm leading-relaxed text-charcoal/70">{paymentStory.body}</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {paymentStory.steps.map((s, i) => (
                <div key={s.label} className="rounded-lg border border-charcoal/15 bg-white p-5">
                  <div className="font-data text-xs text-signal">{String(i + 1).padStart(2, "0")}</div>
                  <div className="mt-3 font-display text-base text-charcoal">{s.label}</div>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/70">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-ink py-24">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <h2 className="mx-auto max-w-2xl font-display text-3xl leading-tight text-paper sm:text-4xl">
            {finalCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-mist">{finalCta.sub}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/login"
              className="rounded-md bg-signal px-5 py-3 text-sm font-medium text-white hover:bg-signal/90"
            >
              {finalCta.ctaPrimary}
            </Link>
            <Link
              to="/login"
              className="rounded-md border border-ink-line px-5 py-3 text-sm font-medium text-paper hover:border-mist"
            >
              {finalCta.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
