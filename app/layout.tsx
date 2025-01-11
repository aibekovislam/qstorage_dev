import React, { Suspense } from 'react'

import { SFPro } from '@/shared/assets/fonts/fonts'
import { getSession } from '@/shared/lib/session'
import AntdProvider from '@/shared/providers/Antd'
import '@/shared/assets/styles/globals.css'
import ReduxProvider from '@/shared/providers/ReduxProvider'
import { initializeStore } from '@/store'

import Loader from './loading'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const userData = await getSession()

  const preloadedState = userData ? { user: { userData: userData.user, isAuth: true } } : {}
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
