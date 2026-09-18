'use client';

import Button from '@/components/ui/Button';
import EditorialCheckbox from '@/components/ui/EditorialCheckbox';
import { ImpactOption, IMPACT_LABELS } from '@/lib/types';

interface ImpactStepProps {
  selected: ImpactOption[];
  otherText: string;
  onChange: (selected: ImpactOption[], otherText: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const OPTIONS: ImpactOption[] = [
  'REDUZIR_CUSTOS',
  'ATENDER_MAIS_CLIENTES',
  'VENDER_MAIS',
  'LIBERAR_PESSOAS',
  'REDUZIR_ERROS_RETRABALHO',
  'OUTRO',
  'NAO_SEI',
];

export default function ImpactStep({
  selected,
  otherText,
  onChange,
  onNext,
  onBack,
}: ImpactStepProps) {
  const handleToggle = (option: ImpactOption) => {
    let newSelected = [...selected];

    if (option === 'NAO_SEI') {
      // NAO_SEI é exclusiva
      if (newSelected.includes('NAO_SEI')) {
        newSelected = [];
      } else {
        newSelected = ['NAO_SEI'];
      }
      onChange(newSelected, '');
      return;
    }

    // Se selecionou algo diferente de NAO_SEI, remove NAO_SEI
    newSelected = newSelected.filter((o) => o !== 'NAO_SEI');

    if (newSelected.includes(option)) {
      newSelected = newSelected.filter((o) => o !== option);
      if (option === 'OUTRO') {
        onChange(newSelected, '');
        return;
      }
    } else {
      // Máximo 2 opções
      if (newSelected.length >= 2) return;
      newSelected.push(option);
    }

    onChange(newSelected, option === 'OUTRO' ? '' : otherText);
  };

  const isDisabled = (option: ImpactOption) => {
    if (option === 'NAO_SEI') return false;
    if (selected.includes('NAO_SEI')) return true;
    if (selected.length >= 2 && !selected.includes(option)) return true;
    return false;
  };

  // Validation: at least 1 option, and if OUTRO is selected, otherText required
  const isValid =
    selected.length > 0 &&
    (!selected.includes('OUTRO') || otherText.trim().length > 0);

  return (
    <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 max-w-3xl">
      {/* Section label */}
      <div className="step-label mb-2">Impacto</div>
      <div className="divider mb-10" />

      <div className="flex items-start gap-6 md:gap-10">
        <span className="step-number">02</span>
        <div className="flex-1 pt-3">
          <h2 className="font-editorial text-[1.5rem] md:text-[1.875rem] leading-[1.2] text-primary">
            Se esse processo fosse mais eficiente, qual seria o principal
            impacto para o seu negócio?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Selecione até 2 opções.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-0">
        {OPTIONS.map((option) => (
          <div key={option} className="border-b border-border-light last:border-b-0">
            <EditorialCheckbox
              label={IMPACT_LABELS[option]}
              checked={selected.includes(option)}
              disabled={isDisabled(option)}
              onChange={() => handleToggle(option)}
              showTextField={option === 'OUTRO'}
              textValue={otherText}
              onTextChange={(val) => onChange(selected, val)}
              textPlaceholder="Qual?"
            />
          </div>
        ))}
      </div>

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
