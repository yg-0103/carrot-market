import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withIronSessionApiRoute } from 'iron-session/next'
async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body

  console.log(token)
  return res.json({
    ok: true,
  })
}

export default withIronSessionApiRoute(withHandler('POST', handler), {
  cookieName: 'carrotsessionId',
  password: process.env.IRON_SESSION_PW!,
})
