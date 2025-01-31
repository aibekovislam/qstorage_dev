'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'

import { ProductsOutgoing } from '..'
import { ProductsOutgoingTypes } from '../types'

function useList() {
  const [productsOutgoingList, setProductsOutgoingList] = React.useState<ProductsOutgoingTypes.Item[] | undefined>(undefined)
  const createModal = useDisclosure()
  const router = useRouter()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '#', title: 'Склад №1' },
    { href: '/products/outgoing', title: 'Уход товаров' },
  ]

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
    },
  }
}

export const use = useList
