'use client'

import React from 'react'

import { Avatar, Popover, Space, Tag, Typography, Table, Flex } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { History } from '..'
import cls from '../styles/view.module.css'
import { ProductRecord } from '../types'

const { Paragraph } = Typography

const columns: ColumnsType<ProductRecord> = [
  {
    title: 'Товар',
    dataIndex: 'product',
    key: 'product',
    render: (text, record) => (
      <Space>
        {record.imageUrl && (
          <Image
            src={record.imageUrl}
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
    dataIndex: 'project',
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
      <Tag color="green">{status}</Tag>
    ),
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: '№ Акта',
    dataIndex: 'actNumber',
    key: 'actNumber',
  },
  {
    title: 'Поставщик',
    dataIndex: 'supplier',
    key: 'supplier',
  },
  {
    title: 'Ответственный',
    dataIndex: 'responsible',
    key: 'responsible',
    render: (personName: string) => (
      <Space>
        <Avatar>{personName.charAt(0)}</Avatar>
        <span>{personName}</span>
      </Space>
    ),
  },
  {
    title: 'Комментарий',
    dataIndex: 'comment',
    key: 'comment',
    render: (comment: string) => {
      return (
        <Popover overlayClassName={cls.card} className={cls.custom__popover} content={comment}>
          <Paragraph>{comment.slice(0, 10)}...</Paragraph>
        </Popover>
      )
    },
  },
]

const dataSource: ProductRecord[] = [
  {
    key: 1,
    product: 'Штаны',
    project: 'TradeCode 99',
    quantity: '3,638,066',
    status: 'ПРОВЕРЕНО',
    date: '2021-02-05',
    actNumber: '574836839',
    supplier: 'Vel crad sed rhoncus.',
    responsible: 'Чынгыз А.',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cumque quibusdam officia, autem, laborum magnam consequatur, adipisci saepe incidunt sed sit magni repudiandae. Nesciunt fuga voluptate, quia quod voluptates cupiditate.',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
]

export const View = () => {
  const { breadcrumbData } = History.Hooks.List.use()

  return (
    <div className="main">

      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
      </div>

      <div className={cls.main_title}>
        <h2>Заявки</h2>
      </div>

      <Flex className={cls.filter_panel}>
        <FilterPanel defaultValue={'history_leave'} options={[{ value: 'history_leave', label: 'История ухода' }, { value: 'access_requests', label: 'Принятые заявки' }]}/>
      </Flex>

      <Table<ProductRecord>
        columns={columns}
        dataSource={dataSource}
        pagination={{ position: ['bottomRight'] }}
      />
    </div>
  )
}
