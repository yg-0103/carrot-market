import { UseFormRegisterReturn } from 'react-hook-form'

interface Props {
  label: string
  register?: UseFormRegisterReturn
}

export default function TextArea({ label, register }: Props) {
  return (
    <>
      <label htmlFor={label} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-2">
        <textarea
          id={label}
          rows={4}
          {...(register ?? {})}
          className="px-3 py-2 w-full border-gray-400 rounded-md focus:outline-none focus:border-orange-500 focus:ring-orange-500"
        />
      </div>
    </>
  )
}
