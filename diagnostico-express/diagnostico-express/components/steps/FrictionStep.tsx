'use client';

import Button from '@/components/ui/Button';
import EditorialCheckbox from '@/components/ui/EditorialCheckbox';
import { FrictionOption, FRICTION_LABELS } from '@/lib/types';

interface FrictionStepProps {
  selected: FrictionOption[];
  otherText: string;
  onChange: (selected: FrictionOption[], otherText: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const OPTIONS: FrictionOption[] = [
  'TAREFAS_MANUAIS',
  'REPETICAO',
  'DEPENDENCIA_PESSOA',
  'MUITAS_ETAPAS',
  'INFORMACAO_ESPALHADA',
  'DECISOES_MANUAIS',
  'ERROS_RETRABALHO',
  'OUTRO',
  'NAO_SEI',
];

export default function FrictionStep({
  selected,
  otherText,
  onChange,
  onNext,
  onBack,
}: FrictionStepProps) {
  const handleToggle = (option: FrictionOption) => {
    let newSelected = [...selected];

    if (option === 'NAO_SEI') {
      if (newSelected.includes('NAO_SEI')) {
        newSelected = [];
      } else {
        newSelected = ['NAO_SEI'];
      }
      onChange(newSelected, '');
      return;
    }

    // Remove NAO_SEI se selecionou outra opção
    newSelected = newSelected.filter((o) => o !== 'NAO_SEI');

    if (newSelected.includes(option)) {
      newSelected = newSelected.filter((o) => o !== option);
      if (option === 'OUTRO') {
        onChange(newSelected, '');
        return;
      }
    } else {
      // Máximo 3 opções
      if (newSelected.length >= 3) return;
      newSelected.push(option);
    }

    onChange(newSelected, option === 'OUTRO' ? '' : otherText);
  };

  const isDisabled = (option: FrictionOption) => {
    if (option === 'NAO_SEI') return false;
    if (selected.includes('NAO_SEI')) return true;
    if (selected.length >= 3 && !selected.includes(option)) return true;
    return false;
  };

  // Validation: at least 1 option, and if OUTRO is selected, otherText required
  const isValid =
    selected.length > 0 &&
    (!selected.includes('OUTRO') || otherText.trim().length > 0);

  return (
    <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 max-w-3xl">
      {/* Section label */}
      <div className="step-label mb-2">Fonte de fricção</div>
      <div className="divider mb-10" />

      <div className="flex items-start gap-6 md:gap-10">
        <span className="step-number">03</span>
        <div className="flex-1 pt-3">
          <h2 className="font-editorial text-[1.5rem] md:text-[1.875rem] leading-[1.2] text-primary">
            O que torna esse processo demorado, caro ou sujeito a erros hoje?
          </h2>
          <p className="mt-3 text-sm text-muted">
            Selecione até 3 opções.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-0">
        {OPTIONS.map((option) => (
          <div key={option} className="border-b border-border-light last:border-b-0">
            <EditorialCheckbox
              label={FRICTION_LABELS[option]}
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
          Ver resultado <span aria-hidden="true">→</span>
        </Button>
      </div>
    </div>
  );
}
