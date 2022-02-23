import { AxiosResponse } from 'axios'
import { useState } from 'react'

interface Props {
  fetcher: <T>(...args: any) => Promise<AxiosResponse<T, any>>
}

interface MutationState<T> {
  loading: boolean
  data: null | T
  error: any
}

export default function useFetch<T>({ fetcher }: Props) {
  const [state, setState] = useState<MutationState<T>>({
    loading: false,
    data: null,
    error: null,
  })

  const fetch = async (...args: any) => {
    setState({ ...state, loading: true })

    try {
      const { data } = await fetcher<T>(...args)

      setState({ ...state, loading: false, data })
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error,
      })
    }
  }
  return [fetch, state] as const
}
