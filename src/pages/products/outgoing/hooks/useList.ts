'use client'

import React from 'react'

import { useRouter } from 'next/navigation'

import { ProductsOutgoing } from '..'
import { ProductsOutgoingTypes } from '../types'

function useList() {
  const router = useRouter()
  const [currentPage, setCurrentPage] = React.useState(1)
  const [products, setProducts] = React.useState<ProductsOutgoingTypes.Product[] | null>(null)
  const [selectedProduct, setSelectedProduct] = React.useState<ProductsOutgoingTypes.Product | null>(null)
  const [productsOutgoingList, setProductsOutgoingList] = React.useState<ProductsOutgoingTypes.ApiResponse | undefined>(undefined)

  const ProductsOutgoingGET = React.useCallback(async (url?: string) => {
    try {
      const response = await ProductsOutgoing.API.List.getProductsOutgoingList(url || '/outgoings/')

      setProductsOutgoingList(response.data)
    } catch (error) {
      console.log('products outgoings error', error)
    }
  }, [])

  const handlePageChange = () => {
    const nextPageUrl = productsOutgoingList?.next

    if (nextPageUrl) {
      ProductsOutgoingGET(nextPageUrl)
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { title: 'Уход товаров' },
  ]

  const checkStatus = React.useCallback((status: string): string => {
    const statusMap: Record<string, string> = {
      in_progress: 'В ПРОЦЕССЕ',
      verified: 'ПРОВЕРЕНО',
      new: 'НОВОЕ',
      rejected: 'ОТКЛОНЕНО',
      not_verified: 'НЕ ПРОВЕРЕНО',
    }

    return statusMap[status] || 'НЕИЗВЕСТНЫЙ СТАТУС'
  }, [])

  const getTagColor = React.useCallback((status: string): string => {
    const colorMap: Record<string, string> = {
      in_progress: 'gold',
      verified: 'green',
      new: 'geekblue',
      rejected: 'red',
      not_verified: 'gray',
    }

    return colorMap[status] || 'default'
  }, [])

  return {
    breadcrumbData,
    productsOutgoingList,
    currentPage,
    products,
    selectedProduct,
    actions: {
      router,
      setSelectedProduct,
      setProducts,
      setCurrentPage,
      ProductsOutgoingGET,
      checkStatus,
      getTagColor,
      handlePageChange,
    },
  }
}

export const use = useList
