import { BASE_URL } from '@/lib/constants'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'
export async function GET(req: NextRequest) {
  
  const { searchParams } = new URL(req.url)
  const code = searchParams.get('code')
  console.log("ran",code);
  if (code) {
    try {
      const supabase = createRouteHandlerClient({ cookies })
      await supabase.auth.exchangeCodeForSession(code)
      
    } catch (error) {
      console.log(error);
      
    } finally{
      
      return NextResponse.redirect(`${BASE_URL}/lobby`)
    }
  }

}