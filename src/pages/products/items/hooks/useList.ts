'use client'

import React from 'react'

import { ProductItems } from '..'
import { ProductsTypes } from '../types'

function useList() {
  const [productsList, setProductsList] = React.useState<ProductsTypes.Item[] | undefined>(undefined)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/products', title: 'Товары' },
  ]

  const ProductsGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.List.getProductsList()

      const data = await response.json()

      setProductsList(data.data)
    } catch (error) {
      console.log('products error', error)
    }
  }, [])

  return {
    breadcrumbData,
    productsList,
    actions: {
      ProductsGET,
    },
  }
}

export const use = useList
