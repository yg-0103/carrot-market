interface Props {
  label: string
  placeholder?: string
  type?: string
}

const Input = ({ label, placeholder, type = 'email' }: Props) => {
  return (
    <label className="flex flex-col justify-center text-sm font-medium text-gray-700">
      {label}
      <input
        type={type}
        required
        placeholder={placeholder}
        className="mt-2 appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
      />
    </label>
  )
}

Input.Phone = function Phone({ label }: Props) {
  return (
    <label className="flex flex-col justify-center text-sm font-medium text-gray-700">
      {label}
      <div className="mt-2 flex shadow-sm">
        <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
          +82
        </span>
        <input
          type="number"
          required
          className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md rounded-l-none shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
        />
      </div>
    </label>
  )
}

Input.Price = function Price({ label }: Props) {
  return (
    <label className="flex flex-col justify-center text-sm font-medium text-gray-700">
      {label}
      <div className="relative flex items-center mt-2">
        <div className="absolute left-3">
          <span className="text-md text-gray-500">$</span>
        </div>
        <input
          id="price"
          type="text"
          placeholder="0.00"
          className="px-7 flex-1 border-gray-400 rounded-md focus:outline-none focus:border-orange-500 focus:ring-orange-500"
        />
        <div className="absolute right-3">
          <span className="text-gray-500">USD</span>
        </div>
      </div>
    </label>
  )
}

export default Input
