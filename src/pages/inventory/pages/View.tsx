'use client'

import React from 'react'

import { Avatar, Popover, Space, Typography, Table, Flex } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { Inventory } from '..'
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
    title: 'Остаток',
    dataIndex: 'stock',
    key: 'stock',
  },
  {
    title: 'Закуп. цена (сом)',
    dataIndex: 'purechase_price',
    key: 'purechase_price',
  },
  {
    title: 'Сумма (закуп..сом)',
    dataIndex: 'sum',
    key: 'sum',
  },
  {
    title: 'Дата',
    dataIndex: 'date',
    key: 'date',
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
    stock: 6462020,
    purechase_price: 986,
    date: '2021-02-05',
    sum: 757865,
    responsible: 'Чынгыз А.',
    comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cumque quibusdam officia, autem, laborum magnam consequatur, adipisci saepe incidunt sed sit magni repudiandae. Nesciunt fuga voluptate, quia quod voluptates cupiditate.',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
]

export const View = () => {
  const { breadcrumbData } = Inventory.Hooks.List.use()

  return (
    <div className="main">

      <Flex className={cls.nav}>
        <Breadcrumb items={breadcrumbData}/>
        <Flex className={cls.filter_panel}>
          <FilterPanel defaultValue={'all_products'}  options={[{ value: 'all_products', label: 'Все товары' }, { value: 'pants', label: 'Штаны' }]}/>
        </Flex>
      </Flex>

      <Flex className={cls.inventory_info}>
        <h2>Заявки “Склад №1”</h2>
        <div className={cls.inventory_info_main}>
          <div className={cls.inventory_info_container}>
            <Flex className={cls.inventory_info_item}>
              <div>
                <h3 className={cls.sub_title}>Общий остаток</h3>
                <span className={cls.stock_number}>140,000</span>
              </div>
              <div>
                <h3 className={cls.sub_title}>Старый остаток</h3>
                <span className={cls.stock_number}>1,413</span>
              </div>
            </Flex>
          </div>
        </div>
      </Flex>

      <Table<ProductRecord>
        columns={columns}
        dataSource={dataSource}
        pagination={{ position: ['bottomRight'] }}
      />
    </div>
  )
}
