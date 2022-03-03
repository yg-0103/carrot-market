import { User } from '@prisma/client'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import useSWR from 'swr'

interface UserResponseType {
  ok: boolean
  profile: User
}

export default function useUser() {
  const { data, error } = useSWR<UserResponseType>('/api/users/me')
  const router = useRouter()
  useEffect(() => {
    if (data && !data.ok) {
      router.replace('/enter')
    }
  }, [data, router])

  return { user: data?.profile, isLoading: !error && !data }
}
