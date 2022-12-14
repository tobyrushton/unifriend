export type UniversityPreference = 'OWN' | 'ALL'

export interface SettingsUpdateObject {
    id: string
    universityPreference?: UniversityPreference
    darkMode?: boolean
}

export interface TempSettingsObject extends SettingsUpdateObject {
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
