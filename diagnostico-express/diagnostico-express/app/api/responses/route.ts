import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, process, impact, impactOther, frictions, frictionOther, hypotheses, classification } = body;

    if (!leadId || !process || !impact || !frictions || !hypotheses || !classification) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
    }

    const supabase = getSupabase();

    // Salvar respostas
    const { error: respError } = await supabase
      .from('diagnostic_responses')
      .insert({
        lead_id: leadId,
        process,
        impact,
        impact_other: impactOther || null,
        frictions,
        friction_other: frictionOther || null,
      });

    if (respError) {
      console.error('Supabase error saving responses:', respError);
      return NextResponse.json({ error: 'Erro ao salvar respostas.' }, { status: 500 });
    }

    // Salvar resultado
    const { error: resultError } = await supabase
      .from('diagnostic_results')
      .insert({
        lead_id: leadId,
        hypotheses,
        classification,
      });

    if (resultError) {
      console.error('Supabase error saving result:', resultError);
      return NextResponse.json({ error: 'Erro ao salvar resultado.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
