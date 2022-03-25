import Button from '@components/Button'
import Input from '@components/Input'
import Layout from '@components/Layout'
import useMutation from '@hooks/useMutation'
import useUser from '@hooks/useUser'
import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface EditProfileForm {
  email?: string
  phone?: bigint
  name?: string
  errors?: string
}

interface EditProfileResponseType {
  ok: boolean
  error?: string
}

const EditProfile: NextPage = () => {
  const { user } = useUser()
  const {
    register,
    setValue,
    handleSubmit,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<EditProfileForm>()
  const [editProfile, { data, loading }] =
    useMutation<EditProfileResponseType>('/api/users/me')

  const watchingField = watch(user?.email ? 'email' : 'phone')

  const onValid = ({ email, phone, name }: EditProfileForm) => {
    if (loading) return
    console.log({ email, phone, name })
    if (!email && !phone) {
      setError('errors', {
        message: 'You must choose either an email or a phone.',
      })
    }

    editProfile({ email, phone, name })
  }

  useEffect(() => {
    if (user?.email) setValue('email', user.email)
    if (user?.phone) setValue('phone', user.phone)
    if (user?.name) setValue('name', user.name)
  }, [user, setValue])

  useEffect(() => {
    clearErrors()
  }, [watchingField, clearErrors])

  useEffect(() => {
    if (data && !data.ok && data.error) {
      setError('errors', { message: data.error })
    }
  }, [data, setError])

  return (
    <Layout title="프로필 수정" canGoBack>
      <form onSubmit={handleSubmit(onValid)} className="py-10 px-4 space-y-4">
        <div className="flex items-center space-x-3">
          <div className="w-14 h-14 rounded-full bg-slate-500" />
          <label
            htmlFor="picture"
            className="cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 text-gray-700"
          >
            Change
            <input
              id="picture"
              type="file"
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>
        <div className="space-y-1">
          <Input label="Name" type="text" register={register('name')} />
        </div>
        {user?.email && (
          <div className="space-y-1">
            <Input label="Email address" register={register('email')} />
          </div>
        )}
        {user?.phone && (
          <div className="space-y-1">
            <Input.Phone label="Phone number" register={register('phone')} />
          </div>
        )}
        {errors.errors && (
          <span className="mt-1 block text-center font-medium text-red-500">
            {errors.errors.message}
          </span>
        )}
        <Button loading={loading}>Update profile</Button>
      </form>
    </Layout>
  )
}

export default EditProfile
