'use client';

import { useState } from 'react';
import { signUp } from '@/utils/supabase/signup'; 

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!open) return null;

  async function handleCreateAccount(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Supabase requires email for signUp. If this isn't an email, nudge the user.
    const looksLikeEmail = /\S+@\S+\.\S+/.test(username);
    if (!looksLikeEmail) {
      setError('Please enter a valid email address for sign up.');
      return;
    }

    try {
      setSubmitting(true);
      const { error } = await signUp(username, password);
      if (error) {
        setError(error.message ?? 'Sign up failed');
      } else {
        setSuccess('Check your email to confirm your account.');
        // Optional: close after a short delay
        // setTimeout(onClose, 1200);
      }
    } catch (err: any) {
      setError(err?.message ?? 'Unexpected error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Create your account</h2>
          <button
            onClick={onClose}
            className="rounded-md px-2 py-1 text-sm hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleCreateAccount} className="space-y-4">
          <div className="space-y-1">
            <label className="block text-sm font-medium">
              Username (email)
            </label>
            <input
              type="email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              minLength={6}
            />
          </div>

          {error && (
            <p className="text-sm text-red-600">
              {error}
            </p>
          )}
          {success && (
            <p className="text-sm text-green-600">
              {success}
            </p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
          >
            {submitting ? 'Creating…' : 'Create account'}
          </button>
        </form>

        <p className="mt-3 text-xs text-gray-500">
          By continuing, you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </div>
  );
}
