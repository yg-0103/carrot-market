import { Stream, User } from '@prisma/client'
import useSWR from 'swr'

interface ProductsResponseType {
  ok: boolean
  stream: {
    user: Pick<User, 'id' | 'avatar' | 'name'>
  } & Stream
}

export default function useStream({ streamId }: { streamId: number }) {
  const { data, error, mutate } = useSWR<ProductsResponseType>(
    streamId ? `/api/streams/${streamId}` : null
  )

  return [
    {
      stream: data?.stream,
      isLoading: !data && !error,
    },
    mutate,
  ] as const
}
