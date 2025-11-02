// utils/supabase/server.ts
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createClient() {
  const cookieStore = await cookies() // <-- await!

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, // aka anon/publishable
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        // No-op here; Server Components can't set cookies.
        setAll() {
          /* no-op; middleware will write cookies */
        },
      },
    }
  )
}
