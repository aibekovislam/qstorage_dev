import React, { Suspense } from 'react'

import { cookies } from 'next/headers'

import { axiosRequest } from '@/shared/api/axios'
import { SFPro } from '@/shared/assets/fonts/fonts'
import AntdProvider from '@/shared/providers/Antd'
import '@/shared/assets/styles/globals.css'
import ReduxProvider from '@/shared/providers/ReduxProvider'
import { ACCESS_TOKEN_COOKIE_KEY, REFRESH_TOKEN_COOKIE_KEY } from '@/shared/utils/token-manager/consts'
import { initializeStore } from '@/store'

import Loader from './loading'

async function getUserDataFromAPI() {
  const cookiesStore = await cookies()

  if (cookiesStore.get(ACCESS_TOKEN_COOKIE_KEY) || cookiesStore.get(REFRESH_TOKEN_COOKIE_KEY)) {
    const userData = await axiosRequest.get('/users/me/')

    return userData.data
  }

  return null
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getUserDataFromAPI()

  const preloadedState = userData ? { user: { userData: userData, isAuth: true } } : {}
  const store = initializeStore(preloadedState)
  const initialState = JSON.stringify(store.getState())

  return (
    <html lang="en">
      <body className={SFPro.className}>
        <ReduxProvider initialState={initialState}>
          <AntdProvider>
            <Suspense fallback={<Loader/>}>
              {children}
            </Suspense>
          </AntdProvider>
        </ReduxProvider>
      </body>
    </html>
  )
}
