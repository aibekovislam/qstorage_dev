import { LoginTypes } from '../types'

export const signIn = (data: LoginTypes.Form) => {
  return fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export const getMyProfile = () => {
  return fetch('/api/users/me')
}
