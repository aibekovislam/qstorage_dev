'use client'

import React from 'react'

import { Form, notification } from 'antd'
import dayjs from 'dayjs'

import { getSession } from '@/shared/lib/session'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useCreateProduct() {
  const [form] = Form.useForm()
  const [productsColorsList, setProductsColorsList] = React.useState<ProductsIncomingTypes.Color[] | undefined>(undefined)
  const [submitted, setSubmitted] = React.useState(false)
  const [isCreated, setIsCreated] = React.useState(false)
  const [api, contextHolder] = notification.useNotification()

  const createProduct = React.useCallback(async (data: ProductsIncomingTypes.FormProduct) => {
    setSubmitted(true)
    try {
      const session = await getSession()

      const user = session.user

      const dataToSend: any = {
        ...data ,
        warehouse: user.current_warehouse,
        // color: [data.color],
        characteristics: JSON.stringify(data.characteristics),
        expiration_date: dayjs(data.expiration_date).format('YYYY-MM-DD'),
      }

      const response = await ProductsIncoming.API.Create.createProduct(dataToSend)

      if (response.status === 201) {
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

  const ProductsColorsGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.Create.getProductsColors()

      setProductsColorsList(response.data)
    } catch (error) {
      console.log('products error', error)
    }
  }, [])

  return {
    productsColorsList,
    submitted,
    contextHolder,
    form,
    isCreated,
    actions: {
      createProduct,
      ProductsColorsGET,
    },
  }
}

export const use = useCreateProduct
