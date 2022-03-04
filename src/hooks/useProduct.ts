import { Product, User } from '@prisma/client'
import useSWR from 'swr'

interface ProductsResponseType {
  ok: boolean
  product: {
    user: Pick<User, 'id' | 'avatar' | 'name'>
  } & Product
}

export default function useProduct({ productId }: { productId: number }) {
  const { data, error } = useSWR<ProductsResponseType>(
    productId ? `/api/products/${productId}` : null
  )
  console.log(data)
  return { product: data?.product, isLoading: !data && !error }
}
