interface Props {
  children: React.ReactNode
  name: string
  size?: number
}

const Profile = ({ children, name, size = 14 }: Props) => {
  return (
    <div className="flex space-x-3 cursor-pointer">
      <div className={`w-${size} h-${size} rounded-full bg-slate-300`} />
      <div className="flex flex-col justify-center">
        <span className="font-semibold text-gray-900">{name}</span>
        <div className="font-medium text-gray-500 text-sm">{children}</div>
      </div>
    </div>
  )
}

export default Profile
