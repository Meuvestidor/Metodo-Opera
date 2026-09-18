// ============================================================
// Microresultados — Textos editoriais fixos do .md
// NÃO reescrever, resumir ou substituir.
// ============================================================

import { HypothesisCode } from './types';

export interface HypothesisContent {
  code: HypothesisCode;
  name: string;
  title: string;
  description: string;
  hypothesis: string;
  investigate: string;
}

export const HYPOTHESES: Record<HypothesisCode, HypothesisContent> = {
  H01: {
    code: 'H01',
    name: 'Capacidade operacional restringida',
    title: 'Sua capacidade operacional pode estar limitando o crescimento',
    description:
      'O processo informado consome capacidade em uma atividade que você considera importante para atender mais clientes ou vender mais.',
    hypothesis:
      'Parte da capacidade de crescimento pode estar sendo limitada pela forma como esse processo é executado hoje.',
    investigate:
      'Quanto desse trabalho exige realmente intervenção humana e quanto segue um padrão repetível.',
  },
  H02: {
    code: 'H02',
    name: 'Custo operacional potencialmente elevado',
    title: 'Parte do custo pode estar na forma como o trabalho é executado',
    description:
      'O processo consome recursos e apresenta atividades manuais ou múltiplas etapas.',
    hypothesis:
      'O custo associado ao processo pode estar sendo influenciado pela estrutura do fluxo.',
    investigate:
      'Quais etapas agregam valor e quais existem por necessidade, controle ou hábito.',
  },
  H03: {
    code: 'H03',
    name: 'Concentração de conhecimento ou decisão',
    title: 'Seu processo pode estar concentrando conhecimento crítico em uma pessoa',
    description:
      'A execução depende de uma pessoa específica e envolve decisões manuais.',
    hypothesis:
      'Parte do conhecimento usado nessas decisões pode estar apenas na experiência dessa pessoa, e não formalizado no processo.',
    investigate:
      'Quais critérios essa pessoa utiliza para decidir e quais podem ser explicitados.',
  },
  H04: {
    code: 'H04',
    name: 'Gargalo por fluxo de trabalho',
    title: 'O tempo desse processo pode estar sendo determinado pelo fluxo',
    description: 'O processo possui múltiplas etapas ou aprovações.',
    hypothesis:
      'O tempo para concluir o processo pode estar sendo influenciado por transferências, esperas ou decisões intermediárias.',
    investigate:
      'Quais etapas são obrigatórias, quais são controles e quais dependem apenas da forma atual de trabalhar.',
  },
  H05: {
    code: 'H05',
    name: 'Perda de capacidade por retrabalho',
    title:
      'Parte da capacidade da equipe pode estar sendo consumida para corrigir o próprio trabalho',
    description:
      'O processo apresenta erros ou retrabalho e você aponta impacto em custos, capacidade ou tempo da equipe.',
    hypothesis:
      'Existe capacidade operacional sendo usada para corrigir falhas em vez de produzir novo valor.',
    investigate: 'Em que etapa os erros surgem e o que os provoca.',
  },
  H06: {
    code: 'H06',
    name: 'Fricção causada por informação fragmentada',
    title: 'O esforço pode estar na circulação da informação',
    description:
      'As informações utilizadas no processo estão distribuídas entre diferentes ferramentas e existem atividades manuais ou repetitivas.',
    hypothesis:
      'Parte do esforço pode estar sendo gasto para localizar, transferir ou conferir informações.',
    investigate:
      'Onde a mesma informação é consultada, copiada ou atualizada mais de uma vez.',
  },
  H07: {
    code: 'H07',
    name: 'Necessidade de estruturar antes de automatizar',
    title: 'Antes de automatizar, pode ser necessário tornar a decisão mais clara',
    description:
      'O processo depende de decisões manuais e apresenta sinais de retrabalho, dependência ou complexidade.',
    hypothesis:
      'A principal oportunidade pode estar primeiro em explicitar os critérios utilizados para executar ou decidir.',
    investigate:
      'Quais regras, critérios ou exceções orientam essas decisões.',
  },
};
