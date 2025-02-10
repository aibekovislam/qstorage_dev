'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'

import { ProductsOutgoing } from '..'
import { ProductsOutgoingTypes } from '../types'

function useList() {
  const [productsOutgoingList, setProductsOutgoingList] = React.useState<ProductsOutgoingTypes.Table[] | undefined>(undefined)
  const createModal = useDisclosure()
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '#', title: 'Склад №1' },
    { href: '/products/outgoing', title: 'Уход товаров' },
  ]

  // TODO попросить санжика поменять название ключей на цвета
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

  const ProductsOutgoingGET = React.useCallback(async () => {
    try {
      const response = await ProductsOutgoing.API.List.getProductsOutgoingList()

      setProductsOutgoingList(response.data.results)
    } catch (error) {
      console.log('products incoming error', error)
    }
  }, [])

  return {
    breadcrumbData,
    productsOutgoingList,
    actions: {
      createModal,
      router,
      ProductsOutgoingGET,
      checkStatus,
      getTagColor,
    },
  }
}

export const use = useList
