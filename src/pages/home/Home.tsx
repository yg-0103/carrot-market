import FloatingButton from '@components/FloatingButton'
import Layout from '@components/Layout'
import ProductItem from '@components/ProductItem'
import useProducts from '@hooks/useProducts'
import useUser from '@hooks/useUser'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'

const Home: NextPage = () => {
  const { user, isLoading } = useUser()
  const { products } = useProducts()
  const router = useRouter()

  console.log(products)
  return (
    <Layout title="홈" hasTapBar>
      <div className="divide-y-2">
        {products?.map(({ id, name, price, description }) => (
          <ProductItem
            key={id}
            productName={name}
            id={id}
            price={price}
            desc={description}
            likeCount={1}
            commentCount={1}
          />
        ))}
        <FloatingButton onClick={() => router.push('/products/upload')}>
          <svg
            className="h-6 w-6"
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
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </FloatingButton>
      </div>
    </Layout>
  )
}

export default Home
