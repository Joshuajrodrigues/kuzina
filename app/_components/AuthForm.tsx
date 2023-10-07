'use client'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa,ThemeMinimal,ThemeVariables,Theme } from '@supabase/auth-ui-shared'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '../../types/supabase'
import { BASE_URL } from '@/lib/constants'
export default function AuthForm() {
  const supabase = createClientComponentClient<Database>()
  const gmail = <a href="https://mail.google.com">Gmail</a> 
  const outlook=<a href="https://www.outlook.com">Outlook</a>  
  const yahoo=<a href="https://mail.yahoo.com/">Yahoo</a> 
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