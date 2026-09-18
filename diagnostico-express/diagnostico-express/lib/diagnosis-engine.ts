// ============================================================
// Motor de Diagnóstico — Regras determinísticas
// Avalia H01–H07 independentemente (sem else-if).
// NÃO utilizar LLM. NÃO criar hipóteses com base em P1.
// ============================================================

import {
  ImpactOption,
  FrictionOption,
  HypothesisCode,
  Classification,
  DiagnosisResult,
} from './types';

// Impactos empresariais específicos (OUTRO e NAO_SEI não contam)
const SPECIFIC_IMPACTS: ImpactOption[] = [
  'REDUZIR_CUSTOS',
  'ATENDER_MAIS_CLIENTES',
  'VENDER_MAIS',
  'LIBERAR_PESSOAS',
  'REDUZIR_ERROS_RETRABALHO',
];

// Fricções específicas (OUTRO e NAO_SEI não contam)
const SPECIFIC_FRICTIONS: FrictionOption[] = [
  'TAREFAS_MANUAIS',
  'REPETICAO',
  'DEPENDENCIA_PESSOA',
  'MUITAS_ETAPAS',
  'INFORMACAO_ESPALHADA',
  'DECISOES_MANUAIS',
  'ERROS_RETRABALHO',
];

function hasImpact(impacts: ImpactOption[], ...options: ImpactOption[]): boolean {
  return options.some((opt) => impacts.includes(opt));
}

function hasFriction(frictions: FrictionOption[], ...options: FrictionOption[]): boolean {
  return options.some((opt) => frictions.includes(opt));
}

function hasSpecificImpact(impacts: ImpactOption[]): boolean {
  return impacts.some((i) => SPECIFIC_IMPACTS.includes(i));
}

function hasSpecificFriction(frictions: FrictionOption[]): boolean {
  return frictions.some((f) => SPECIFIC_FRICTIONS.includes(f));
}

/**
 * Executa o motor de diagnóstico.
 * P1 (process) é apenas contexto — não influencia hipóteses.
 */
export function runDiagnosis(
  impacts: ImpactOption[],
  frictions: FrictionOption[]
): DiagnosisResult {
  const hypotheses: HypothesisCode[] = [];

  // H01 — Capacidade operacional restringida
  // (P2 contém ATENDER_MAIS_CLIENTES OU VENDER_MAIS) E (P3 contém TAREFAS_MANUAIS OU REPETICAO)
  if (
    hasImpact(impacts, 'ATENDER_MAIS_CLIENTES', 'VENDER_MAIS') &&
    hasFriction(frictions, 'TAREFAS_MANUAIS', 'REPETICAO')
  ) {
    hypotheses.push('H01');
  }

  // H02 — Custo operacional potencialmente elevado
  // P2 contém REDUZIR_CUSTOS E (P3 contém TAREFAS_MANUAIS OU REPETICAO OU MUITAS_ETAPAS)
  if (
    hasImpact(impacts, 'REDUZIR_CUSTOS') &&
    hasFriction(frictions, 'TAREFAS_MANUAIS', 'REPETICAO', 'MUITAS_ETAPAS')
  ) {
    hypotheses.push('H02');
  }

  // H03 — Concentração de conhecimento ou decisão
  // P3 contém DEPENDENCIA_PESSOA E P3 contém DECISOES_MANUAIS
  if (
    hasFriction(frictions, 'DEPENDENCIA_PESSOA') &&
    hasFriction(frictions, 'DECISOES_MANUAIS')
  ) {
    hypotheses.push('H03');
  }

  // H04 — Gargalo por fluxo de trabalho
  // P3 contém MUITAS_ETAPAS E P2 contém pelo menos um impacto empresarial específico
  if (hasFriction(frictions, 'MUITAS_ETAPAS') && hasSpecificImpact(impacts)) {
    hypotheses.push('H04');
  }

  // H05 — Perda de capacidade por retrabalho
  // P3 contém ERROS_RETRABALHO E P2 contém REDUZIR_CUSTOS ou ATENDER_MAIS_CLIENTES ou LIBERAR_PESSOAS ou REDUZIR_ERROS_RETRABALHO
  if (
    hasFriction(frictions, 'ERROS_RETRABALHO') &&
    hasImpact(impacts, 'REDUZIR_CUSTOS', 'ATENDER_MAIS_CLIENTES', 'LIBERAR_PESSOAS', 'REDUZIR_ERROS_RETRABALHO')
  ) {
    hypotheses.push('H05');
  }

  // H06 — Fricção causada por informação fragmentada
  // P3 contém INFORMACAO_ESPALHADA E (P3 contém TAREFAS_MANUAIS OU REPETICAO)
  if (
    hasFriction(frictions, 'INFORMACAO_ESPALHADA') &&
    hasFriction(frictions, 'TAREFAS_MANUAIS', 'REPETICAO')
  ) {
    hypotheses.push('H06');
  }

  // H07 — Necessidade de estruturar antes de automatizar
  // P3 contém DECISOES_MANUAIS E (P3 contém ERROS_RETRABALHO OU DEPENDENCIA_PESSOA OU MUITAS_ETAPAS)
  if (
    hasFriction(frictions, 'DECISOES_MANUAIS') &&
    hasFriction(frictions, 'ERROS_RETRABALHO', 'DEPENDENCIA_PESSOA', 'MUITAS_ETAPAS')
  ) {
    hypotheses.push('H07');
  }

  // --- Classificação final ---
  let classification: Classification;

  if (hypotheses.length > 0) {
    // Hipótese ativada → SINAL_FORTE
    classification = 'SINAL_FORTE';
  } else if (hasSpecificImpact(impacts) || hasSpecificFriction(frictions)) {
    // Impacto ou fricção específica, mas nenhuma hipótese → SINAL_A_INVESTIGAR
    classification = 'SINAL_A_INVESTIGAR';
  } else {
    // Sem impacto nem fricção específica → INFORMAÇÃO INSUFICIENTE
    classification = 'INFORMACAO_INSUFICIENTE';
  }

  return { hypotheses, classification };
}
