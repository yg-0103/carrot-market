interface Props {
  children: React.ReactNode
  onClick: () => void
}

const FloatingButton = ({ children, onClick }: Props) => {
  return (
    <button
      className="fixed bottom-20 right-6 rounded-full p-3 bg-orange-400 text-white font-bold hover:bg-orange-500 shadow-lg transition"
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default FloatingButton
