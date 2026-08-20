import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Banco de dados do Nutrivida.
 *
 * As duas chaves ficam em variáveis de ambiente (arquivo .env local ou nas
 * "Environment Variables" da Vercel). Enquanto elas não existirem, o site
 * continua funcionando salvando tudo no navegador (localStorage).
 *
 * VITE_SUPABASE_URL=https://xxxxx.supabase.co
 * VITE_SUPABASE_ANON_KEY=chave-publica
 */
const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const anonKey = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

export const bancoAtivo = Boolean(url && anonKey);

export const banco: SupabaseClient | null = bancoAtivo
  ? createClient(url!, anonKey!, { auth: { persistSession: false } })
  : null;
