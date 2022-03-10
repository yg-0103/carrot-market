import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const postId = Number(req.query.id)
  const user = req.session.user

  const post = await client.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
      comments: {
        select: {
          comment: true,
          id: true,
          user: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
        },
      },
      _count: {
        select: {
          wonders: true,
        },
      },
    },
  })

  const isWondering = await client.wonder.findFirst({
    where: {
      userId: user?.id,
    },
  })
  return res.json({
    ok: true,
    post,
    isWondering,
  })
}

export default withSession(withHandler({ methods: ['GET'], handler }))
