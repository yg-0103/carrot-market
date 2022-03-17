import { Post, User } from '@prisma/client'
import useSWR from 'swr'
import useCoods from './useCoords'

interface PostsResponseType {
  ok: boolean
  posts: ({
    _count: { comments: number; wonders: number }
    user: Pick<User, 'name'>
  } & Post)[]
}

export default function usePosts() {
  const { latitude, longitude, isGrantedPermission } = useCoods()

  const { data, error } = useSWR<PostsResponseType>(
    isGrantedPermission === null
      ? null
      : latitude && longitude
      ? `/api/posts?latitude=${latitude}&longitude=${longitude}`
      : '/api/posts'
  )

  if (isGrantedPermission) {
    if (latitude === null && longitude === null)
      return { posts: null, isLoading: null }
  }

  return { posts: data?.posts, isLoading: !data && !error }
}
