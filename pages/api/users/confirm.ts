import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { token } = req.body

  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
  })

  if (!foundToken) return res.status(401).end()
  req.session.user = {
    id: foundToken.userId,
  }

  await req.session.save()

  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  })

  return res.json({
    ok: true,
  })
}

export default withSession(withHandler('POST', handler))
