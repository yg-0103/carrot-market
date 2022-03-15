import Button from '@components/Button'
import CommentItem from '@components/CommentItem'
import Layout from '@components/Layout'
import Profile from '@components/Profile'
import Tags from '@components/Tags'
import TextArea from '@components/TextArea'
import useMutation from '@hooks/useMutation'
import usePost from '@hooks/usePost'
import { cls } from '@lib/client/utils'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/ko'

dayjs.extend(relativeTime)
dayjs.locale('ko')

interface CommentForm {
  comment: string
}

interface CommentResponseType {
  ok: boolean
}

const CommunityDetail: NextPage = () => {
  const router = useRouter()
  const postId = Number(router.query.id)
  const { register, handleSubmit, reset } = useForm<CommentForm>()
  const [{ post, isWondering }, mutate] = usePost({ postId })

  const [wonder, { loading: wonderLoading }] = useMutation(
    `/api/posts/${postId}/wonder`
  )

  const [comment, { data: commentData, loading: commentLoading }] =
    useMutation<CommentResponseType>(`/api/posts/${postId}/comment`)

  const onWonderClick = () => {
    mutate(
      (prev) =>
        prev && {
          ...prev,
          isWondering: !isWondering,
          post: {
            ...prev.post,
            _count: {
              wonders: isWondering
                ? prev.post._count.wonders - 1
                : prev.post._count.wonders + 1,
            },
          },
        },
      false
    )
    if (wonderLoading) return
    wonder()
  }

  const onValid = (form: CommentForm) => {
    if (commentLoading) return
    comment(form)
  }

  useEffect(() => {
    if (commentData && commentData.ok) {
      reset()
      mutate()
    }
  }, [commentData, mutate, reset])

  if (!post) return null

  return (
    <Layout title="질문" canGoBack>
      <div>
        <div className="p-3">
          <Tags tags={['동네질문']} />
        </div>
        <div className="flex mb-3 px-4 cursor-pointer pb-3  border-b items-center space-x-3">
          <Profile name={post.user.name}>
            <Link href="/myInfo/edit">
              <a>View Profile &rarr;</a>
            </Link>
          </Profile>
        </div>
        <div>
          <div className="mt-2 px-4 text-gray-700">
            <span className="text-orange-500 font-medium">Q.</span>{' '}
            {post.question}
          </div>
          <div className="flex px-4 space-x-5 mt-3 text-gray-700 py-2.5 border-t border-b  w-full">
            <button
              className={cls(
                'flex space-x-2 items-center text-sm',
                isWondering ? 'text-green-600' : ''
              )}
              onClick={onWonderClick}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <span>궁금해요 {post._count.wonders}</span>
            </button>
            <button className="flex space-x-2 items-center text-sm">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                ></path>
              </svg>
              <span>답변 {post.comments.length}</span>
            </button>
          </div>
        </div>
        <div className="px-4 my-5 space-y-5">
          {post.comments.map((comment) => (
            <CommentItem
              key={comment.id}
              createdAt={dayjs(comment.createdAt).fromNow()}
              desc={comment.comment}
              writer={comment.user.name}
            />
          ))}
        </div>
        <form className="px-4" onSubmit={handleSubmit(onValid)}>
          <TextArea
            label=""
            placeholder="Answer this question!"
            register={register('comment', { required: true })}
          />
          <div className="mt-5">
            <Button loading={commentLoading}>Reply</Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default CommunityDetail
