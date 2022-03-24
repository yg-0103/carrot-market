import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === 'GET') {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    })

    if (!profile) return res.status(404).end()

    return res.json({
      ok: true,
      profile,
    })
  }
  if (req.method === 'POST') {
    const {
      session: { user },
      body: { email, phone, name },
    } = req
    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    })

    if (email && email !== currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        })
      )
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: 'Email already taken.',
        })
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      })
    }

    if (phone && phone !== currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        })
      )
      if (alreadyExists) {
        return res.json({
          ok: false,
          error: 'Phone already in use.',
        })
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      })
    }
    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      })
    }
    return res.json({ ok: true })
  }
}

export default withSession(withHandler({ methods: ['GET', 'POST'], handler }))
