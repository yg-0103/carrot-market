export default function withHandler(
  method: 'POST' | 'GET' | 'DELETE',
  fn: (req: NextApiRequest, res: NextApiResponse) => void
) {}
