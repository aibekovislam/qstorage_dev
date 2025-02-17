'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { Stock } from '..'
import { StockType } from '../types'

function useView() {
  const router = useRouter()
  const [stock, setStock] = React.useState<StockType.Table[] | undefined>(undefined)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/inventory', title: 'Остатки товара' },
  ]

  const StockGET = React.useCallback(async () => {
    try {
      const response = await Stock.API.View.getStock()

      console.log('response', response)

      setStock(response.data)
    } catch (error) {
      console.log('get stock error', error)
    }
  }, [])

  return {
    breadcrumbData,
    stock,
    actions: {
      router,
      StockGET,
    },
  }
}

export const use = useView
