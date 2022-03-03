import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
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
  const {
    body: { name, price, description },
    session: { user },
  } = req

  if (req.method === 'GET') {
    const products = await client.product.findMany({})

    return res.json({
      ok: true,
      products,
    })
  }

  if (req.method === 'POST') {
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: 'xx',
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })

    return res.json({
      ok: true,
      product,
    })
  }
}

export default withSession(withHandler({ methods: ['POST', 'GET'], handler }))
