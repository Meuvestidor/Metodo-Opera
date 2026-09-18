import { NextRequest, NextResponse } from 'next/server';
import { getSupabase } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, company, whatsapp, email } = body;

    if (!name || !company || !whatsapp) {
      return NextResponse.json(
        { error: 'Nome, empresa e WhatsApp são obrigatórios.' },
        { status: 400 }
      );
    }

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from('diagnostic_leads')
      .insert({
        name,
        company,
        whatsapp,
        email: email || null,
        consultation_interest: 'pending',
      })
      .select('id')
      .single();

    if (error) {
      console.error('Supabase error creating lead:', error);
      return NextResponse.json({ error: 'Erro ao salvar dados.' }, { status: 500 });
    }

    return NextResponse.json({ leadId: data.id });
  } catch {
    return NextResponse.json({ error: 'Erro interno.' }, { status: 500 });
  }
}
