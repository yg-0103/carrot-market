import { NextApiRequest, NextApiResponse } from 'next'

export default function withHandler(
  method: 'POST' | 'GET' | 'DELETE',
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      return res.status(405).end()
    }

    fn(req, res)
  }
}