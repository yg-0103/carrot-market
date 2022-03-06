import Button from '@components/Button'
import Layout from '@components/Layout'
import Profile from '@components/Profile'
import useProduct from '@hooks/useProduct'
import useUser from '@hooks/useUser'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'

const ProductDetail: NextPage = () => {
  const router = useRouter()
  const productId = Number(router.query.id)
  const { product, relatedProducts } = useProduct({ productId })

  if (!product) return null
  return (
    <Layout title="상품 정보" canGoBack>
      <div className="px-4 py-10">
        <div>
          <div className="h-64 bg-slate-300 mb-3" />
          <Profile name={product.user.name}>
            <Link href="/myInfo/edit">
              <a>View Profile &rarr;</a>
            </Link>
          </Profile>
          <div className="mt-5 border-t pt-4">
            <h1 className="font-bold text-3xl text-gray-900">{product.name}</h1>
            <p className="mt-3 mb-5 font-medium text-xl text-gray-800">
              ${product.price}
            </p>
            <p className="text-sm text-gray-800">{product.description}</p>
            <div className="flex items-center space-x-2 mt-5">
              <Button onClick={() => {}}>Talk to seller</Button>
              <button className="p-3 flex items-center justify-center text-gray-400 hover:bg-slate-200 rounded-md transition">
                <svg
                  className="h-6 w-6 "
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-7">
          <h2 className="text-gray-900 font-bold text-2xl">Similar items</h2>
          <div className="mt-6 grid grid-cols-2 gap-5">
            {relatedProducts?.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} passHref>
                <div className="-mt-2">
                  <div className="h-32 bg-slate-300" />
                  <h3 className="font-medium text-sm mt-3 mb-2 text-gray-600">
                    {product.name}
                  </h3>
                  <p className="text-xs font-medium">${product.price}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetail
