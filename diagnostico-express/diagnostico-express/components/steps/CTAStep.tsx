'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { DiagnosticResponses, DiagnosisResult, IMPACT_LABELS } from '@/lib/types';
import { HYPOTHESES } from '@/lib/hypotheses';
import { Classification } from '@/lib/types';

interface CTAStepProps {
  leadId: string;
  responses: DiagnosticResponses;
  result: DiagnosisResult;
  whatsappNumber: string;
}

const CLASSIFICATION_DISPLAY: Record<Classification, { icon: string; label: string }> = {
  SINAL_FORTE: { icon: '🟢', label: 'SINAL FORTE' },
  SINAL_A_INVESTIGAR: { icon: '🟡', label: 'SINAL A INVESTIGAR' },
  INFORMACAO_INSUFICIENTE: { icon: '⚪', label: 'INFORMAÇÃO INSUFICIENTE' },
};

export default function CTAStep({
  leadId,
  responses,
  result,
  whatsappNumber,
}: CTAStepProps) {
  const [status, setStatus] = useState<'asking' | 'declined'>('asking');

  const updateInterest = async (interest: 'interested' | 'not_now') => {
    try {
      await fetch('/api/interest', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ leadId, interest }),
      });
    } catch {
      // Silent — non-blocking
    }
  };

  const handleWhatsApp = async () => {
    await updateInterest('interested');
    const cleanNumber = whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${cleanNumber}`, '_blank');
  };

  const handleNotNow = async () => {
    await updateInterest('not_now');
    setStatus('declined');
  };

  const handleDownload = () => {
    const cls = CLASSIFICATION_DISPLAY[result.classification];
    let text = `DIAGNÓSTICO EXPRESS — RESULTADO\n\n`;
    text += `${cls.icon} ${cls.label}\n\n`;
    text += `PROCESSO: ${responses.process}\n`;
    text += `IMPACTO: ${responses.impact.map((i) => IMPACT_LABELS[i]).join(', ')}`;
    if (responses.impactOther) text += ` — ${responses.impactOther}`;
    text += `\n\n`;
    if (result.hypotheses.length > 0) {
      result.hypotheses.forEach((h) => {
        const hyp = HYPOTHESES[h];
        text += `${h} — ${hyp.name}\n${hyp.title}\n${hyp.description}\nHipótese: ${hyp.hypothesis}\nO que investigar: ${hyp.investigate}\n\n`;
      });
    }
    text += `Uma análise detalhada pode identificar quais etapas podem ser automatizadas, quais decisões precisam permanecer humanas e onde a automação poderia gerar maior impacto.\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagnostico-express.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  if (status === 'declined') {
    return (
      <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 py-16 text-center max-w-xl mx-auto">
        <h2 className="font-editorial text-[1.75rem] md:text-[2.25rem] leading-[1.15] text-primary">
          Tudo bem.
        </h2>
        <p className="mt-4 text-[0.9375rem] text-secondary leading-relaxed">
          Seu diagnóstico já está registrado.
        </p>
        <p className="mt-6 text-sm text-muted leading-relaxed max-w-sm">
          Quando quiser aprofundar essa análise, podemos partir exatamente do
          processo que você identificou hoje.
        </p>
        <div className="mt-10">
          <button
            onClick={handleDownload}
            className="text-sm text-secondary hover:text-primary flex items-center gap-2 cursor-pointer border border-border px-6 py-3"
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
            Salvar meu diagnóstico
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col justify-center items-center px-6 md:px-12 py-16 text-center max-w-xl mx-auto">
      <h2 className="font-editorial text-[1.75rem] md:text-[2.25rem] leading-[1.15] text-primary">
        Quer aprofundar essa análise?
      </h2>

      <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">
        <Button onClick={handleWhatsApp}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="opacity-80"
          >
            <path d="M8.002 0C3.58 0 0 3.58 0 8.002a7.95 7.95 0 001.074 3.99L0 16l4.12-1.06A7.96 7.96 0 008.002 16C12.42 16 16 12.42 16 8.002S12.42 0 8.002 0zm4.61 11.292c-.193.545-1.13 1.04-1.558 1.07-.428.033-.833.193-2.804-.583-2.372-.934-3.86-3.36-3.977-3.517-.117-.157-.96-1.275-.96-2.432 0-1.157.607-1.727.822-1.962.215-.235.47-.294.626-.294s.313.003.45.008c.145.006.338-.055.529.403.193.466.66 1.608.718 1.724.058.117.097.254.02.41-.078.156-.117.254-.234.39-.117.137-.247.306-.352.41-.117.117-.24.245-.103.48.137.235.608 1.003 1.305 1.624.896.8 1.65 1.048 1.885 1.165.235.117.373.098.51-.058.137-.157.588-.685.745-.921.157-.235.313-.196.529-.117.215.078 1.374.648 1.608.766.235.117.392.176.45.274.058.098.058.567-.136 1.113z" />
          </svg>
          Quero conversar pelo WhatsApp
        </Button>
      </div>

      <div className="mt-8">
        <button
          onClick={handleNotNow}
          className="text-sm text-muted hover:text-secondary cursor-pointer"
        >
          Agora não
        </button>
      </div>
    </div>
  );
}
