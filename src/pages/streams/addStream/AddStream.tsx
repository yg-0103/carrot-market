import Button from '@components/Button'
import Input from '@components/Input'
import Layout from '@components/Layout'
import TextArea from '@components/TextArea'
import useMutation from '@hooks/useMutation'
import { Stream } from '@prisma/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface AddStreamForm {
  name: string
  price: number
  description: string
}

interface AddStreamResponseType {
  ok: boolean
  stream: Stream
}

const AddStream: NextPage = () => {
  const [addStream, { loading, data }] =
    useMutation<AddStreamResponseType>('/api/streams')
  const { register, handleSubmit } = useForm<AddStreamForm>()
  const router = useRouter()

  const onValid = (form: AddStreamForm) => {}

  useEffect(() => {
    if (data && data.ok) {
      router.push(`/streams/${data.stream.id}`)
    }
  }, [data, router])

  return (
    <Layout title="라이브 등록" canGoBack>
      <form className=" space-y-5 py-10 px-4" onSubmit={handleSubmit(onValid)}>
        <div>
          <Input
            label="Name"
            type="text"
            register={register('name', { required: true })}
          />
        </div>
        <div>
          <Input.Price
            label="Price"
            register={register('price', { required: true })}
          />
        </div>
        <div>
          <TextArea
            label="Description"
            register={register('description', { required: true })}
          />
        </div>
        <div className="mt-5">
          <Button loading={loading}>Go live</Button>
        </div>
      </form>
    </Layout>
  )
}

export default AddStream
