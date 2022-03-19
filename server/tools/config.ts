export const {
  MONGO_URL,
  NODE_ENV,
} = process.env
export const isDev: boolean = NODE_ENV === 'development'
export const cookieOptions: object = {
  domain: isDev ? 'localhost' : '.crave_tech.com',
  secure: true,
  httpOnly: true
}
const envs = {
  isDev,
  cookieOptions,
  MONGO_URL,
}
const list = Object.keys(envs)
const errors = []
for (let i = 0; i < list.length; i++) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  if (envs[list[i]] === undefined) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    errors.push({[list[i]]: envs[list[i]]})
  }
}
if (errors.length > 0) {
  const message = 'ENV Error, the following ENV are not set:'
  console.error(message, errors)
  throw new Error('Fix Env and rebuild')
}
