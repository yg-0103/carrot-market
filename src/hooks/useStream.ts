import { Message, Stream, User } from '@prisma/client'
import useSWR from 'swr'

interface StreamResponseType {
  stream: {
    user: Pick<User, 'id' | 'avatar' | 'name'>
    messages: ({ user: User } & Message)[]
  } & Stream
}

export default function useStream({ streamId }: { streamId: number }) {
  const { data, error, mutate } = useSWR<StreamResponseType>(
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
