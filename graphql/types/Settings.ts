import { objectType, extendType, nonNull, stringArg, booleanArg } from 'nexus'
import { SettingsUpdateObject, TempSettingsObject } from '../../types/settings'

// table settings in the database.
export const Settings = objectType({
    name: 'Settings',
    definition(t) {
        t.string('id')
        t.string('universityPreference')
        t.boolean('darkMode')
        t.string('usersId')
    },
})

// updates row in the settings table in the database
export const UpdateSettings = extendType({
    type: 'Mutation',
    definition(t) {
        t.nonNull.field('UpdateSettings', {
            type: 'Settings',
            args: {
                // takes the id of the user and the optional changes the 2 columns on the database.
                usersId: nonNull(stringArg()),
                universityPreference: stringArg(),
                darkMode: booleanArg(),
            },
            resolve: (_, args, ctx) => {
                // removes the usersId from the update object so that it doesn't change.
                const temp: TempSettingsObject = {
                    ...args,
                } as TempSettingsObject
                delete temp.usersId
                const updates = temp as SettingsUpdateObject

                return ctx.prisma.settings.update({
                    // updates row in the database with the matching id
                    where: { usersId: args.usersId },
                    data: updates,
                })
            },
        })
    },
})
