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

import { ProductsOutgoing } from '..'
import cls from '../styles/view.module.css'
import { ProductsOutgoingTypes } from '../types'
import ModalCreateOutgoing from '../ui/modals/ModalCreate/modal-create-outgoing'

const { Paragraph } = Typography

const createColumns = (checkStatus: any, getTagColor: any): ColumnsType<ProductsOutgoingTypes.Table> => {
  const columns: ColumnsType<ProductsOutgoingTypes.Table> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (product: ProductsOutgoingTypes.Product) => (
        <Space >
          <Image
            src={product.image && product.image.trim() !== '' ? product.image : NoPhoto.src}
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
      render: (project: ProductsOutgoingTypes.Project) => (
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
      render: (responsible: ProductsOutgoingTypes.Responsible) => (
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
            <Paragraph>{!comment ? '' : `${comment.slice(0, 10)}...`}</Paragraph>
          </Popover>
        )
      },
    },
  ]

  return columns
}

export const ListProductsOutgoing: React.FC = () => {
  const {
    breadcrumbData,
    productsOutgoingList,
    currentPage,
    actions: {
      createModal,
      router,
      ProductsOutgoingGET,
      checkStatus,
      getTagColor,
      setCurrentPage,

    },
  } = ProductsOutgoing.Hooks.List.use()

  React.useEffect(() => {
    if (!createModal.isOpen) {
      ProductsOutgoingGET()
    }
  }, [createModal.isOpen])

  console.log(productsOutgoingList)

  return (
    <div>
      <div className="main">
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
          <h2>Уход товаров</h2>
        </div>
        <div className={cls.header}>
          <Flex gap={8} className={cls.header__btn}>
            <Button onClick={() => router.push('/products/incoming')} type="default">
              Приход <ArrowUpOutlined />
            </Button>
            <Button type="primary">
              Уход <ArrowDownOutlined />
            </Button>
          </Flex>
          <Flex gap={10}>
            <FilterPanel defaultValue={'all_products'} options={[{ value: 'all_products', label: 'Все товары' }, { value: 'not_all_products', label: 'Не все товары' }]}/>
            <Button type="primary" onClick={createModal.onOpen} className={cls.btn}>Добавить уход</Button>
          </Flex>
        </div>
        <Table<ProductsOutgoingTypes.Table>
          columns={createColumns(checkStatus, getTagColor)}
          dataSource={productsOutgoingList?.results}
          rowKey={(record) => record.id}
          loading={!productsOutgoingList?.results}
          scroll={{ x: 'max-content' }}
          pagination={{
            position: ['bottomRight'],
            total: productsOutgoingList?.count,
            current: currentPage,
            pageSize: 10,
            onChange: (page) => {
              setCurrentPage(page)
              ProductsOutgoingGET(page)
            },
          }}
        />
      </div>
      <ModalCreateOutgoing
        onCloseModal={createModal.onClose}
        isModalOpen={createModal.isOpen}
      />
    </div>
  )
}
