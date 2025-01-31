'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useList() {
  const [productsIncomingList, setProductsIncomingList] = React.useState<ProductsIncomingTypes.Table[] | undefined>(undefined)
  const createModal = useDisclosure()
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '#', title: 'Склад №1' },
    { href: '/products/incoming', title: 'Приход товаров' },
  ]

  function checkStatus(status: string): string {
    const statusMap: Record<string, string> = {
      in_progress: 'В ПРОЦЕССЕ',
      verified: 'ПРОВЕРЕНО',
      new: 'НОВОЕ',
      rejected: 'ОТКЛОНЕНО',
      not_verified: 'НЕ ПРОВЕРЕНО',
    }

    return statusMap[status] || 'НЕИЗВЕСТНЫЙ СТАТУС'
  }

  function getTagColor(status: string): string {
    const colorMap: Record<string, string> = {
      in_progress: 'gold',
      verified: 'green',
      new: 'geekblue',
      rejected: 'red',
      not_verified: 'gray',
    }

    return colorMap[status] || 'default'
  }

  const ProductsIncomingGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.List.getProductsIncomingList()

      setProductsIncomingList(response.data.results)
    } catch (error) {
      console.log('products incoming error', error)
    }
  }, [])

  return {
    breadcrumbData,
    productsIncomingList,
    actions: {
      createModal,
      router,
      ProductsIncomingGET,
      checkStatus,
      getTagColor,
    },
  }
}

export const use = useList
