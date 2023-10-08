'use client'
import { BASE_URL } from '@/lib/constants'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { Database } from '../../types/supabase'
export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view="sign_in"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={["google"]}
      redirectTo={BASE_URL}
   
      
    />
  )
}