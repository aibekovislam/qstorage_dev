'use client'

import React from 'react'

import { Form, Upload, UploadFile, UploadProps } from 'antd'
import { UploadChangeParam } from 'antd/lib/upload'
import { useRouter } from 'next/navigation'

import { useDisclosure } from '@/shared/hooks/useDisclosure'
import { debounce } from '@/shared/tools/debounce'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useList() {
  const createModal = useDisclosure()
  const router = useRouter()
  const [form] = Form.useForm()
  const [submitted, setSubmitted] = React.useState(false)
  const [isCreated, setIsCreated] = React.useState(false)
  const [isLoadingProducts, setLoadingProducts] = React.useState(false)
  const [products, setProducts] = React.useState<ProductsIncomingTypes.Product[] | null>(null)
  const [project, setProject] = React.useState<ProductsIncomingTypes.Project[] | null>(null)
  const [selectedProduct, setSelectedProduct] = React.useState<ProductsIncomingTypes.Product | null>(null)
  const [userResponsible, setUserResponsible] = React.useState<ProductsIncomingTypes.Responsible[] | null>(null)
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [isNewProductMode, setIsNewProductMode] = React.useState<boolean>(false)
  const [isResponsibleDisabled, setIsResponsibleDisabled] = React.useState<boolean>(false)
  const [isProductSelected, setIsProductSelected] = React.useState<boolean>(false)
  const [totalCost, setTotalCost] = React.useState<number | undefined>(undefined)
  const [productsIncomingList, setProductsIncomingList] = React.useState<ProductsIncomingTypes.Table[] | undefined>(undefined)

  const fetchProducts = React.useCallback(
    debounce(async (searchTerm: string) => {
      setSearchQuery(searchTerm)
      if (!searchTerm.trim()) {
        setProducts(null)
        setIsNewProductMode(false)
        setLoadingProducts(false)

        return
      }
      setLoadingProducts(true)
      try {
        const response = await ProductsIncoming.API.List.getProductSearchedList(searchTerm)
        const data = await response.data

        setProducts(data.results)
      } catch (error) {
        console.error(error)
      } finally {
        setLoadingProducts(false)
      }
    }, 500),
    [],
  )

  const createIncoming = async (formValue: ProductsIncomingTypes.Form) => {
    setSubmitted(true)
    try {
      let newSelectedProduct = selectedProduct

      if (isNewProductMode) {
        const responseProduct = await ProductsIncoming.API.List.createProduct({ title: form.getFieldValue('product'), price: form.getFieldValue('purchase_price') })

        newSelectedProduct = responseProduct.data
      }

      const responsibleObj = userResponsible?.find((item) => item.first_name === formValue.responsible)
      const dataToSend = {
        ...formValue,
        product: newSelectedProduct?.slug,
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

      setIsCreated(true)
    } catch (error) {
      console.error('Ошибка создания прихода:', error)
    } finally {
      setSubmitted(false)
    }
  }

  const ProductsIncomingGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.List.getProductsIncomingList()

      setProductsIncomingList(response.data.results)
    } catch (error) {
      console.log('products incoming error', error)
    }
  }, [])

  const ProductsIncomingProjectGET = React.useCallback(async () => {
    try {
      const response = await ProductsIncoming.API.List.getProductIncomingProject()

      setProject(response.data.results)
    } catch (error) {
      console.log('products incoming project error', error)
    }
  }, [])

  const ProductsIncomingUsersByProject = React.useCallback(async (id: number) => {
    try {
      const response = await ProductsIncoming.API.List.getUsersByProject(id)

      setUserResponsible(response.data.results)
    } catch (error) {
      console.log('products incoming project error', error)
    }
  }, [])

  const handleProjectChange = React.useCallback( async (value: number) => {
    if (value) {
      form.setFieldsValue({ responsible: undefined })
      ProductsIncomingUsersByProject(value)
      setIsResponsibleDisabled(true)
    }
  }, [ProductsIncomingUsersByProject])

  const handleSelectProduct = React.useCallback(
    (_: string, option: any) => {
      const selectedProduct = option.productObj

      form.setFieldsValue({ purchase_price: selectedProduct.price })
      setIsProductSelected(true)
      setSelectedProduct(selectedProduct)
      ProductsIncomingProjectGET()
    },
    [form],
  )

  const handleDraggerChange = React.useCallback(
    (info:  UploadChangeParam<UploadFile<any>>) => {
      const validFiles = info.fileList.filter(file => file && file.status !== 'removed')

      const fileList = validFiles.map(item => item.originFileObj)

      form.setFieldsValue({ files: fileList })
    },
    [form],
  )

  const handleChangeProduct = React.useCallback(
    (newValue: string) => {
      if (!newValue) {
        form.setFieldsValue({
          purchase_price: undefined,
          quantity: undefined,
          act: undefined,
          project: undefined,
          responsible: undefined,
          supplier: undefined,
          message: undefined,

        })
        setIsProductSelected(false)
        setTotalCost(undefined)
      }
    },
    [form],
  )

  const handleFormValuesChange = React.useCallback(
    (changedValues: Partial<ProductsIncomingTypes.Form>, allValues: ProductsIncomingTypes.Form) => {
      if (changedValues.act !== undefined || changedValues.quantity !== undefined) {
        const docNumber = changedValues.act

        if (typeof docNumber === 'string' && docNumber.length > 8) {
          form.setFieldsValue({ act: docNumber.slice(0, 8) })
        }
      }
      if (changedValues.quantity !== undefined || changedValues.purchase_price !== undefined) {
        const quantity = Number(allValues.quantity)
        const purchasePrice = Number(allValues.purchase_price)

        if (!isNaN(quantity) && !isNaN(purchasePrice) && quantity !== 0) {
          setTotalCost(quantity * purchasePrice)
        } else {
          setTotalCost(undefined)
        }
      }
    },
    [form],
  )

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
    { href: '#', title: 'Склад №1' },
    { href: '/products/incoming', title: 'Приход товаров' },
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
    productsIncomingList,
    defaultDraggerProps,
    submitted,
    isCreated,
    products,
    project,
    userResponsible,
    selectedProduct,
    searchQuery,
    totalCost,
    form,
    isLoadingProducts,
    isNewProductMode,
    isResponsibleDisabled,
    isProductSelected,
    actions: {
      fetchProducts,
      createModal,
      router,
      setSelectedProduct,
      setIsProductSelected,
      setIsNewProductMode,
      setProducts,
      setSearchQuery,
      createIncoming,
      ProductsIncomingProjectGET,
      ProductsIncomingGET,
      ProductsIncomingUsersByProject,
      handleSelectProduct,
      handleChangeProduct,
      handleDraggerChange,
      handleFormValuesChange,
      handleProjectChange,
      checkStatus,
      getTagColor,
    },
  }
}

export const use = useList
