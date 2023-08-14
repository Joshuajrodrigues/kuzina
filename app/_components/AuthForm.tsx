'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa,ThemeMinimal,ThemeVariables,Theme } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../types/supabase'
import { BASE_URL } from '@/lib/constants'
export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()

  return (
    <Auth
      supabaseClient={supabase}
      view="magic_link"
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      showLinks={false}
      providers={[]}
      redirectTo={`${BASE_URL}auth`}
      
    />
  )
}