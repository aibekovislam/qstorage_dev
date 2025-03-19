'use client'

import React from 'react'

import { Form, notification } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { getSession } from '@/shared/lib/session'

import { ProductItems } from '..'
import { ProductsItemsTypes } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const router = useRouter()
  const [submitted, setSubmitted] = React.useState(false)
  const [items, setItems] = React.useState<ProductsItemsTypes.ItemDetail | undefined>(undefined)
  const [productsColorsList, setProductsColorsList] = React.useState<ProductsItemsTypes.Color[] | undefined>(undefined)
  const [isItemsLoading, setIsItemsLoading] = React.useState(true)
  const [api, contextHolder] = notification.useNotification()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/items', title: 'Все товары' },
    { href: '/', title: items?.title },
    { href: '#', title: 'Изменить' },
  ]

  const ProductItemsIDGET = React.useCallback(async (slug: string) => {
    try {
      const response = await ProductItems.API.Edit.getProductBySlug(slug)

      setItems(response.data)
    } catch (error) {
      console.log('products by id projects', error)
    } finally {
      setIsItemsLoading(false)
    }
  }, [])

  const ProductsColorsGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.Edit.getProductsColors()

      setProductsColorsList(response.data)
    } catch (error) {
      console.log('products error', error)
    }
  }, [])

  const EditProductItems = React.useCallback(async (slug: string, data: ProductsItemsTypes.FormEdit) => {
    setSubmitted(true)

    try {
      const session = await getSession()

      const user = session.user

      const dataToSend = {
        ...data,
        warehouse: user.current_warehouse,
        color: Array.isArray(data.color) ? data.color : data.color ? [data.color] : [],
        characteristics: JSON.stringify(data.characteristics),
        expiration_date: dayjs(data.expiration_date).format('YYYY-MM-DD'),
      }

      const response = await ProductItems.API.Edit.editProject(slug, dataToSend)

      if (response.status === 200) {
        api.success({
          message: 'Товар успешно был изменён',
          placement: 'top',
        })
        router.push(`/products/items/${slug}`)
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
    } catch (error) {
      console.log('error edit employee', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  const transformedItems = React.useMemo(() => {
    if (!items) return undefined

    return {
      ...items,
      characteristics:
        typeof items.characteristics === 'string'
          ? JSON.parse(items.characteristics)
          : items.characteristics,
    }
  }, [items])

  return {
    breadcrumbData,
    items: transformedItems,
    isItemsLoading,
    form,
    contextHolder,
    submitted,
    productsColorsList,
    actions: {
      router,
      ProductItemsIDGET,
      ProductsColorsGET,
      EditProductItems,
    },
  }
}

export const use = useEdit
