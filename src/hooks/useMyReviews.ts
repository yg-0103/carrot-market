import { Review, User } from '@prisma/client'
import useSWR from 'swr'

interface ReviewsResponseType {
  ok: boolean
  reviews: ({
    createdBy: Pick<User, 'name' | 'avatar' | 'id'>
  } & Review)[]
}

export default function useMyReviews() {
  const { data, error } = useSWR<ReviewsResponseType>('/api/reviews')

  return { reviews: data?.reviews, loading: !!data && !!error }
}
