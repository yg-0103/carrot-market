import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const productId = Number(req.query.id)
  const userId = req.session.user?.id

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

  const searchWords = product?.name.split(' ')

  const relatedProducts = await client.product.findMany({
    where: {
      OR: searchWords?.map((word) => ({
        name: {
          contains: word,
        },
      })),
      NOT: {
        id: product?.id,
      },
    },
  })

  const isLiked = !!(await client.fav.findFirst({
    where: {
      productId: productId,
      userId: userId,
    },
  }))

  return res.json({
    ok: true,
    product,
    relatedProducts,
    isLiked,
  })
}

export default withSession(withHandler({ methods: ['GET'], handler }))
