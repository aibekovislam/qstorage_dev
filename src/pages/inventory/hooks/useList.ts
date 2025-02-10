'use client'

import { useRouter } from 'next/navigation'

function useList() {
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/inventory', title: 'Остатки товара' },
  ]

  return {
    breadcrumbData,
    actions: {
      router,
    },
  }
}

export const use = useList
