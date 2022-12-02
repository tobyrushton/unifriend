export type UniversityPreference = 'OWN' | 'ALL'

export interface settingsUpdateObject {
    universityPreference?: UniversityPreference
    darkMode?: boolean
}

export interface tempSettingsObject extends settingsUpdateObject {
    usersId?: string
}

export interface Settings {
    universityPreference: UniversityPreference
    darkMode: boolean
}

export interface FullSettingsObject extends Settings {
    usersId: string
    id: string
}
