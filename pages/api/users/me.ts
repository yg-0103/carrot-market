import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withIronSessionApiRoute } from 'iron-session/next'
import { withSession } from '@lib/server/withSession'

declare module 'iron-session' {
  interface IronSessionData {
    user?: {
      id: number
    }
  }
}

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: {
      id: req.session.user?.id,
    },
  })

  if (!profile) return res.status(404).end()

  return res.json({
    ok: true,
    profile,
  })
}

export default withSession(withHandler({ method: 'GET', handler }))
