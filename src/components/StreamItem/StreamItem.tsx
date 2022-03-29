import Link from 'next/link'

interface Props {
  title: string
  id: number
}

const StreamItem = ({ title, id }: Props) => {
  return (
    <Link href={`/streams/${id}`} passHref>
      <div className="px-4 py-4">
        <div className="w-full bg-slate-300 aspect-video" />
        <h3 className="font-semibold text-gray-700 mt-4">{title}</h3>
      </div>
    </Link>
  )
}

export default StreamItem
