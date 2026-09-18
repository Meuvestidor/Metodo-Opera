'use client';

interface HeaderProps {
  step?: string;
  showStep?: boolean;
}

export default function Header({ step, showStep = true }: HeaderProps) {
  return (
    <header className="w-full px-6 md:px-12 py-6 flex items-center justify-between">
      <div>
        <div className="text-xs tracking-[0.2em] uppercase font-medium text-primary">
          Diagnóstico Express
        </div>
        <div className="text-[0.625rem] tracking-[0.1em] text-muted mt-0.5">
          Processos mais simples. Negócios mais fortes.
        </div>
      </div>
      {showStep && step && (
        <div className="step-label">{step}</div>
      )}
    </header>
  );
}
