import { Product, User } from '@prisma/client'
import useSWR from 'swr'

interface ProductsResponseType {
  ok: boolean
  product: {
    user: Pick<User, 'id' | 'avatar' | 'name'>
  } & Product
  relatedProducts: Product[]
  isLiked: boolean
}

export default function useProduct({ productId }: { productId: number }) {
  const { data, error, mutate } = useSWR<ProductsResponseType>(
    productId ? `/api/products/${productId}` : null
  )

  return [
    {
      product: data?.product,
      relatedProducts: data?.relatedProducts,
      isLiked: data?.isLiked,
      isLoading: !data && !error,
    },
    mutate,
  ] as const
}
