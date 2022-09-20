interface config{
    API_KEY:string
}

const API_KEY = process.env.API_KEY as string

if(
    API_KEY == undefined
)
    throw new Error('Missing environment variables')


export const config:config = {
    API_KEY
}
