import { objectType } from 'nexus'
import { DateTime } from '../scalars/DateTime'

export const Friend = objectType({
    name: 'Friend',
    definition(t) {
        t.int('id')
        t.string('friendID')
        t.list.field('friendedAt', {
            type: DateTime
        })
    },
})
