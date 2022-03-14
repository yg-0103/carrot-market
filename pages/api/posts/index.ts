import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { question },
    session: { user },
  } = req

  if (req.method === 'POST') {
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    })

    return res.json({
      ok: true,
      post,
    })
  }

  if (req.method === 'GET') {
    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
        _count: {
          select: {
            comments: true,
            wonders: true,
          },
        },
      },
    })

    return res.json({
      ok: true,
      posts,
    })
  }
}

export default withSession(withHandler({ methods: ['POST', 'GET'], handler }))
