import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const streamId = Number(req.query.id)
  const payload = req.body.message
  const userId = req.session.user?.id

  const message = await client.message.create({
    data: {
      message: payload,
      user: {
        connect: {
          id: userId,
        },
      },
      stream: {
        connect: {
          id: streamId,
        },
      },
    },
  })

  return res.json({
    ok: true,
    message,
  })
}

export default withSession(withHandler({ methods: ['POST'], handler }))
