'use client';

import { useState, useCallback } from 'react';
import Header from '@/components/ui/Header';
import LandingStep from '@/components/steps/LandingStep';
import LeadCaptureStep from '@/components/steps/LeadCaptureStep';
import ProcessStep from '@/components/steps/ProcessStep';
import ImpactStep from '@/components/steps/ImpactStep';
import FrictionStep from '@/components/steps/FrictionStep';
import ResultStep from '@/components/steps/ResultStep';
import CTAStep from '@/components/steps/CTAStep';
import { runDiagnosis } from '@/lib/diagnosis-engine';
import {
  WizardState,
  LeadData,
  ImpactOption,
  FrictionOption,
  DiagnosisResult,
} from '@/lib/types';

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';

const STEP_LABELS: Record<number, string> = {
  0: '01 / 05',
  1: '02 / 05',
  2: '03 / 05',
  3: '04 / 05',
  4: '05 / 05',
  5: 'Resultado',
  6: '',
};

export default function DiagnosticWizard() {
  const [state, setState] = useState<WizardState>({
    step: 0,
    leadId: null,
    lead: { name: '', company: '', whatsapp: '', email: '' },
    responses: {
      process: '',
      impact: [],
      impactOther: '',
      frictions: [],
      frictionOther: '',
    },
    result: null,
  });

  const goTo = useCallback((step: number) => {
    setState((prev) => ({ ...prev, step }));
    window.scrollTo(0, 0);
  }, []);

  const updateLead = useCallback((lead: LeadData) => {
    setState((prev) => ({ ...prev, lead }));
  }, []);

  const handleLeadSubmitted = useCallback(() => {
    // Retrieve leadId set by LeadCaptureStep
    const leadId = window.__leadId || null;
    setState((prev) => ({ ...prev, leadId, step: 2 }));
    window.scrollTo(0, 0);
  }, []);

  const updateProcess = useCallback((process: string) => {
    setState((prev) => ({
      ...prev,
      responses: { ...prev.responses, process },
    }));
  }, []);

  const updateImpact = useCallback(
    (impact: ImpactOption[], impactOther: string) => {
      setState((prev) => ({
        ...prev,
        responses: { ...prev.responses, impact, impactOther },
      }));
    },
    []
  );

  const updateFriction = useCallback(
    (frictions: FrictionOption[], frictionOther: string) => {
      setState((prev) => ({
        ...prev,
        responses: { ...prev.responses, frictions, frictionOther },
      }));
    },
    []
  );

  const handleRunDiagnosis = useCallback(async () => {
    const { impact, frictions } = state.responses;

    // Executar motor determinístico
    const result: DiagnosisResult = runDiagnosis(impact, frictions);

    setState((prev) => ({ ...prev, result, step: 5 }));
    window.scrollTo(0, 0);

    // Salvar respostas + resultado em Supabase
    try {
      await fetch('/api/responses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: state.leadId,
          process: state.responses.process,
          impact: state.responses.impact,
          impactOther: state.responses.impactOther || undefined,
          frictions: state.responses.frictions,
          frictionOther: state.responses.frictionOther || undefined,
          hypotheses: result.hypotheses,
          classification: result.classification,
        }),
      });
    } catch {
      // Silent — non-blocking for UX
    }
  }, [state.responses, state.leadId]);

  const showHeader = state.step > 0 && state.step <= 5;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with step counter */}
      {state.step === 0 && <Header step={STEP_LABELS[0]} />}
      {showHeader && <Header step={STEP_LABELS[state.step]} />}

      {/* Steps */}
      {state.step === 0 && <LandingStep onNext={() => goTo(1)} />}

      {state.step === 1 && (
        <LeadCaptureStep
          lead={state.lead}
          onUpdate={updateLead}
          onNext={handleLeadSubmitted}
        />
      )}

      {state.step === 2 && (
        <ProcessStep
          value={state.responses.process}
          onChange={updateProcess}
          onNext={() => goTo(3)}
          onBack={() => goTo(1)}
        />
      )}

      {state.step === 3 && (
        <ImpactStep
          selected={state.responses.impact}
          otherText={state.responses.impactOther || ''}
          onChange={updateImpact}
          onNext={() => goTo(4)}
          onBack={() => goTo(2)}
        />
      )}

      {state.step === 4 && (
        <FrictionStep
          selected={state.responses.frictions}
          otherText={state.responses.frictionOther || ''}
          onChange={updateFriction}
          onNext={handleRunDiagnosis}
          onBack={() => goTo(3)}
        />
      )}

      {state.step === 5 && state.result && (
        <ResultStep
          responses={state.responses}
          result={state.result}
          onNext={() => goTo(6)}
        />
      )}

      {state.step === 6 && state.result && state.leadId && (
        <CTAStep
          leadId={state.leadId}
          responses={state.responses}
          result={state.result}
          whatsappNumber={WHATSAPP_NUMBER}
        />
      )}
    </div>
  );
}
