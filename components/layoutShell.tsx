'use client';

import { useState } from 'react';
import MenuBar from '@/components/menuBar';
import AuthModal from '@/components/authModal';

type LayoutShellProps = {
  children: React.ReactNode;
};

export default function LayoutShell({ children }: LayoutShellProps) {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <MenuBar onSignInClick={() => setAuthOpen(true)} />
      <main className="mx-auto max-w-5xl px-6 py-8">{children}</main>
      <AuthModal open={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  );
}