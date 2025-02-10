'use client'

import React from 'react'

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Table, Tag, Avatar, Space, Flex, Button, Popover } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { ProductsOutgoing } from '..'
import cls from '../styles/view.module.css'
import { ProductsOutgoingTypes } from '../types'
import ModalCreateOutgoing from '../ui/modals/ModalCreate/modal-create-outgoing'

// const { Paragraph } = Typography

const createColumns = (checkStatus: any, getTagColor: any): ColumnsType<ProductsOutgoingTypes.Table> => {
  const columns: ColumnsType<ProductsOutgoingTypes.Table> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (product: ProductsOutgoingTypes.TableProduct) => (
        <Space >
          <Image
            src={product.image || NoPhoto.src}
            alt={product.title}
            style={{ objectFit: 'cover' }}
            width={50}
            height={40}
            className={cls.table_image}
          />
          <span>{product.title}</span>
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
        <Tag color={getTagColor(status)}>{checkStatus(status)}</Tag>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
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
      dataIndex: 'message',
      key: 'message',
      render: (comment: string) => {
        return (
          <Popover overlayClassName={cls.card} className={cls.custom__popover} content={comment}>
            {/* <Paragraph>{comment.slice(0, 10)}...</Paragraph> */}
          </Popover>
        )
      },
    },
  ]

  return columns
}

// const dataSource: ProductRecord[] = [
//   {
//     key: 1,
//     product: 'Штаны',
//     project: 'TradeCode 99',
//     quantity: '3,638,066',
//     status: 'ПРОВЕРЕНО',
//     date: '2021-02-05',
//     actNumber: '574836839',
//     supplier: 'Vel crad sed rhoncus.',
//     responsible: 'Чынгыз А.',
//     comment: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi cumque quibusdam officia, autem, laborum magnam consequatur, adipisci saepe incidunt sed sit magni repudiandae. Nesciunt fuga voluptate, quia quod voluptates cupiditate.',
//     imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
//   },
// ]

export const ListProductsOutgoing: React.FC = () => {
  const {
    breadcrumbData,
    productsOutgoingList,
    actions: {
      createModal,
      router,
      ProductsOutgoingGET,
      checkStatus,
      getTagColor,
    },
  } = ProductsOutgoing.Hooks.List.use()

  React.useEffect(() => {
    ProductsOutgoingGET()
  }, [])

  console.log(productsOutgoingList)

  return (
    <div className="main">
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
        <h2>Уход товаров “Склад №1”</h2>
      </div>
      <div className={cls.header}>
        <Flex gap={8} className={cls.header__btn}>
          <Button onClick={() => router.push('/products/incoming')} type="default">
            Приход <ArrowUpOutlined />
          </Button>
          <Button  type="primary">
            Уход <ArrowDownOutlined />
          </Button>
        </Flex>
        <Flex gap={10}>
          <FilterPanel defaultValue={'all_products'}  options={[{ value: 'all_products', label: 'Все товары' }, { value: 'not_all_products', label: 'Не все товары' }]}/>
          <Button type="primary" onClick={createModal.onOpen} className={cls.btn}>Добавить уход</Button>
        </Flex>
      </div>
      <Table<ProductsOutgoingTypes.Table>
        columns={createColumns(checkStatus, getTagColor)}
        dataSource={productsOutgoingList}
        pagination={{ position: ['bottomRight'] }}
        rowKey={(record) => record.id}
        loading={!productsOutgoingList}
      />
      <ModalCreateOutgoing
        onCloseModal={createModal.onClose}
        isModalOpen={createModal.isOpen}
      />
    </div>
  )
}
