export function Footer() {
  return (
    <footer className="border-t border-charcoal/[0.06] bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <span className="font-semibold text-charcoal">Manguni</span>
        <span>© {new Date().getFullYear()} · Prototype — payments are simulated</span>
      </div>
    </footer>
  );
}
