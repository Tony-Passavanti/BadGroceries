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
    <header className="sticky top-0 z-50 border-b bg-white/90 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="text-lg font-semibold">
            BadGroceries
          </Link>
          <Link href="/companies" className="hover:underline">
            Search For Companies
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
        </div>

        {user ? (
            <button
                type="button"
                onClick={onSignOut}
                className="rounded-full bg-gray-200 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-300"
          >
            Sign out
          </button> ) : (
          <button
            type="button"
            onClick={onSignInClick}
            className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-900"
          >
            Sign in
          </button>
        )}
      </nav>
    </header>
  );
}