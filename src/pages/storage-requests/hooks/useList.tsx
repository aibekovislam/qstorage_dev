'use client'

import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'

function useList() {
  const createModal = useDisclosure()
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/storage-requests', title: 'Заявки на склад' },
  ]

  return {
    breadcrumbData,
    actions: {
      createModal,
      router,
    },
  }
}

export const use = useList
