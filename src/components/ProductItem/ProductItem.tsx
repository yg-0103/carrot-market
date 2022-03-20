import Link from 'next/link'

interface Props {
  productName: string
  desc: string
  price: number
  likeCount: number
  id: number
}

const ProductItem = ({ productName, desc, likeCount, price, id }: Props) => {
  return (
    <Link href={`/products/${id}`} passHref>
      <div className="p-4 flex justify-between cursor-pointer">
        <div className="flex space-x-3 items-center justify-center">
          <div className="w-24 h-24 bg-gray-400 rounded-md" />
          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 text-md">
              {productName}
            </h3>
            <span className="text-xs text-gray-500">{desc}</span>
            <span className="mt-2 text-sm font-bold">${price}</span>
          </div>
        </div>
        <div className="flex items-end space-x-3 text-sm font-semibold">
          <div className="flex text-gray-500 items-center justify-center space-x-0.5">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              ></path>
            </svg>
            <span>{likeCount}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem
