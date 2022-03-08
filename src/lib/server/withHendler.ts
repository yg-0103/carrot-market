import { NextApiRequest, NextApiResponse } from 'next'

export interface ResponseType {
  ok: boolean
  [key: string]: any
}

type Method = 'POST' | 'GET' | 'DELETE'

interface ConfigType {
  methods: Method[]
  handler: (req: NextApiRequest, res: NextApiResponse) => void
  isPrivate?: boolean
}
export default function withHandler({
  methods,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    if (isPrivate && !req.session.user?.id) {
      return res.json({ ok: false, error: 'Plz login' })
    }

    if (req.method && !methods.includes(req.method as Method)) {
      return res.status(405).end()
    }

    return handler(req, res)
  }
}
