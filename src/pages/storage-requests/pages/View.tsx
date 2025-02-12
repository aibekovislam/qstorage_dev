'use client'

import React, { useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Avatar, Popover, Space, Tag, Typography, Table, Flex, Button, App } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'
import dayjs from 'dayjs'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { StorageRequests } from '..'
import cls from '../styles/view.module.css'
import { ProductRecord } from '../types'

const { Paragraph } = Typography

// Создаем компонент с отключенным SSR
const NoSSRWrapper = dynamic(
  () => Promise.resolve(({ children }: { children: React.ReactNode }) => <>{children}</>),
  { 
    ssr: false,
    loading: () => <div>Loading...</div>
  }
)

const ViewContent: React.FC = () => {
  const { 
    dataSource, 
    selectedRowKeys, 
    loading, 
    hasIncoming,
    hasOutgoing,
    checkStatus,
    getTagColor,
    breadcrumbData,
    actions 
  } = StorageRequests.Hooks.List.use()

  const columns: ColumnsType<ProductRecord> = useMemo(() => [
    {
      title: 'Товар',
      dataIndex: ['product', 'title'],
      key: 'product',
      render: (text, record) => (
        <Space>
          {record.product.image && (
            <Image
              src={record.product.image}
              alt={text}
              style={{ objectFit: 'cover' }}
              width={40}
              height={40}
            />
          )}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: 'Проект',
      dataIndex: ['project', 'title'],
      key: 'project',
    },
    {
      title: 'Кол-во',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getTagColor(status)}>
          {checkStatus(status)}
        </Tag>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => dayjs(date).format('DD.MM.YYYY'),
    },
    {
      title: '№ Акта',
      dataIndex: 'act',
      key: 'act',
    },
    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Ответственный',
      dataIndex: ['responsible', 'first_name'],
      key: 'responsible',
      render: (firstName: string, record) => (
        <Space>
          <Avatar src={record.responsible.avatar}>{firstName.charAt(0)}</Avatar>
          <span>{`${firstName} ${record.responsible.last_name}`}</span>
        </Space>
      ),
    },
    {
      title: 'Комментарий',
      dataIndex: 'message',
      key: 'message',
      render: (message: string) => {
        if (!message) return '-';
        return (
          <Popover overlayClassName={cls.card} className={cls.custom__popover} content={message}>
            <Paragraph>{message.slice(0, 10)}...</Paragraph>
          </Popover>
        )
      },
    },
  ], [])

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      console.log('Selected row keys:', newSelectedRowKeys);
      actions.setSelectedRowKeys(newSelectedRowKeys)
    },
  }

  return (
    <div className="main">
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData} />
      </div>

      <Flex className={cls.header}>
        <h2 className={cls.main_title}>Заявки "Склад №1"</h2>
        <Flex className={cls.btn_container}>
          <Button
            className={cls.btn_success}
            onClick={actions.handleApprove}
            disabled={selectedRowKeys.length === 0 || loading || !hasIncoming}
          >
            Принять
          </Button>
          <Button
            className={cls.btn_red}
            onClick={actions.handleReject}
            disabled={selectedRowKeys.length === 0 || loading || !hasOutgoing}
          >
            Отклонить
          </Button>
        </Flex>
      </Flex>

      <Table<ProductRecord>
        columns={columns}
        dataSource={dataSource}
        pagination={{
          position: ['bottomRight'],
          total: dataSource.length,
          pageSize: 13,
          hideOnSinglePage: true,
          showSizeChanger: false
        }}
        rowSelection={rowSelection}
        rowKey="id"
        loading={loading}
      />
    </div>
  )
}

// Оборачиваем основной компонент в NoSSR и App
const ViewWithProviders: React.FC = () => {
  return (
    <NoSSRWrapper>
      <App>
        <ViewContent />
      </App>
    </NoSSRWrapper>
  )
}

export default ViewWithProviders