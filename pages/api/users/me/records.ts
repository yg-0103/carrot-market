import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const userId = req.session.user?.id
  const kind = req.query.kind as 'Fav' | 'Sale' | 'Purchase'

  const records = await client.record.findMany({
    where: {
      userId: userId,
      kind,
    },

    include: {
      product: {
        include: {
          _count: {
            select: {
              favs: true,
            },
          },
        },
      },
    },
  })

  return res.json({
    ok: true,
    records,
  })
}

export default withSession(withHandler({ methods: ['GET'], handler }))
