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
    const { email, name, phone } = req.body
    const userId = req.session.user?.id

    const currentUser = await client.user.findUnique({
      where: {
        id: userId,
      },
    })

    const alreadyExistEmail = !!(await client.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    }))

    const alreadyExistPhone = !!(await client.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    }))
    console.log(currentUser)
  }
}

export default withSession(withHandler({ methods: ['GET', 'POST'], handler }))
