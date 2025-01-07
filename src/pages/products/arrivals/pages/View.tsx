'use client'

import React from 'react'

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Table, Tag, Avatar, Space, Flex, Button, Popover, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'

import cls from '@/pages/products/styles/view.module.css'
import { ManagerLayout } from '@/shared/layouts/manager'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { CustomDatePicker } from '@/shared/ui/date-picker-field/date-picker-field'
import { SelectField } from '@/shared/ui/select-field/select-field'

import { ProductsArrivals } from '..'
import { ProductRecord } from '../types'

const {Paragraph} = Typography

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

export const View: React.FC = () => {
  const {
    breadcrumbData,
    yearValue,
    monthValue,
    dayValue,
    handleChangeYearDatePicker,
    handleChangeMonthDatePicker,
    handleChangeDayDatePicker,
  } = ProductsArrivals.Hooks.List.use()

  return (
    <ManagerLayout>
      <main className={cls.main}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
          <h2>Приход товаров “Склад №1”</h2>
        </div>
        <div className={cls.header}>
          <Flex gap={8} className={cls.header__btn}>
            <Button type="default">
              Приход <ArrowUpOutlined />
            </Button>
            <Button type="primary">
              Уход <ArrowDownOutlined />
            </Button>
          </Flex>
          <Flex gap={10}>
            <SelectField
              style={{ width: 210 }}
              options={[{ value: 'all-products', label: 'Все товары' },{ value: 'not-all-products' , label: 'Не все товары' }]}
            />
            <CustomDatePicker
              pickerMode="year"
              placeholder="Выберите год"
              value={yearValue}
              onChange={handleChangeYearDatePicker}
            />

            <CustomDatePicker
              pickerMode="month"
              placeholder="Выберите месяц"
              value={monthValue}
              onChange={handleChangeMonthDatePicker}
            />

            <CustomDatePicker
              placeholder="Выберите день"
              value={dayValue}
              onChange={handleChangeDayDatePicker}
            />
            <Button type="primary" className={cls.btn}>Добавить уход</Button>
          </Flex>
        </div>
        <Table<ProductRecord>
          columns={columns}
          dataSource={dataSource}
          pagination={{ position: ['bottomRight'] }}
        />
      </main>
    </ManagerLayout>
  )
}
