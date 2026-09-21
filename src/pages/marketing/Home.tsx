import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { Icon } from "../../components/Icons";
import { hero, roles, features, pricing, finalCta } from "../../lib/content";

export function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-b from-[#8b6cff] via-[#6d4aff] to-[#4c2fd6] text-white">
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-20 text-center sm:px-8 sm:pt-28">
          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-6xl">{hero.headline}</h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/85 sm:text-xl">{hero.sub}</p>

          <div className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
            <RoleCard
              icon={<Icon.briefcase className="h-7 w-7" />}
              title={roles.brand.title}
              body={roles.brand.body}
              cta={roles.brand.cta}
              to="/login?role=brand"
            />
            <RoleCard
              icon={<Icon.sparkle className="h-7 w-7" />}
              title={roles.creator.title}
              body={roles.creator.body}
              cta={roles.creator.cta}
              to="/login?role=creator"
            />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <h2 className="text-3xl font-bold sm:text-4xl">Everything in one place</h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-3">
          {features.map((f) => {
            const I = Icon[f.icon];
            return (
              <div key={f.title} className="rounded-2xl bg-paper p-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-signal shadow-sm">
                  <I className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{f.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-paper py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-5 text-center sm:px-8">
          <h2 className="text-3xl font-bold sm:text-4xl">{pricing.heading}</h2>
          <p className="mx-auto mt-3 max-w-md text-mist">{pricing.sub}</p>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            {pricing.tiers.map((t) => (
              <div key={t.views} className="rounded-2xl bg-white p-6 shadow-sm">
                <div className="text-sm text-mist">{t.views} views</div>
                <div className="mt-2 text-2xl font-bold">{t.price}</div>
                <div className="mt-1 text-xs text-mist">per 15s post</div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm font-medium text-signal-dim">{pricing.note}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="rounded-3xl bg-charcoal px-6 py-14 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">{finalCta.heading}</h2>
          <Link
            to="/login"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-charcoal hover:bg-white/90"
          >
            {finalCta.cta}
            <Icon.arrow className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}

function RoleCard({
  icon,
  title,
  body,
  cta,
  to,
}: {
  icon: React.ReactNode;
  title: string;
  body: string;
  cta: string;
  to: string;
}) {
  return (
    <div className="rounded-2xl border border-white/25 bg-white/10 p-7 text-center backdrop-blur-sm">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-white/15">{icon}</div>
      <h2 className="mt-5 text-xl font-bold">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-white/80">{body}</p>
      <Link
        to={to}
        className="mt-6 block rounded-full bg-white py-3 text-sm font-semibold text-signal-dim hover:bg-white/90"
      >
        {cta}
      </Link>
    </div>
  );
}
