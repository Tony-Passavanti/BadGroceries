'use client';

import { useState } from 'react';
import { signIn, signUp } from '@/utils/supabase/signup';

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
};

type AuthMode = 'sign-in' | 'sign-up';

export default function AuthModal({ open, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  if (!open) return null;

  const isSignUp = mode === 'sign-up';

  function toggleMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError(null);
    setSuccess(null);
    setPassword('');
    setConfirmPassword('');
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    const looksLikeEmail = /\S+@\S+\.\S+/.test(email);
    if (!looksLikeEmail) {
      setError('Please enter a valid email address.');
      return;
    }

    if (isSignUp && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const passwordPolicy = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordPolicy.test(password)) {
      setError(
        'Password must be at least 8 characters with uppercase, lowercase, and a number.'
      );
      return;
    }

    try {
      setSubmitting(true);
      const { error } = isSignUp
        ? await signUp(email, password)
        : await signIn(email, password);

      if (error) {
        setError(error.message ?? 'Authentication failed');
      } else {
        setSuccess(
          isSignUp
            ? 'Check your email to confirm your account.'
            : 'You are now signed in.'
        );
        if (!isSignUp) {
        setTimeout(onClose, 1200);
        }
      }
    } catch (err: any) {
      setError(err?.message ?? 'Unexpected error');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80]">
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="flex h-full items-center justify-center p-6">
        <div className="relative mx-4 w-full max-w-md max-h-[calc(100vh-3rem)] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              {isSignUp ? 'Create your account' : 'Sign in'}
            </h2>
            <button
              onClick={() => {
                toggleMode('sign-in');
                onClose();
              }}
              className="rounded-md px-2 py-1 text-sm hover:bg-gray-100"
              aria-label="Close"
            >
              ×
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                autoComplete={isSignUp ? 'new-password' : 'current-password'}
                required
                minLength={6}
              />
            </div>

                        {isSignUp && (
              <div className="space-y-1">
                <label className="block text-sm font-medium">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-black"
                  placeholder="••••••••"
                  autoComplete="new-password"
                  required
                  minLength={6}
                />
              </div>
            )}

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
            {success && (
              <p className="text-sm text-green-600">{success}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-lg bg-black px-4 py-2 text-white disabled:opacity-60"
            >
              {submitting
                ? isSignUp
                  ? 'Creating your account…'
                  : 'Signing you in…'
                : isSignUp
                  ? 'Create account'
                  : 'Sign in'}
            </button>
          </form>

          <p className="mt-3 text-xs text-gray-500">
            By continuing, you agree to our Terms and Privacy Policy.
          </p>

          <p className="mt-4 text-sm text-gray-700">
            {isSignUp ? 'Already have an account? ' : 'New user? '}
            <button
              type="button"
              onClick={() => toggleMode(isSignUp ? 'sign-in' : 'sign-up')}
              className="font-medium text-black underline"
            >
              {isSignUp ? 'Sign in' : 'Create an account'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}