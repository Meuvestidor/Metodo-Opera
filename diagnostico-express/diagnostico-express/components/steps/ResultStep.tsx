'use client';

import Button from '@/components/ui/Button';
import {
  DiagnosisResult,
  DiagnosticResponses,
  IMPACT_LABELS,
  Classification,
} from '@/lib/types';
import { HYPOTHESES } from '@/lib/hypotheses';

interface ResultStepProps {
  responses: DiagnosticResponses;
  result: DiagnosisResult;
  onNext: () => void;
}

const CLASSIFICATION_DISPLAY: Record<
  Classification,
  { icon: string; label: string; color: string }
> = {
  SINAL_FORTE: {
    icon: '🟢',
    label: 'SINAL FORTE',
    color: 'text-signal-green',
  },
  SINAL_A_INVESTIGAR: {
    icon: '🟡',
    label: 'SINAL A INVESTIGAR',
    color: 'text-signal-yellow',
  },
  INFORMACAO_INSUFICIENTE: {
    icon: '⚪',
    label: 'INFORMAÇÃO INSUFICIENTE',
    color: 'text-signal-gray',
  },
};

function generateDiagnosticText(
  responses: DiagnosticResponses,
  result: DiagnosisResult
): string {
  const cls = CLASSIFICATION_DISPLAY[result.classification];
  let text = `DIAGNÓSTICO EXPRESS — RESULTADO\n\n`;
  text += `${cls.icon} ${cls.label}\n\n`;
  text += `Há indícios de uma oportunidade de automação.\n\n`;
  text += `Identificamos um processo que impacta diretamente o negócio e apresenta sinais que podem estar consumindo tempo, dinheiro ou capacidade operacional.\n\n`;
  text += `PROCESSO: ${responses.process}\n\n`;
  text += `IMPACTO: ${responses.impact.map((i) => IMPACT_LABELS[i]).join(', ')}`;
  if (responses.impactOther) text += ` — ${responses.impactOther}`;
  text += `\n\n`;

  if (result.hypotheses.length > 0) {
    text += `HIPÓTESES IDENTIFICADAS:\n\n`;
    result.hypotheses.forEach((h) => {
      const hyp = HYPOTHESES[h];
      text += `${h} — ${hyp.name}\n`;
      text += `${hyp.title}\n`;
      text += `${hyp.description}\n`;
      text += `Hipótese: ${hyp.hypothesis}\n`;
      text += `O que investigar: ${hyp.investigate}\n\n`;
    });
  }

  text += `Uma análise detalhada pode identificar quais etapas podem ser automatizadas, quais decisões precisam permanecer humanas e onde a automação poderia gerar maior impacto.\n`;
  return text;
}

export default function ResultStep({
  responses,
  result,
  onNext,
}: ResultStepProps) {
  const cls = CLASSIFICATION_DISPLAY[result.classification];
  const hasHypotheses = result.hypotheses.length > 0;

  const handleDownload = () => {
    const text = generateDiagnosticText(responses, result);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnostico-express.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col lg:flex-row">
      {/* Left — Decorative editorial column */}
      <div className="hidden lg:flex w-[30%] bg-surface-alt flex-col justify-between px-10 py-16">
        <div>
          <div className="text-[0.6875rem] tracking-[0.2em] uppercase text-muted leading-[2.5]">
            Análise
            <br />
            que gera
            <br />
            clareza
            <br />
            para o seu
            <br />
            próximo
            <br />
            passo.
          </div>
        </div>
        <div>
          <div className="text-[0.625rem] tracking-[0.15em] uppercase text-muted leading-[2.2] font-medium">
            Processos
            <br />
            mais simples.
            <br />
            Negócios
            <br />
            mais fortes.
          </div>
        </div>
      </div>

      {/* Right — Result content */}
      <div className="flex-1 px-6 md:px-12 lg:px-16 py-12 lg:py-16 overflow-y-auto">
        <div className="step-label mb-8">Resultado</div>

        {/* Classification badge */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-lg">{cls.icon}</span>
          <span
            className={`text-xs tracking-[0.2em] uppercase font-semibold ${cls.color}`}
          >
            {cls.label}
          </span>
        </div>

        {hasHypotheses ? (
          <>
            {/* Primary hypothesis title */}
            <h2 className="font-editorial text-[1.75rem] md:text-[2.25rem] leading-[1.15] text-primary max-w-lg">
              {HYPOTHESES[result.hypotheses[0]].title}
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-secondary max-w-lg">
              {HYPOTHESES[result.hypotheses[0]].description}
            </p>
          </>
        ) : (
          <>
            <h2 className="font-editorial text-[1.75rem] md:text-[2.25rem] leading-[1.15] text-primary max-w-lg">
              {result.classification === 'SINAL_A_INVESTIGAR'
                ? 'Há indícios de uma oportunidade de automação'
                : 'Informação insuficiente para gerar uma hipótese'}
            </h2>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-secondary max-w-lg">
              Identificamos um processo que impacta diretamente o negócio e
              apresenta sinais que podem estar consumindo tempo, dinheiro ou
              capacidade operacional.
            </p>
          </>
        )}

        {/* Process + Impact summary */}
        <div className="mt-10 space-y-4">
          <div className="flex gap-8">
            <span className="text-[0.6875rem] tracking-[0.15em] uppercase text-muted w-40 flex-shrink-0">
              Processo
            </span>
            <span className="text-[0.9375rem] text-primary">
              {responses.process}
            </span>
          </div>
          <div className="divider" />
          <div className="flex gap-8">
            <span className="text-[0.6875rem] tracking-[0.15em] uppercase text-muted w-40 flex-shrink-0">
              Impacto
            </span>
            <span className="text-[0.9375rem] text-primary">
              {responses.impact.map((i) => IMPACT_LABELS[i]).join(', ')}
              {responses.impactOther ? ` — ${responses.impactOther}` : ''}
            </span>
          </div>

          {hasHypotheses && (
            <>
              <div className="divider" />
              <div className="flex gap-8">
                <span className="text-[0.6875rem] tracking-[0.15em] uppercase text-muted w-40 flex-shrink-0">
                  Hipótese identificada
                </span>
                <span className="text-[0.9375rem] text-primary">
                  {result.hypotheses
                    .map((h) => `${h} — ${HYPOTHESES[h].name}`)
                    .join(' · ')}
                </span>
              </div>
            </>
          )}
        </div>

        {/* Micro-results for all hypotheses */}
        {hasHypotheses && (
          <div className="mt-10 space-y-6">
            {result.hypotheses.map((h) => (
              <div key={h} className="bg-surface-alt px-6 py-5">
                <div className="text-[0.6875rem] tracking-[0.15em] uppercase text-muted mb-3">
                  O que investigar
                </div>
                <p className="text-[0.9375rem] leading-relaxed text-primary">
                  {HYPOTHESES[h].investigate}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Closing text */}
        <p className="mt-10 text-[0.875rem] leading-relaxed text-secondary max-w-lg">
          Uma análise detalhada pode identificar quais etapas podem ser
          automatizadas, quais decisões precisam permanecer humanas e onde a
          automação poderia gerar maior impacto.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-12">
          <Button onClick={onNext}>
            Avançar <span aria-hidden="true">→</span>
          </Button>
          <button
            onClick={handleDownload}
            className="text-sm text-secondary hover:text-primary flex items-center gap-2 cursor-pointer"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="opacity-60"
            >
              <path
                d="M7 1v9M3.5 7L7 10.5 10.5 7M2 13h10"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="square"
              />
            </svg>
            Baixar meu diagnóstico
          </button>
        </div>
      </div>
    </div>
  );
}
