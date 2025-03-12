'use client'

import React, { ChangeEvent } from 'react'

import { Upload, UploadProps } from 'antd'

import { debounce } from '@/shared/tools/debounce'

import { ProductsIncoming } from '..'
import { ProductsTypes } from '../../items/types'
import { ProductsIncomingTypes } from '../types'

function useCreate() {
  const [products, setProducts] = React.useState<ProductsTypes.Item[]>([])
  const [isProductsLoading, setIsProductsLoading] = React.useState(true)
  const [selectedProducts, setSelectedProducts] = React.useState<ProductsTypes.Item[]>([])
  const [project, setProject] = React.useState<ProductsIncomingTypes.Project[] | null>(null)
  const [userResponsible, setUserResponsible] = React.useState<ProductsIncomingTypes.Responsible[] | null>(null)
  const [submitted, setSubmitted] = React.useState(false)

  const getProducts = React.useCallback(async (search?: string) => {
    setIsProductsLoading(true)

    try {
      const response = await ProductsIncoming.API.Create.getProductSearchedList(search)

      if (response.status === 200) {
        setProducts(response.data.results)
      }
    } catch (error) {
      console.log('error get products', error)
    } finally {
      setIsProductsLoading(false)
    }
  }, [])

  const onProductsSelectChange = (selectedRowKeys: React.Key[], selectedRows: ProductsTypes.Item[]) => {
    setSelectedProducts(selectedRows)
  }
  const debouncedSearch = debounce((search: string) => {
    getProducts(search)
  }, 1500)

  const handleSearchProducts = (e: ChangeEvent<HTMLInputElement>) => {
    setIsProductsLoading(true)
    debouncedSearch(e.target.value)
  }

  const ProductsIncomingProjectGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.List.getProductIncomingProject()

      setProject(response.data.results)
    } catch (error) {
      console.log('products incoming project error', error)
    }
  }, [])

  const ProductsIncomingUsers = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.Create.getUsers()

      setUserResponsible(response.data.results)
    } catch (error) {
      console.log('products incoming project error', error)
    }
  }, [])

  const createIncoming = async (formValue: ProductsIncomingTypes.Form) => {
    setSubmitted(true)
    try {
      const responsibleObj = userResponsible?.find((item) => item.first_name === formValue.responsible)
      const dataToSend = {
        ...formValue,
        // product: newSelectedProduct?.slug,
        responsible: responsibleObj?.uuid,
      }

      const formData = new FormData()

      Object.entries(dataToSend).forEach(([key, value]) => {
        if (key !== 'files') {
          if (value !== undefined && value !== null) {
            formData.append(key, String(value))
          }
        }
      })

      if (Array.isArray(formValue.files)) {
        formValue.files.forEach((fileItem: File, index) => {
          formData.append(`file${index + 1}`, fileItem)
        })
      }

      const response = await ProductsIncoming.API.List.createProductIncoming(formData)

      if (response.status !== 201 && response.status !== 200) {
        throw new Error(`Submission failed: ${response.statusText}`)
      }

    } catch (error) {
      console.error('Ошибка создания прихода:', error)
    } finally {
      setSubmitted(false)
    }
  }

  const defaultDraggerProps: UploadProps = {
    name: 'files',
    maxCount: 10,
    multiple: true,
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > 10) {
        console.log(`Файл "${file.name}" больше 10 МБ!`)

        return Upload.LIST_IGNORE
      }

      return false
    },
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/incoming', title: 'Приход товаров' },
    { title: 'Создать' },
  ]

  return {
    breadcrumbData,
    products,
    isProductsLoading,
    selectedProducts,
    defaultDraggerProps,
    project,
    userResponsible,
    submitted,
    actions: {
      getProducts,
      onProductsSelectChange,
      handleSearchProducts,
      ProductsIncomingProjectGET,
      ProductsIncomingUsers,
    },
  }
}

export const use = useCreate
