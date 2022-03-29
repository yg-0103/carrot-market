import { Stream } from '@prisma/client'
import useSWR from 'swr'

interface StreamsResponseType {
  ok: boolean
  streams: Stream[]
}

export default function useStreams() {
  const { data, error } = useSWR<StreamsResponseType>('/api/streams')
  console.log(data)
  return { streams: data?.streams, isLoading: !data && !error }
}
