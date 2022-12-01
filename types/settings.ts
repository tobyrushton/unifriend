export interface settingsUpdateObject {
    universityPreference?: string
    darkMode?: boolean
}

export interface tempSettingsObject extends settingsUpdateObject {
    usersId?: string
}

export interface Settings {
    universityPreference: string
    darkMode: boolean
}

export interface FullSettingsObject extends Settings {
    usersId: string
    id: string
}
