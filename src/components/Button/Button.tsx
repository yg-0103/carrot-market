interface Props {
  children: React.ReactNode
  loading?: boolean
  textColor?: string
  bgColor?: string
  onClick?: () => void
}

const Button = ({
  children,
  onClick,
  loading,
  bgColor = 'orange',
  textColor = 'white',
}: Props) => {
  return (
    <button
      className={`w-full bg-${bgColor}-500 hover:bg-${bgColor}-600 text-${textColor} py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-${bgColor}-500 focus:outline-none`}
      onClick={onClick}
    >
      {loading ? 'loading..' : children}
    </button>
  )
}

export default Button
