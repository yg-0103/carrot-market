interface Props {
  children: React.ReactNode
  name: string
}

const ChatItem = ({ children, name }: Props) => {
  return (
    <div className="flex px-4 cursor-pointer py-4 items-center space-x-3">
      <div className="w-12 h-12 rounded-full bg-slate-300" />
      <div>
        <p className="text-gray-700">{name}</p>
        <p className="text-sm  text-gray-500">{children}</p>
      </div>
    </div>
  )
}

export default ChatItem
