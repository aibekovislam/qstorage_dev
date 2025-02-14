'use client'

import React from 'react'

import { App } from 'antd'
import { useRouter } from 'next/navigation'

import { StorageRequests } from '..'
import { ProductRecord, StorageRequestsResponse } from '../types'

const STATUS_MAP: Record<string, string> = {
  in_progress: 'В ПРОЦЕССЕ',
  verified: 'ПРОВЕРЕНО',
  new: 'НОВОЕ',
  rejected: 'ОТКЛОНЕНО',
  not_verified: 'НЕ ПРОВЕРЕНО',
} as const

const COLOR_MAP: Record<string, string> = {
  in_progress: 'gold',
  verified: 'green',
  new: 'geekblue',
  rejected: 'red',
  not_verified: 'gray',
} as const

function useList() {
  const { message } = App.useApp()
  const router = useRouter()

  const [dataSource, setDataSource] = React.useState<ProductRecord[]>([])
  const [selectedRowKeys, setSelectedRowKeys] = React.useState<React.Key[]>([])
  const [loading, setLoading] = React.useState(false)
  const [hasIncoming, setHasIncoming] = React.useState(false)
  const [hasOutgoing, setHasOutgoing] = React.useState(false)
  const [hasData, setHasData] = React.useState(false)
  const [hasFetchAttempted, setHasFetchAttempted] = React.useState(false)

  const checkStatus = (status: string) => STATUS_MAP[status] || 'НЕИЗВЕСТНЫЙ СТАТУС'
  const getTagColor = (status: string) => COLOR_MAP[status] || 'default'

  const fetchData = React.useCallback(async () => {
    setLoading(true)
    try {
      const response: StorageRequestsResponse = await StorageRequests.API.List.getStorageRequests()

      if (!response.incomings.length && !response.outgoings.length) {
        setHasData(false)
        setHasFetchAttempted(true)

        return
      }
      setHasIncoming(response.incomings.length > 0)
      setHasOutgoing(response.outgoings.length > 0)

      const allRequests = [
        ...(response.incomings?.map(item => ({
          ...item,
          type: 'incoming',
          status: item.status || 'not_verified',
        })) || []),
        ...(response.outgoings?.map(item => ({
          ...item,
          type: 'outgoing',
          status: item.status || 'not_verified',
        })) || []),
      ] as ProductRecord[]

      setDataSource(allRequests)
      setHasData(true)
      setHasFetchAttempted(true)
    } catch (error) {
      console.error('Error fetching storage requests: ', error)
      message.error('Ошибка при загрузке данных')
      setHasData(false)
      setHasFetchAttempted(true)
    } finally {
      setLoading(false)
    }
  }, [message])

  const handleApprove = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Выберите заявки для подтверждения')

      return
    }

    try {
      const selectedIds = selectedRowKeys.map(Number)
      const selectedItems = dataSource.filter(item => selectedIds.includes(item.id))

      const payload = {
        incoming_ids: selectedItems.filter(item => item.type === 'incoming').map(item => item.id),
        outgoing_ids: selectedItems.filter(item => item.type === 'outgoing').map(item => item.id),
      }

      await StorageRequests.API.List.approveRequests(payload)

      setDataSource(prevData => prevData.filter(item => !selectedIds.includes(item.id)))
      message.success('Заявки успешно приняты')
      setSelectedRowKeys([])
    } catch (error) {
      console.error('Error approving requests:', error)
      message.error('Ошибка при принятии заявок')
    }
  }

  const handleReject = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('Выберите заявки для отклонения')

      return
    }

    try {
      const selectedIds = selectedRowKeys.map(Number)
      const selectedItems = dataSource.filter(item => selectedIds.includes(item.id))

      const payload = {
        incoming_ids: selectedItems.filter(item => item.type === 'incoming').map(item => item.id),
        outgoing_ids: selectedItems.filter(item => item.type === 'outgoing').map(item => item.id),
      }

      await StorageRequests.API.List.rejectRequests(payload)

      setDataSource(prevData => prevData.filter(item => !selectedIds.includes(item.id)))
      message.success('Заявки успешно отклонены')
      setSelectedRowKeys([])
    } catch (error) {
      console.error('Error rejecting requests:', error)
      message.error('Ошибка при отклонении заявок')
    }
  }

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/storage', title: `Склад ${'№1'}` },
    { href: '/storage-requests', title: 'Заявки на склад' },
  ]

  return {
    selectedRowKeys,
    loading,
    dataSource,
    hasIncoming,
    hasOutgoing,
    setHasIncoming,
    setHasOutgoing,
    hasData,
    hasFetchAttempted,
    checkStatus,
    getTagColor,
    breadcrumbData,
    actions: {
      setSelectedRowKeys,
      fetchData,
      handleApprove,
      handleReject,
      router,
      setHasIncoming,
      setHasOutgoing,
    },

  }

}

export const use = useList
