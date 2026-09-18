'use client';

import Button from '@/components/ui/Button';

interface LandingStepProps {
  onNext: () => void;
}

export default function LandingStep({ onNext }: LandingStepProps) {
  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Left — Editorial text */}
        <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 lg:py-0">
          <h1 className="font-editorial text-[2.5rem] md:text-[3.25rem] lg:text-[3.75rem] leading-[1.1] text-primary max-w-lg">
            Sua empresa pode ir mais longe.
          </h1>
          <p className="mt-8 text-base md:text-lg text-secondary max-w-md leading-relaxed">
            Vamos identificar onde sua empresa pode estar perdendo tempo,
            dinheiro ou capacidade operacional.
          </p>
          <p className="mt-3 text-sm text-muted">Leva menos de 1 minuto.</p>
          <div className="mt-10">
            <Button onClick={onNext}>
              Continuar <span aria-hidden="true">→</span>
            </Button>
          </div>
          <div className="mt-auto pt-16 pb-4">
            <span className="text-[0.625rem] tracking-[0.15em] uppercase text-muted">
              Diagnóstico Express
            </span>
          </div>
        </div>

        {/* Right — Editorial image block */}
        <div className="hidden lg:flex w-[45%] relative">
          <div className="absolute inset-0 bg-surface-alt">
            {/* Editorial image — contemporary office/process environment */}
            <div
              className="absolute inset-0 bg-cover bg-center opacity-90"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80")',
              }}
            />
            {/* Overlay text block */}
            <div className="absolute bottom-0 right-0 bg-accent/90 text-white px-8 py-10">
              <div className="text-[0.6875rem] tracking-[0.2em] uppercase leading-[2.2]">
                Processos
                <br />
                Pessoas
                <br />
                Tecnologia
                <br />
                Resultados.
              </div>
            </div>
          </div>
          {/* Decorative side text */}
          <div className="absolute bottom-8 left-8">
            <div className="text-[0.5625rem] tracking-[0.15em] uppercase text-white/70 leading-[2]">
              Pequenas
              <br />
              perguntas.
              <br />
              Grandes
              <br />
              possibilidades.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
