'use client';

import Button from '@/components/ui/Button';

interface ProcessStepProps {
  value: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function ProcessStep({
  value,
  onChange,
  onNext,
  onBack,
}: ProcessStepProps) {
  const isValid = value.trim().length > 0;

  return (
    <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 max-w-3xl">
      {/* Section label */}
      <div className="step-label mb-2">Processo</div>
      <div className="divider mb-10" />

      <div className="flex items-start gap-6 md:gap-10">
        <span className="step-number">01</span>
        <div className="flex-1 pt-3">
          <h2 className="font-editorial text-[1.5rem] md:text-[1.875rem] leading-[1.2] text-primary">
            Qual atividade ou processo da sua empresa hoje mais consome tempo ou
            dinheiro e impacta diretamente o seu negócio?
          </h2>
        </div>
      </div>

      <div className="mt-10">
        <textarea
          value={value}
          onChange={(e) => {
            if (e.target.value.length <= 300) {
              onChange(e.target.value);
            }
          }}
          placeholder="Escreva aqui o processo..."
          rows={4}
          className="resize-none text-base"
        />
        <div className="flex justify-end mt-2">
          <span className="text-xs text-muted">{value.length}/300</span>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        Exemplos: atendimento, vendas, pedidos, financeiro, produção,
        aprovação, cobrança.
      </p>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-12">
        <button
          onClick={onBack}
          className="text-sm text-secondary hover:text-primary flex items-center gap-1.5 cursor-pointer"
        >
          <span aria-hidden="true">←</span> Voltar
        </button>
        <Button onClick={onNext} disabled={!isValid}>
          Continuar <span aria-hidden="true">→</span>
        </Button>
      </div>
    </div>
  );
}
