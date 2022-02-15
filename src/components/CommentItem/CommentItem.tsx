import Profile from '@components/Profile'

interface Props {
  writer: string
  desc: string
  createdAt: string
}

const CommentItem = ({ createdAt, desc, writer }: Props) => {
  return (
    <div className="flex items-start space-x-3">
      <Profile name={writer} size={10}>
        <div>
          <span className="text-xs text-gray-500 block ">{createdAt}</span>
          <p className="text-gray-700 mt-2">{desc}</p>
        </div>
      </Profile>
    </div>
  )
}

export default CommentItem
