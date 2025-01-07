import React from 'react'

import { useRouter } from 'next/navigation'

import { useAppDispatch } from '@/shared/hooks/redux'
import useNotification from '@/shared/hooks/useNotifications'
import { login as onLogin } from '@/store/actions/user'

import { getMyProfile, signIn } from '../api'
import { LoginTypes } from '../types'

export const useLogin = () => {
  const [isLoading, setIsLoading] = React.useState(false)
  const { contextHolder, showError } = useNotification()
  const router = useRouter()
  const dispatch = useAppDispatch()

  const login = React.useCallback(async (data: LoginTypes.Form) => {
    setIsLoading(true)

    signIn(data)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          getMyProfile()
            .then(res => res.json())
            .then(res => {
              dispatch(onLogin(res.data))

              if (res.success) {
                return router.push('/')
              }

              if (!res.success) {
                showError('Что-то пошло не так')
              }
            })
        } else if (!res.success) {
          showError('Такого аккаунта не существует!')
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  return {
    isLoading,
    contextHolder,
    actions: {
      login,
    },
  }
}

export const use = useLogin
