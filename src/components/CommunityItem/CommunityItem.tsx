interface Props {
  tags: string[]
  question: string
  writer: string
  createdAt: string
  likeCount: number
  commentCount: number
}

const CommunityItem = ({
  tags,
  commentCount,
  createdAt,
  likeCount,
  question,
  writer,
}: Props) => {
  return (
    <div className="cursor-pointer py-3">
      <div className="space-x-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="text-gray-900 bg-gray-200 px-1.5 py-1 text-sm rounded-xl"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-3 text-gray-800">
        <span className="text-orange-500">Q.</span> {question}
      </div>
      <div className="mt-5 mb-4 text-xs text-gray-500 flex items-center justify-between font-medium">
        <span>{writer}</span>
        <span>{createdAt}</span>
      </div>
      <div className="py-3 border-t border-b flex items-center space-x-3 text-gray-600 font-medium">
        <div className="flex items-center space-x-2 text-sm">
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
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>궁금해요 {likeCount}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm">
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
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          <span>답변 {commentCount}</span>
        </div>
      </div>
    </div>
  )
}

export default CommunityItem