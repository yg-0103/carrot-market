import Layout from '@components/Layout'
import ProductItem from '@components/ProductItem'
import type { NextPage } from 'next'

const Bought: NextPage = () => {
  return (
    <Layout title="구매 목록" canGoBack>
      <div className="flex flex-col pb-10 divide-y-2">
        {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <ProductItem
            key={i}
            productName="New iPhone 14"
            price={95}
            desc="Black"
            likeCount={1}
            commentCount={1}
          />
        ))}
      </div>
    </Layout>
  )
}

export default Bought
