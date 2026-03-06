import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { supabaseConfig } from '../config/supabase.config';

let supabase: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (!supabase) {
    supabase = createClient(
      supabaseConfig.supabaseUrl,
      supabaseConfig.supabaseKey
    );
  }
  return supabase;
}

