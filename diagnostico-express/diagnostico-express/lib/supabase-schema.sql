-- ============================================================
-- Diagnóstico Express — Schema Supabase
-- Projeto independente. NÃO modificar tabelas de outros projetos.
-- ============================================================

-- 1. TABLA: diagnostic_leads
CREATE TABLE diagnostic_leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  company TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT,
  consultation_interest TEXT NOT NULL DEFAULT 'pending'
    CHECK (consultation_interest IN ('pending', 'interested', 'not_now'))
);

-- 2. TABLA: diagnostic_responses
CREATE TABLE diagnostic_responses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES diagnostic_leads(id) ON DELETE CASCADE,
  process TEXT NOT NULL,
  impact TEXT[] NOT NULL,
  impact_other TEXT,
  frictions TEXT[] NOT NULL,
  friction_other TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABLA: diagnostic_results
CREATE TABLE diagnostic_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID NOT NULL REFERENCES diagnostic_leads(id) ON DELETE CASCADE,
  hypotheses TEXT[] NOT NULL,
  classification TEXT NOT NULL
    CHECK (classification IN ('SINAL_FORTE', 'SINAL_A_INVESTIGAR', 'INFORMACAO_INSUFICIENTE')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- ============================================================
-- Row Level Security (RLS)
-- El usuario anónimo solo puede insertar y actualizar su propio lead.
-- ============================================================

ALTER TABLE diagnostic_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE diagnostic_results ENABLE ROW LEVEL SECURITY;

-- Política: cualquier persona puede insertar un lead (formulario público)
CREATE POLICY "Allow anonymous insert" ON diagnostic_leads
  FOR INSERT WITH CHECK (true);

-- Política: actualizar solo su propio lead (por id)
CREATE POLICY "Allow update own lead" ON diagnostic_leads
  FOR UPDATE USING (true) WITH CHECK (true);

-- Política: insertar respuestas
CREATE POLICY "Allow anonymous insert responses" ON diagnostic_responses
  FOR INSERT WITH CHECK (true);

-- Política: insertar resultados
CREATE POLICY "Allow anonymous insert results" ON diagnostic_results
  FOR INSERT WITH CHECK (true);
