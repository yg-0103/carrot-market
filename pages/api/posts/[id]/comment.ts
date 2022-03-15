import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const postId = Number(req.query.id)
  const userId = req.session.user?.id
  const payload = req.body.comment
  // findUnique 는 Unique 필드로만 검색가능, 하지만 fav의 unique filed는 fav.id 뿐이라서 findFirst를 써줘야함
  const post = await client.post.findUnique({
    where: {
      id: postId,
    },
  })

  // delete도 unique filed 로만 가능, unique filed 가 아닐 경우 deleteMany로 해야함
  if (!post) return res.status(404).end()

  const comment = await client.comment.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
      },
      post: {
        connect: {
          id: postId,
        },
      },
      comment: payload,
    },
  })

  console.log(comment)
  return res.json({
    ok: true,
  })
}

export default withSession(withHandler({ methods: ['POST'], handler }))
