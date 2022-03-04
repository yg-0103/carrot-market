import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const productId = Number(req.query.id)

  const product = await client.product.findUnique({
    where: { id: productId },
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
    product,
  })
}

export default withSession(withHandler({ methods: ['GET'], handler }))
