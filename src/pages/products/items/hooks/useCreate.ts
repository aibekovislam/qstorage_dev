'use client'

import React from 'react'

import { ProductItems } from '..'
import { ProductsTypes } from '../types'

export function useCreate() {
  const [submitted, setSubmitted] = React.useState(false)
  const [categories, setCategories] = React.useState<ProductsTypes.ItemCategories[] | null>(null)

  const createProduct = React.useCallback(async (data: ProductsTypes.Item) => {
    setSubmitted(true)
    try {
      const dataToSend = { ...data }
      const response = await ProductItems.API.Create.createProduct(dataToSend)

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
      const response = await ProductItems.API.Create.getProductItemsCategories()

      setCategories(response.data.results)
    } catch (error) {
      console.log('error categories product items', error)
    }
  }, [])

  return {
    submitted,
    categories,
    actions: {
      createProduct,
      ProductItemsCategoreisGET,
    },
  }
}

export const use = useCreate
