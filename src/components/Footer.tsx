export function Footer() {
  return (
    <footer className="border-t border-ink-line/60 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="font-display text-lg text-paper">Manguni</div>
          <p className="max-w-sm text-sm text-mist">
            Built for brand teams and creators who'd rather look at what a post
            actually did than how many people were following before it went up.
          </p>
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-mist">
          <span>© {new Date().getFullYear()} Manguni</span>
          <span>This is a working prototype — payments shown are mocked.</span>
        </div>
      </div>
    </footer>
  );
}
