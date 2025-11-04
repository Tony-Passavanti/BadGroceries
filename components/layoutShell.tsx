'use client';

import { useMemo, useEffect, useState } from 'react';
import { createBrowserSupabaseClient } from '@/utils/supabase/client';
import MenuBar from '@/components/menuBar';
import AuthModal from '@/components/authModal';
import type { User } from '@supabase/supabase-js';
import { signOut } from '@/utils/supabase/signup';



export default function LayoutShell({
  initialUser,
  children,
}: {
  initialUser: User | null;
  children: React.ReactNode;
}) {
  const supabase = useMemo(() => createBrowserSupabaseClient(), []);
  const [user, setUser] = useState(initialUser);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.subscription.unsubscribe();
  }, [supabase]);

  return (
    <>
      <MenuBar user={user} onSignInClick={() => setAuthOpen(true)} onSignOut={() => signOut()} />
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}