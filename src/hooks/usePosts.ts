import { Post, User } from '@prisma/client'
import useSWR from 'swr'

interface PostsResponseType {
  ok: boolean
  posts: ({
    _count: { comments: number; wonders: number }
    user: Pick<User, 'name'>
  } & Post)[]
}

export default function usePosts() {
  const { data, error } = useSWR<PostsResponseType>('/api/posts')

  return { posts: data?.posts, isLoading: !data && !error }
}
