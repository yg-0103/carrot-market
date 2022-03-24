import Button from '@components/Button'
import Input from '@components/Input'
import Layout from '@components/Layout'
import TextArea from '@components/TextArea'
import type { NextPage } from 'next'

const AddStream: NextPage = () => {
  return (
    <Layout title="라이브 등록" canGoBack>
      <div className=" space-y-5 py-10 px-4">
        <div>
          <Input label="Name" type="text" />
        </div>
        <div>
          <Input.Price label="Price" />
        </div>
        <div>
          <TextArea label="Description" />
        </div>
        <div className="mt-5">
          <Button>Go live</Button>
        </div>
      </div>
    </Layout>
  )
}

export default AddStream
