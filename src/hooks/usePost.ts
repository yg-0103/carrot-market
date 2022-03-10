import { Comment, Post, User } from '@prisma/client'
import useSWR from 'swr'

interface Props {
  postId: number
}

interface PostResponseType {
  post: {
    user: User
    comments: ({ user: User } & Comment)[]
    _count: {
      wonders: number
    }
  } & Post
  isWondering: boolean
}

export default function usePost({ postId }: Props) {
  const { data, error, mutate } = useSWR<PostResponseType>(
    postId ? `/api/posts/${postId}` : null
  )

  return [
    {
      post: data?.post,
      isWondering: data?.isWondering,
      loading: !data && !error,
    },
    mutate,
  ] as const
}
