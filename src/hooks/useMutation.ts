import axios from 'axios'
import { useState } from 'react'

interface MutationState<T> {
  loading: boolean
  data: null | T
  error: any
}

export default function useMutation<T>(url: string) {
  const [state, setState] = useState<MutationState<T>>({
    loading: false,
    data: null,
    error: null,
  })

  const mutation = async (...args: any) => {
    setState({ ...state, loading: true })

    try {
      console.log(args)
      const { data } = await axios.post<T>(url, ...args)

      setState({ ...state, loading: false, data })
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error,
      })
    }
  }
  return [mutation, state] as const
}
