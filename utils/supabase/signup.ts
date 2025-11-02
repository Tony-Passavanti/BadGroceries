import { createBrowserSupabaseClient } from '@/utils/supabase/client';

export async function signUp(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signUp({ email, password });
}

export async function signIn(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut() {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signOut();
}
