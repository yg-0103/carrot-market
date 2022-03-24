interface Props {
  title: string
}

const StreamItem = ({ title }: Props) => {
  return (
    <div className="px-4 py-4">
      <div className="w-full bg-slate-300 aspect-video" />
      <h3 className="font-semibold text-gray-700 mt-4">{title}</h3>
    </div>
  )
}

export default StreamItem
