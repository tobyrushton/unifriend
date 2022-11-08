import { objectType } from 'nexus'

// table settings in the database.
export const Settings = objectType({
    name: 'Settings',
    definition(t) {
        t.int('id')
        t.string('universityPreference')
        t.boolean('darkMode')
        t.string('usersId')
    },
})
