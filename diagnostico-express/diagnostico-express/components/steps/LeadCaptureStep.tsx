'use client';

import { useState } from 'react';
import Button from '@/components/ui/Button';
import { LeadData } from '@/lib/types';

interface LeadCaptureStepProps {
  lead: LeadData;
  onUpdate: (lead: LeadData) => void;
  onNext: () => void;
}

export default function LeadCaptureStep({
  lead,
  onUpdate,
  onNext,
}: LeadCaptureStepProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const isValid = lead.name.trim() && lead.company.trim() && lead.whatsapp.trim();

  const handleSubmit = async () => {
    if (!isValid) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: lead.name.trim(),
          company: lead.company.trim(),
          whatsapp: lead.whatsapp.trim(),
          email: lead.email?.trim() || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Erro ao salvar dados.');
        setLoading(false);
        return;
      }

      onNext();
      // leadId is handled by parent via the response
      // We store it through a callback
      window.__leadId = data.leadId;
    } catch {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-16 py-12 max-w-2xl">
      {/* Section label */}
      <div className="step-label mb-2">Seus dados</div>
      <div className="divider mb-10" />

      <h2 className="font-editorial text-[1.75rem] md:text-[2.25rem] leading-[1.15] text-primary max-w-lg">
        Para gerar seu diagnóstico personalizado, informe seus dados.
      </h2>

      <div className="mt-12 space-y-8">
        {/* Nome */}
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-muted mb-1">
            Nome
          </label>
          <input
            type="text"
            placeholder="Seu nome"
            value={lead.name}
            onChange={(e) => onUpdate({ ...lead, name: e.target.value })}
          />
        </div>

        {/* Empresa */}
        <div>
          <label className="block text-xs tracking-[0.1em] uppercase text-muted mb-1">
            Empresa
          </label>
          <input
            type="text"
            placeholder="Nome da empresa"
            value={lead.company}
            onChange={(e) => onUpdate({ ...lead, company: e.target.value })}
          />
        </div>

        {/* WhatsApp + Email */}
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="flex-1">
            <label className="block text-xs tracking-[0.1em] uppercase text-muted mb-1">
              WhatsApp
            </label>
            <input
              type="tel"
              placeholder="(41) 91234-5678"
              value={lead.whatsapp}
              onChange={(e) => onUpdate({ ...lead, whatsapp: e.target.value })}
            />
          </div>
          <div className="flex-1">
            <label className="block text-xs tracking-[0.1em] uppercase text-muted mb-1">
              E-mail <span className="normal-case">(opcional)</span>
            </label>
            <input
              type="email"
              placeholder="seu@email.com"
              value={lead.email || ''}
              onChange={(e) => onUpdate({ ...lead, email: e.target.value })}
            />
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-6 text-sm text-red-600">{error}</p>
      )}

      <div className="mt-12">
        <Button onClick={handleSubmit} disabled={!isValid || loading}>
          {loading ? 'Salvando...' : 'Começar diagnóstico →'}
        </Button>
      </div>

      <p className="mt-6 text-[0.6875rem] text-muted flex items-center gap-1.5">
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" className="opacity-50">
          <rect x="2" y="6" width="8" height="7" rx="1" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M4 6V4C4 2.89543 4.89543 2 6 2V2C7.10457 2 8 2.89543 8 4V6" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
        Seus dados estão protegidos e serão utilizados apenas para este diagnóstico.
      </p>
    </div>
  );
}

// Extend window for leadId passing
declare global {
  interface Window {
    __leadId?: string;
  }
}
