// import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export const middleware = async (req: NextRequest): Promise<NextResponse> => {
    const res = NextResponse.next()

    // const supabase = createMiddlewareSupabaseClient({ req, res })

    // const {
    //     data: { session },
    // } = await supabase.auth.getSession()

    const authToken = req.cookies.get('supabase-auth-token')

    const url = req.nextUrl.clone()

    if (authToken && !url.pathname.startsWith('/a')) {
        url.pathname = '/a'
        return NextResponse.redirect(url)
    }
    if (url.pathname.startsWith('/a') && !authToken) {
        url.pathname = '/'
        return NextResponse.redirect(url)
    }

    return res
}

export const config = {
    matcher: [
        '/optional-session',
        '/required-session',
        '/realtime',
        '/',
        '/a/:path*',
    ],
}
