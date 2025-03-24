'use client'

import React from 'react'

import { Form, notification } from 'antd'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'
import { getSession } from '@/shared/lib/session'

import { ProductItems } from '..'
import { ProductsItemsTypes } from '../types'

function useList() {
  const [form] = Form.useForm()
  const createModal = useDisclosure()
  const router = useRouter()
  const [categories, setCategories] = React.useState<ProductsItemsTypes.ItemCategories[] | null>(null)
  const [productsList, setProductsList] = React.useState<ProductsItemsTypes.Item[] | undefined>(undefined)
  const [productsColorsList, setProductsColorsList] = React.useState<ProductsItemsTypes.Color[] | undefined>(undefined)
  const [submitted, setSubmitted] = React.useState(false)
  const [isCreated, setIsCreated] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()

  const createProduct = React.useCallback(async (data: ProductsItemsTypes.Form) => {
    setSubmitted(true)
    try {
      const session = await getSession()

      const user = session.user

      const dataToSend = {
        ...data ,
        warehouse: user.current_warehouse,
        color: [data.color],
        characteristics: JSON.stringify(data.characteristics),
        expiration_date: dayjs(data.expiration_date).format('YYYY-MM-DD'),
      }

      const response = await ProductItems.API.List.createProduct(dataToSend)

      if (response.status === 201 || response.status === 200) {
        api.success({
          message: 'Продукт успешно создан',
          placement: 'top',
        })
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }

      setIsCreated(true)

      return response
    } catch (error) {
      console.error('error create product', error)
      throw error
    } finally {
      setSubmitted(false)
    }
  }, [])

  const ProductItemsCategoreisGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.List.getProductItemsCategories()

      setCategories(response.data.results)
    } catch (error) {
      console.log('error categories product items', error)
    }
  }, [])

  const ProductsGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.List.getProductsList()

      setProductsList(response.data.results)
    } catch (error) {
      console.log('products error', error)
    }
  }, [])

  const ProductsColorsGET = React.useCallback(async () => {
    try {
      const response = await ProductItems.API.List.getProductsColors()

      setProductsColorsList(response.data)
    } catch (error) {
      console.log('products error', error)
    }
  }, [])

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/products', title: 'Товары' },
  ]

  return {
    breadcrumbData,
    productsColorsList,
    productsList,
    submitted,
    contextHolder,
    form,
    isCreated,
    createModal,
    actions: {
      createProduct,
      ProductsGET,
      ProductItemsCategoreisGET,
      ProductsColorsGET,
      categories,
      router,
    },
  }
}

export const use = useList
