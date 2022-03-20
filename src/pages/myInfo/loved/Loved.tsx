import Layout from '@components/Layout'
import ProductItem from '@components/ProductItem'
import useMyRecords from '@hooks/useMyRecords'
import type { NextPage } from 'next'

const Loved: NextPage = () => {
  const { records } = useMyRecords({ kind: 'Fav' })

  return (
    <Layout title="관심 목록" canGoBack>
      <div className="flex flex-col pb-10 divide-y-2">
        {records?.map((record) => (
          <ProductItem
            id={record.id}
            key={record.id}
            productName={record.product.name}
            price={record.product.price}
            desc={record.product.description}
            likeCount={record.product._count.favs}
            commentCount={1}
          />
        ))}
      </div>
    </Layout>
  )
}

export default Loved
