'use client'

import React from 'react'

import { notification } from 'antd'
import { useSearchParams } from 'next/navigation'

import { ProductItems } from '..'
import { ProductsTypes } from '../types'

function useView() {
  const searchParams = useSearchParams()
  const projectTitle = String(searchParams?.get('title') || 'Название проекта')
  const [api, contextHolder] = notification.useNotification()
  const [itemDetail, setItemDetail] = React.useState<ProductsTypes.ItemDetail| null>(null)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/products', title: 'Товары' },
  ]

  const ProductItemsBySlugGET = React.useCallback(async (item_slug: string) => {
    try {
      const response = await ProductItems.API.View.getProductBySlug(item_slug)

      setItemDetail(response.data)
    } catch (error) {
      api.error({
        message: 'Не удалось получить данные. Пожалуйста, попробуйте позже.',
        placement: 'top',
      })
      console.log(error)
    }
  }, [])

  return {
    itemDetail,
    breadcrumbData,
    contextHolder,
    projectTitle,
    actions: {
      ProductItemsBySlugGET,
    },
  }
}

export const use = useView
