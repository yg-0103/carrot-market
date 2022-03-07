import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'
import { userInfo } from 'os'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const productId = Number(req.query.id)
  const userId = req.session.user?.id

  // findUnique 는 Unique 필드로만 검색가능, 하지만 fav의 unique filed는 fav.id 뿐이라서 findFirst를 써줘야함
  const favoriteProduct = await client.fav.findFirst({
    where: {
      productId: productId,
    },
  })
  console.log(favoriteProduct)
  // delete도 unique filed 로만 가능, unique filed 가 아닐 경우 deleteMany로 해야함
  if (favoriteProduct) {
    await client.fav.delete({
      where: {
        id: favoriteProduct.id,
      },
    })
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        product: {
          connect: {
            id: productId,
          },
        },
      },
    })
  }

  const isLiked = !!(await client.fav.findFirst({
    where: {
      productId: productId,
      userId: userId,
    },
  }))

  return res.json({
    ok: true,
    isLiked,
  })
}

export default withSession(withHandler({ methods: ['POST'], handler }))
