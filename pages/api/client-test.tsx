import { NextApiRequest, NextApiResponse } from 'next'
import client from '../../src/lib/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await client.user.create({
    data: {
      email: 'yg',
      name: '연구',
    },
  })

  res.json({
    ok: true,
  })
}
