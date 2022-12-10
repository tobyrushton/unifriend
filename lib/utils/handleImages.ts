import { supabase } from '../supabase'
import { ImageReturn } from '../../types'

export const uploadImage = async (
    file: File,
    id: string
): Promise<ImageReturn> => {
    const { data, error } = await supabase.storage
        .from('profile-pictures')
        .upload(id, file, {
            cacheControl: '0',
            upsert: true,
        })

    return {
        success: !!data,
        error: error as Error | undefined,
    }
}

export const getImage = (id: string): string => {
    const {
        data: { publicUrl },
    } = supabase.storage.from('profile-pictures').getPublicUrl(id)

    return publicUrl
}
