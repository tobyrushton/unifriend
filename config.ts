interface config{
    DATABASE_URL:string
}

const DATABASE_URL = process.env.DATABASE_URL as string

if(
    DATABASE_URL == undefined
)
    throw new Error('Missing environment variables')


export const config:config = {
    DATABASE_URL
}
