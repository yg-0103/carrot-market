interface Props {
  tags: string[]
}

const Tags = ({ tags }: Props) => {
  return (
    <div className="space-x-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-gray-900 bg-gray-100 px-1.5 py-1 text-sm rounded-xl"
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default Tags
