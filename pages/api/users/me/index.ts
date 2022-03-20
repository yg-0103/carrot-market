import { NextApiRequest, NextApiResponse } from 'next'
import withHandler, { ResponseType } from '@lib/server/withHendler'
import client from '@lib/client/client'
import { withSession } from '@lib/server/withSession'

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
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

export default withSession(withHandler({ methods: ['GET'], handler }))
