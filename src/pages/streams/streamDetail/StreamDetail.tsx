import Layout from '@components/Layout'
import Message from '@components/Message'
import useMutation from '@hooks/useMutation'
import useStream from '@hooks/useStream'
import useUser from '@hooks/useUser'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'

interface MessageForm {
  message: string
}

const StreamDetail: NextPage = () => {
  const router = useRouter()
  const streamId = Number(router.query.id)
  const { user } = useUser()
  const [sendMessage, { loading, data }] = useMutation(
    `/api/streams/${streamId}/message`
  )
  const [{ stream }, mutate] = useStream({ streamId })
  const { register, reset, handleSubmit } = useForm<MessageForm>()

  const onValid = async (form: MessageForm) => {
    if (loading) return
    await sendMessage(form)
    reset()
    mutate()
  }

  if (!stream) return null

  return (
    <Layout title="라이브 정보" canGoBack>
      <div className="py-4 px-4  space-y-4">
        <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
        <div className="mt-5">
          <h1 className="text-3xl font-bold text-gray-900">{stream?.name}</h1>
          <span className="text-2xl block mt-3 text-gray-900">
            ${stream?.price}
          </span>
          <p className=" my-6 text-gray-700">{stream?.description}</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Live Chat</h2>
          <div className="py-10 pb-16 h-[50vh] overflow-y-scroll  px-4 space-y-4">
            {stream.messages.map((message) => (
              <Message
                key={message.id}
                message={message.message}
                reverse={message.user.id === user?.id}
              />
            ))}
          </div>
          <div className="fixed py-2 bg-white  bottom-0 inset-x-0">
            <form
              className="flex relative max-w-md items-center  w-full mx-auto"
              onSubmit={handleSubmit(onValid)}
            >
              <input
                type="text"
                className="shadow-sm rounded-full w-full border-gray-300 focus:ring-orange-500 focus:outline-none pr-12 focus:border-orange-500"
                {...register('message', { required: true })}
              />
              <div className="absolute inset-y-0 flex py-1.5 pr-1.5 right-0">
                <button className="flex focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 items-center bg-orange-500 rounded-full px-3 hover:bg-orange-600 text-sm text-white">
                  &rarr;
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default StreamDetail
