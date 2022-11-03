import { objectType } from 'nexus'

export const Settings = objectType({
    name: 'Settings',
    definition(t) {
        t.int('id')
        t.string('universityPreference')
        t.boolean('darkMode')
        t.string('usersId')
    },
})
