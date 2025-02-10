'use client'

import React from 'react'

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { Table, Tag, Avatar, Space, Flex, Button, Popover, Typography } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { ProductsIncoming } from '..'
import cls from '../styles/view.module.css'
import { ProductsIncomingTypes } from '../types'
import ModalCreateIncoming from '../ui/modals/ModalCreate/modal-create-incoming'

const { Paragraph } = Typography

const createColumns = (checkStatus: any, getTagColor: any): ColumnsType<ProductsIncomingTypes.Table> => {
  const columns: ColumnsType<ProductsIncomingTypes.Table> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (product: ProductsIncomingTypes.TableProduct) => (
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
      render: (project: ProductsIncomingTypes.TableProject) => (
        <span>{project.title}</span>
      ),
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
      render: (date: string) => {
        const formatted = dayjs(date).format('DD.MM.YYYY')

        return (
          <span>{formatted}</span>
        )
      },
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
      render: (responsible: ProductsIncomingTypes.TableResponsible) => (
        <Space>
          <Avatar>{responsible.image}</Avatar>
          <span>{responsible.first_name}</span>
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
            <Paragraph>{comment.slice(0, 10)}...</Paragraph>
          </Popover>
        )
      },
    },
  ]

  return columns
}

export const ListProductsIncoming: React.FC = () => {
  const {
    breadcrumbData,
    productsIncomingList,
    actions: {
      createModal,
      router,
      ProductsIncomingGET,
      checkStatus,
      getTagColor,

    },
  } = ProductsIncoming.Hooks.List.use()

  React.useEffect(() => {
    ProductsIncomingGET()
  }, [])

  return (
    <div>
      <div className="main">
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
          <h2>Приход товаров “Склад №1”</h2>
        </div>
        <div className={cls.header}>
          <Flex gap={8} className={cls.header__btn}>
            <Button type="primary">
              Приход <ArrowUpOutlined />
            </Button>
            <Button onClick={() => router.push('/products/outgoing')} type="default">
              Уход <ArrowDownOutlined />
            </Button>
          </Flex>
          <Flex gap={10}>
            <FilterPanel defaultValue={'all_products'} options={[{ value: 'all_products', label: 'Все товары' }, { value: 'not_all_products', label: 'Не все товары' }]}/>
            <Button type="primary" onClick={createModal.onOpen} className={cls.btn}>Добавить приход</Button>
          </Flex>
        </div>
        <Table<ProductsIncomingTypes.Table>
          columns={createColumns(checkStatus, getTagColor)}
          dataSource={productsIncomingList}
          pagination={{ position: ['bottomRight'] }}
          rowKey={(record) => record.id}
          loading={!productsIncomingList}
          scroll={{ x: 'max-content' }}
        />
      </div>
      <ModalCreateIncoming
        onCloseModal={createModal.onClose}
        isModalOpen={createModal.isOpen}
      />
    </div>
  )
}
