import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
  } = req

  if (req.method === 'GET') {
    const streams = await client.stream.findMany()

    return res.json({
      ok: true,
      streams,
    })
  }

  if (req.method === 'POST') {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })

    return res.json({
      ok: true,
      stream,
    })
  }
}

export default withSession(withHandler({ methods: ['POST', 'GET'], handler }))
