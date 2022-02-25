import { withIronSessionApiRoute } from 'iron-session/next'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number
    }
  }
}

const options = {
  cookieName: 'carrotsessionId',
  password: process.env.IRON_SESSION_PW!,
}

export function withSession(fn: any) {
  return withIronSessionApiRoute(fn, options)
}
