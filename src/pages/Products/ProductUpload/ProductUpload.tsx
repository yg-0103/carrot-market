import Button from '@components/Button'
import Input from '@components/Input'
import Layout from '@components/Layout'
import TextArea from '@components/TextArea/TextArea'
import useMutation from '@hooks/useMutation'
import { Product } from '@prisma/client'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface UploadProductForm {
  name: string
  price: number
  description: string
}

interface UploadMutation {
  ok: boolean
  product: Product
}

const ProductUpload: NextPage = () => {
  const { register, handleSubmit } = useForm<UploadProductForm>()
  const [uploadProduct, { loading, data }] =
    useMutation<UploadMutation>('/api/products')
  const router = useRouter()
  const onValid = (data: UploadProductForm) => {
    console.log(data)
    uploadProduct(data)
  }

  useEffect(() => {
    if (data && data?.ok) {
      router.replace(`/products/${data.product.id}`)
    }
  }, [data, router])

  return (
    <Layout title="상품 등록" canGoBack>
      <form className="px-4 py-16" onSubmit={handleSubmit(onValid)}>
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
          <Input
            label="Name"
            type="text"
            register={register('name', { required: 'Name is required' })}
          />
        </div>
        <div>
          <Input.Price
            label="Price"
            register={register('price', { required: 'Price is required' })}
          />
        </div>
        <div className="mt-5">
          <TextArea
            label="Description"
            register={register('description', {
              required: 'Description is required',
            })}
          />
        </div>
        <div className="mt-5">
          <Button loading={loading}>Upload product</Button>
        </div>
      </form>
    </Layout>
  )
}

export default ProductUpload
