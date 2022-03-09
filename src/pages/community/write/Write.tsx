import Button from '@components/Button'
import Layout from '@components/Layout'
import TextArea from '@components/TextArea'
import useMutation from '@hooks/useMutation'
import { Post } from '@prisma/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface WriteForm {
  question: string
}

interface PostResponseType {
  ok: boolean
  post: Post
}

const Write: NextPage = () => {
  const router = useRouter()
  const { register, handleSubmit } = useForm<WriteForm>()
  const [post, { loading, data }] = useMutation<PostResponseType>('/api/posts')

  const onValid = (data: WriteForm) => {
    post(data)
  }

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/community/${data.post.id}`)
    }
  }, [data, router])

  return (
    <Layout title="글 작성" canGoBack>
      <form className="px-4 py-10" onSubmit={handleSubmit(onValid)}>
        <TextArea
          label="Question"
          placeholder="Ask a question"
          register={register('question', {
            required: 'Question is required',
            minLength: 5,
          })}
        />
        <div className="mt-2">
          <Button loading={loading}>Submit</Button>
        </div>
      </form>
    </Layout>
  )
}

export default Write
