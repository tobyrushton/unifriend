import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
    const res = NextResponse.next()

    const supabase = createMiddlewareSupabaseClient({ req, res })

    const {
        data: { session: _session },
    } = await supabase.auth.getSession()

    return res
}

export const config = {
    matcher: ['/optional-session', '/required-session', '/realtime'],
}
