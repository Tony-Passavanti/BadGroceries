import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import type {AuthError} from '@supabase/supabase-js';

export async function signUp(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signUp({ email, password });
}

export async function signIn(email: string, password: string) {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signInWithPassword({ email, password });
}

export async function signOut(): Promise<{ error: AuthError | null }> {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signOut();
}

export async function signInWithGoogle() {
  const supabase = createBrowserSupabaseClient();
  return supabase.auth.signInWithOAuth({
    provider: 'google',
  });
}
