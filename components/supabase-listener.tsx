'use client'

import { useRouter } from 'next/navigation'
import { useEffect, FC } from 'react'
import { supabase } from '../lib/supabase'

export const SupabaseListener: FC<{ accessToken?: string }> = ({
    accessToken,
}) => {
    const router = useRouter()

    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            if (session?.access_token !== accessToken) {
                router.refresh()
            }
        })
    }, [accessToken, router])

    return null
}
