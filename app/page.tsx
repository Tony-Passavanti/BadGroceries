import SignInCallToAction from '@/components/signInCallToAction'
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()


  return (
    <main>
      {user ? (
        <h2>Go to dashboard</h2>
      ) : (
        <SignInCallToAction />
      )}
    </main>
  )
}

