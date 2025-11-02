'use client';

import { useState } from 'react'
import AuthModal from '@/components/authModal'

export default function SignInCallToAction() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        Sign in
      </button>
      <AuthModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}