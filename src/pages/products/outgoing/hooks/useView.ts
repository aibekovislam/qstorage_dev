'use client'

import React from 'react'

import { ProductsOutgoing } from '..'
import { ProductsOutgoingTypes } from '../types'

function useView() {
  const [incomingItem, setIncomingItem] = React.useState<ProductsOutgoingTypes.Item | null>(null)
  const [incomingItemLoading, setIncomingItemLoading] = React.useState(true)
  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '#', title: 'Склад №1' },
    { href: '/products/incoming', title: 'Приход товаров' },
    { title: `Приход ${incomingItem?.product?.title}` },
  ]

  const getIncomingDetails = React.useCallback(async (id: string) => {
    setIncomingItemLoading(true)

    try {
      const response = await ProductsOutgoing.API.View.getProductsIncomingList(id)

      if (response.status === 200) {
        setIncomingItem(response.data)
      }
    } catch (error) {
      console.log('get incoming details error', error)
    } finally {
      setIncomingItemLoading(false)
    }
  }, [])

  return {
    breadcrumbData,
    incomingItem,
    incomingItemLoading,
    actions: {
      getIncomingDetails,
    },
  }
}

export const use = useView
