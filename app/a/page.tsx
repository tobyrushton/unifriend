import 'server-only'

import { ReactElement } from 'react'
import styles from '../../styles/modules/Home.module.scss'
import {
    UserObjectWithID,
    QueryReturn,
    IDArguement,
    UserByEmailOptions,
    Join,
    EmailQuery,
    Settings,
    University,
} from '../../types'
import { GET_USER, GET_USER_BY_EMAIL_OPTIONAL } from '../../graphql/queries'
import { initiateApollo } from '../../lib/apollo'
import { getServerSideSupabase } from '../../lib/supabase'
import { UserContainer } from './UserContainer'

const getData = async (): Promise<UserObjectWithID[]> => {
    const apollo = initiateApollo()
    const supabase = getServerSideSupabase()

    const {
        data: { session },
    } = await supabase.auth.getSession()
    const { data: UserData, error: UserError } = await apollo.query<
        QueryReturn<
            Join<IDArguement, { settings: Settings; university: University }>,
            'User',
            'UserQueryByEmail'
        >,
        Join<EmailQuery, UserByEmailOptions>
    >({
        query: GET_USER_BY_EMAIL_OPTIONAL,
        variables: {
            email: session?.user?.email as string,
            id: true,
            settings: true,
            university: true,
        },
    })
    if (UserError) throw UserError

    const { data, error } = await apollo.query<
        QueryReturn<UserObjectWithID[], 'User', 'user'>,
        Join<IDArguement, { universityPreference: string; university: string }>
    >({
        query: GET_USER,
        variables: {
            id: UserData.UserQueryByEmail.id,
            universityPreference: UserData.UserQueryByEmail.settings
                .universityPreference as string,
            university: UserData.UserQueryByEmail.university as string,
        },
    })
    if (error) throw error
    return data.user
}

const A = async (): Promise<ReactElement> => {
    const users = await getData()

    return (
        <div className={styles.wrapper}>
            <UserContainer fetchedUsers={users} />
        </div>
    )
}

export default A
