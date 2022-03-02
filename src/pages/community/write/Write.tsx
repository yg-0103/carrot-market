import Button from '@components/Button'
import Layout from '@components/Layout'
import type { NextPage } from 'next'

const Write: NextPage = () => {
  return (
    <Layout title="글 작성" canGoBack>
      <form className="px-4 py-10">
        <textarea
          className="mt-1 shadow-sm w-full focus:ring-orange-500 rounded-md border-gray-300 focus:border-orange-500 "
          rows={4}
          placeholder="Ask a question!"
        />
        <div className="mt-2">
          <Button>Submit</Button>
        </div>
      </form>
    </Layout>
  )
}

export default Write
