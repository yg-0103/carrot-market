import { Product, Record } from '@prisma/client'
import useSWR from 'swr'

interface Props {
  kind: 'Fav' | 'Purchase' | 'Sale'
}

interface RecordsResponseType {
  ok: boolean
  records: ({ product: { _count: { favs: number } } & Product } & Record)[]
}

export default function useMyRecords({ kind }: Props) {
  const { data, error } = useSWR<RecordsResponseType>(
    `/api/users/me/records?kind=${kind}`
  )

  return { records: data?.records, loading: !!data && !!error }
}
