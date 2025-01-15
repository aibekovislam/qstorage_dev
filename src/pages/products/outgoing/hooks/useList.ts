'use client'

import { useRouter } from 'next/navigation'

function useList() {
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '#', title: 'Склад №1' },
    { href: '/products/outgoing', title: 'Уход товаров' },
  ]

  return {
    breadcrumbData,
    actions: {
      router,
    },
  }
}

export const use = useList
