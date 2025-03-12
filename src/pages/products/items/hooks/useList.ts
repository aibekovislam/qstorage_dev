'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { ProductItems } from '..'
import { ProductsTypes } from '../types'

function useList() {
  const router = useRouter()
  const [productsList, setProductsList] = React.useState<ProductsTypes.Item[] | undefined>(undefined)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/products', title: 'Товары' },
  ]

  const ProductsGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.List.getProductsList()

      setProductsList(response.data.results)
    } catch (error) {
      console.log('products error', error)
    }
  }, [])

  return {
    breadcrumbData,
    productsList,
    actions: {
      ProductsGET,
      router,
    },
  }
}

export const use = useList
