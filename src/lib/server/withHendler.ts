import { NextApiRequest, NextApiResponse } from 'next'

export interface ResponseType {
  ok: boolean
  [key: string]: any
}

interface ConfigType {
  method: 'POST' | 'GET' | 'DELETE'
  handler: (req: NextApiRequest, res: NextApiResponse) => void
  isPrivate?: boolean
}
export default function withHandler({
  method,
  handler,
  isPrivate = true,
}: ConfigType) {
  return async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
    if (isPrivate && !req.session.user?.id) {
      return res.json({ ok: false, error: 'Plz login' })
    }

    if (req.method !== method) {
      return res.status(405).end()
    }

    handler(req, res)
  }
}
