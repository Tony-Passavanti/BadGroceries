import HomePage from '@/components/searchForCompany';
import { createClient } from '@/utils/supabase/server'

export default async function Home() {
  const supabase = await createClient()
  await supabase.auth.getUser()


  return (
    <main>
      <HomePage />
    </main>
  )
}
