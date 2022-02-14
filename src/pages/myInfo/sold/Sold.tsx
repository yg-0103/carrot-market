import Layout from '@components/Layout'
import ProductItem from '@components/ProductItem'
import type { NextPage } from 'next'

const Sold: NextPage = () => {
  return (
    <Layout title="판매 목록" canGoBack>
      <div className="flex flex-col divide-y-2 pb-10">
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

export default Sold
