export function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-charcoal/10">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4 text-center">
        <p className="text-charcoal/70 text-base">
          Работу выполнил Березин Денис, студент 1 курса НИУ ВШЭ, направление ПАДИИ
        </p>
        <p className="text-charcoal/50 text-xs">
          © {new Date().getFullYear()} Дворцы Ленинградской области. deni6kas.
        </p>
      </div>
    </footer>
  );
}
