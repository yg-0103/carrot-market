import { cls } from '@lib/client/utils'

interface Props {
  message: string
  reverse?: boolean
}

export default function Message({ message, reverse }: Props) {
  return (
    <div
      className={cls(
        'flex items-start space-x-2',
        reverse ? ' space-x-reverse flex-row-reverse' : ''
      )}
    >
      <div className="w-8 h-8 rounded-full bg-slate-400" />
      <div className="w-1/2 text-sm text-gray-700 p-2 border border-gray-300 rounded-md">
        <p>{message}</p>
      </div>
    </div>
  )
}
