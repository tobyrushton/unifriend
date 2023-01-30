// choose a random element from an array
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const randomPick = <T = any>(arr: T[]): T => {
    return arr[Math.floor(Math.random() * arr.length)]
}
