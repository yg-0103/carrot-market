import { Product } from '@prisma/client'
import useSWR from 'swr'

interface ProductsResponseType {
  ok: boolean
  products: ({ _count: { favs: number } } & Product)[]
}

export default function useProducts() {
  const { data, error } = useSWR<ProductsResponseType>('/api/products')
  console.log(data)
  return { products: data?.products, isLoading: !data && !error }
}
