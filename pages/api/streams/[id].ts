import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const streamId = Number(req.query.id)

  const stream = await client.stream.findUnique({
    where: { id: streamId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  })

  return res.json({
    ok: true,
    stream,
  })
}

export default withSession(withHandler({ methods: ['GET'], handler }))
