'use client'

import React from 'react'

import { Space, Table, Flex } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { Stock } from '..'
import cls from '../styles/view.module.css'
import { StockType } from '../types'

const createColumns = (): ColumnsType<StockType.Table> => {
  const columns: ColumnsType<StockType.Table> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => (
        <Space>
          <Image
            src={record.image || NoPhoto.src}
            alt={record.title}
            style={{ objectFit: 'cover' }}
            width={50}
            height={40}
            className={cls.table_image}
          />
          <span>{record.title}</span>
        </Space>
      ),
    },
    {
      title: 'Закуп. цена (сом)',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Сумма (закуп..сом)',
      dataIndex: 'total_purchase',
      key: 'total_purchase',
    },
  ]

  return columns
}

export const View = () => {
  const {
    breadcrumbData,
    stock,
    currentPage,
    actions: {
      StockGET,
      setCurrentPage,
    } } = Stock.Hooks.View.use()

  React.useEffect(() => {
    StockGET()
  }, [])

  console.log(stock)

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

      <Table<StockType.Table>
        columns={createColumns()}
        dataSource={stock?.results}
        rowKey={(record) => record.slug}
        loading={!stock}
        scroll={{ x: 'max-content' }}
        pagination={{
          position: ['bottomRight'],
          total: stock?.count,
          current: currentPage,
          pageSize: 10,
          onChange: (page) => {
            setCurrentPage(page)
            StockGET(page)
          },
        }}
      />
    </div>
  )
}
