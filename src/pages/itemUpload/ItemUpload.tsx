import Button from '@components/Button'
import Input from '@components/Input'
import Layout from '@components/Layout'
import type { NextPage } from 'next'

const ItemUpload: NextPage = () => {
  return (
    <Layout title="상품 등록" canGoBack>
      <div className="px-4 py-16">
        <div className="mb-5">
          <label className="flex items-center text-gray-500 justify-center h-48 border-gray-400 border-2 border-dashed rounded-md hover:text-orange-500 hover:border-orange-500 transition">
            <svg
              className="h-12 w-12"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <input type="file" className="hidden" />
          </label>
        </div>
        <div className="mb-4">
          <Input label="Name" type="text" />
        </div>
        <div>
          <Input.Price label="Price" />
        </div>
        <div className="mt-5">
          <label
            htmlFor="description"
            className="text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <div className="mt-2">
            <textarea
              id="description"
              rows={4}
              className="px-3 py-2 w-full border-gray-400 rounded-md focus:outline-none focus:border-orange-500 focus:ring-orange-500"
            />
          </div>
        </div>
        <div className="mt-5">
          <Button onClick={() => {}}>Upload product</Button>
        </div>
      </div>
    </Layout>
  )
}

export default ItemUpload
