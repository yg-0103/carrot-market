import { NextApiRequest, NextApiResponse } from 'next'
import withHandler from '@lib/server/withHendler'
import client from '@lib/client/client'

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { email, phone } = req.body
  const payload = email ? { email } : { phone: +phone }

  const token = await client.token.create({
    data: {
      payload: '123',
      user: {
        connectOrCreate: {
          where: {
            ...payload,
          },
          create: {
            name: 'Anonymous',
            ...payload,
          },
        },
      },
    },
  })
  res.json({
    ok: true,
  })
  console.log(token)
}

export default withHandler('POST', handler)
