import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'POST') {
    const {
      body: { question, latitude, longitude },
      session: { user },
    } = req

    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
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
    const { latitude, longitude } = req.query

    const maxLatitude = parseFloat(latitude?.toString()) + 0.01
    const minLatitude = parseFloat(latitude?.toString()) - 0.01
    const maxLongitude = parseFloat(longitude?.toString()) + 0.01
    const minLongitude = parseFloat(longitude?.toString()) - 0.01

    const posts = await client.post.findMany({
      where:
        latitude && longitude
          ? {
              latitude: {
                gte: minLatitude,
                lte: maxLatitude,
              },
              longitude: {
                gte: minLongitude,
                lte: maxLongitude,
              },
            }
          : {},
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
