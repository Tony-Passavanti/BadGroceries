'use client';

import Link from 'next/link';
import type { User, AuthError } from '@supabase/supabase-js';


type MenuBarProps = {
  user: User | null;
  onSignInClick?: () => void;
  onSignOut: () => Promise< { error: AuthError | null } >;
};

export default function MenuBar({ user, onSignInClick, onSignOut }: MenuBarProps) {

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg-nav">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6 text-sm text-text-primary">
          <Link href="/" className="text-lg font-semibold text-text-bright">
            BadGroceries
          </Link>
          <Link href="/companies" className="hover:underline hover:text-text-bright">
            Search For Companies
          </Link>
          <Link href="/about" className="hover:underline hover:text-text-bright">
            About
          </Link>
        </div>

        {user ? (
            <button
                type="button"
                onClick={onSignOut}
                className="rounded-full px-4 py-2 text-sm font-medium"
          >
            Sign out
          </button> ) : (
          <button
            type="button"
            onClick={onSignInClick}
            className="rounded-full px-4 py-2 text-sm font-medium"
          >
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}