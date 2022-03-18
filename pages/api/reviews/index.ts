import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const userId = req.session.user?.id

  const reviews = await client.review.findMany({
    where: {
      createdForId: userId,
    },
    include: {
      createdBy: {
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
    reviews,
  })
}

export default withSession(withHandler({ methods: ['GET'], handler }))
