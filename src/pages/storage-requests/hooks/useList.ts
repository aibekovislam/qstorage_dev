'use client'

import { useRouter } from 'next/navigation'

function useList() {
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/storage-requests', title: 'Заявки на склад' },
  ]

  return {
    breadcrumbData,
    actions: {
      router,
    },
  }
}

export const use = useList
