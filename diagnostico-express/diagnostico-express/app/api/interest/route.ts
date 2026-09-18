import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { leadId, interest } = body;

    if (!leadId || !interest) {
      return NextResponse.json({ error: 'Dados incompletos.' }, { status: 400 });
    }

    if (!['interested', 'not_now'].includes(interest)) {
      return NextResponse.json({ error: 'Valor inválido.' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    const { error } = await supabase
      .from('diagnostic_leads')
      .update({ consultation_interest: interest })
      .eq('id', leadId);

    if (error) {
      console.error('Supabase error updating interest:', error);
      return NextResponse.json({ error: 'Erro ao atualizar.' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
