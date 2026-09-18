import { createClient, SupabaseClient } from '@supabase/supabase-js';

// --- Cliente público (anon key) para INSERTs desde API routes ---
let _supabase: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error('Supabase URL and Anon Key must be configured.');
    }
    _supabase = createClient(url, key);
  }
  return _supabase;
}

// --- Cliente admin (service role key) para UPDATEs server-side ---
// SUPABASE_SERVICE_ROLE_KEY NO tiene prefijo NEXT_PUBLIC_
// y NUNCA se expone al navegador.
let _supabaseAdmin: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!_supabaseAdmin) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !serviceKey) {
      throw new Error('Supabase URL and Service Role Key must be configured.');
    }
    _supabaseAdmin = createClient(url, serviceKey);
  }
  return _supabaseAdmin;
}
