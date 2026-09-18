// ============================================================
// Diagnóstico Express — Tipos TypeScript
// ============================================================

// --- Identificadores internos de P2 (Impacto) ---
export type ImpactOption =
  | 'REDUZIR_CUSTOS'
  | 'ATENDER_MAIS_CLIENTES'
  | 'VENDER_MAIS'
  | 'LIBERAR_PESSOAS'
  | 'REDUZIR_ERROS_RETRABALHO'
  | 'OUTRO'
  | 'NAO_SEI';

// --- Identificadores internos de P3 (Fricção) ---
export type FrictionOption =
  | 'TAREFAS_MANUAIS'
  | 'REPETICAO'
  | 'DEPENDENCIA_PESSOA'
  | 'MUITAS_ETAPAS'
  | 'INFORMACAO_ESPALHADA'
  | 'DECISOES_MANUAIS'
  | 'ERROS_RETRABALHO'
  | 'OUTRO'
  | 'NAO_SEI';

// --- Hipóteses ---
export type HypothesisCode = 'H01' | 'H02' | 'H03' | 'H04' | 'H05' | 'H06' | 'H07';

// --- Classificação final ---
export type Classification = 'SINAL_FORTE' | 'SINAL_A_INVESTIGAR' | 'INFORMACAO_INSUFICIENTE';

// --- Resultado do motor ---
export interface DiagnosisResult {
  hypotheses: HypothesisCode[];
  classification: Classification;
}

// --- Dados do lead ---
export interface LeadData {
  name: string;
  company: string;
  whatsapp: string;
  email?: string;
}

// --- Respostas do diagnóstico ---
export interface DiagnosticResponses {
  process: string;
  impact: ImpactOption[];
  impactOther?: string;
  frictions: FrictionOption[];
  frictionOther?: string;
}

// --- Estado global do wizard ---
export interface WizardState {
  step: number;
  leadId: string | null;
  lead: LeadData;
  responses: DiagnosticResponses;
  result: DiagnosisResult | null;
}

// --- Labels para exibição ---
export const IMPACT_LABELS: Record<ImpactOption, string> = {
  REDUZIR_CUSTOS: 'Reduzir custos',
  ATENDER_MAIS_CLIENTES: 'Atender mais clientes',
  VENDER_MAIS: 'Vender mais',
  LIBERAR_PESSOAS: 'Liberar pessoas para atividades estratégicas',
  REDUZIR_ERROS_RETRABALHO: 'Reduzir erros e retrabalho',
  OUTRO: 'Outro',
  NAO_SEI: 'Não sei',
};

export const FRICTION_LABELS: Record<FrictionOption, string> = {
  TAREFAS_MANUAIS: 'Muitas tarefas manuais',
  REPETICAO: 'Repetição de informações ou tarefas',
  DEPENDENCIA_PESSOA: 'Depende de uma pessoa específica',
  MUITAS_ETAPAS: 'Muitas etapas ou aprovações',
  INFORMACAO_ESPALHADA: 'Informações espalhadas em diferentes ferramentas',
  DECISOES_MANUAIS: 'Decisões que precisam ser tomadas manualmente',
  ERROS_RETRABALHO: 'Erros e retrabalho',
  OUTRO: 'Outro',
  NAO_SEI: 'Não sei',
};
