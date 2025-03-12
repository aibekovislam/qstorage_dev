'use client'

import React from 'react'

import { Button, Flex, Form, InputNumber, Space, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import Image from 'next/image'
import Link from 'next/link'

import { NoPhoto } from '@/shared/assets/images'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { DraggerFileField } from '@/shared/ui/dragger-file-field/dragger-file-field'
import { SearchField } from '@/shared/ui/search-field/search-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductsIncoming } from '..'
import { ProductsTypes } from '../../items/types'
import cls from '../styles/create.module.css'
import { InputRules } from '../validate'

const createColumns = () => {
  const columns: ColumnsType<ProductsTypes.Item> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => (
        <Space>
          <Image
            src={record.image || NoPhoto.src}
            alt={record.title}
            style={{ objectFit: 'cover' }}
            width={50}
            height={40}
            className={cls.table_image}
          />
          <Link href={`/products/${record.slug}/`}>{record.title}</Link>
        </Space>
      ),
    },
    {
      title: 'Кол-во',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Срок годности',
      dataIndex: 'expiration_date',
      key: 'expiration_date',
    },
    {
      title: 'Штрих код',
      dataIndex: 'barcode',
      key: 'barcode',
      render: (_, record) => (
        <Image
          src={record.barcode || NoPhoto.src}
          alt={record.title}
          style={{ objectFit: 'cover' }}
          width={100}
          height={40}
          className={cls.table_image}
        />
      ),
    },
    {
      title: 'Склады',
      dataIndex: 'warehouse',
      key: 'warehouse',
    },
    {
      title: 'Цена',
      dataIndex: 'price',
      key: 'price',
    },
  ]

  return columns
}

const createSelectedProductsColumns = () => {
  const columns: ColumnsType<ProductsTypes.Item> = [
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (_, record) => (
        <Space>
          <Image
            src={record.image || NoPhoto.src}
            alt={record.title}
            style={{ objectFit: 'cover' }}
            width={50}
            height={40}
            className={cls.table_image}
          />
          <Link href={`/products/${record.slug}/`}>{record.title}</Link>
        </Space>
      ),
    },
    {
      title: 'Штрих-код',
      dataIndex: 'barcode',
      key: 'barcode',
      render: (_, record) => (
        <Image
          src={record.barcode || NoPhoto.src}
          alt={record.title}
          style={{ objectFit: 'cover' }}
          width={100}
          height={40}
          className={cls.table_image}
        />
      ),
    },
    {
      title: 'Количество товара',
      dataIndex: 'quantity',
      key: 'quantity',
      render: () => (
        <InputNumber placeholder="0" />
      ),
    },
  ]

  return columns
}

export const Create = () => {
  const {
    breadcrumbData,
    products,
    isProductsLoading,
    selectedProducts,
    defaultDraggerProps,
    userResponsible,
    submitted,
    actions: {
      getProducts,
      onProductsSelectChange,
      handleSearchProducts,
      ProductsIncomingUsers,
    },
  } = ProductsIncoming.Hooks.Create.use()

  React.useEffect(() => {
    getProducts()
    ProductsIncomingUsers()
  }, [])

  return (
    <div>
      <div className={cls.create}>
        <div className={cls.navigation__info}>
          <Breadcrumb items={breadcrumbData}/>
        </div>

        <h1 className={cls.main__title}>Создать приход товаров</h1>

        <Flex vertical className={cls.form}>
          <Form>
            <Flex className={cls.products} vertical gap={20}>
              <Flex gap={20} vertical className={cls.selected_products_table}>
                <h1 className={cls.products__title}>Выбрано товаров: <span className={cls.counter}>{selectedProducts.length} товаров</span></h1>

                <Table
                  columns={createSelectedProductsColumns()}
                  dataSource={selectedProducts}
                  scroll={{ x: 'max-content' }}
                  rowKey={(record) => record.slug ? record.slug : ''}
                  rowSelection={{
                    type: 'checkbox',
                    onChange: onProductsSelectChange,
                    selectedRowKeys: selectedProducts.map((item) => item.slug ? item.slug : ''),
                  }}
                  pagination={{
                    position: ['bottomRight'],
                    pageSize: 10,
                  }}
                  rootClassName={`${selectedProducts.length > 0 ? cls.selected_table_has : cls.selected_table}`}
                />
              </Flex>

              <Flex gap={20} className={cls.products_table} vertical>
                <Flex className={cls.products_header} justify="space-between" align="center">
                  <Flex align="center" gap={20} className={cls.search_and_title}>
                    <h1 className={cls.products__title}>Товары:</h1>

                    <SearchField onChange={(e) => handleSearchProducts(e)} />
                  </Flex>

                  <Button className={cls.filter_btn} type="primary">Фильтры</Button>
                </Flex>

                <Table
                  columns={createColumns()}
                  dataSource={products}
                  loading={isProductsLoading}
                  rowKey={(record) => record.slug ? record.slug : ''}
                  scroll={{ x: 'max-content' }}
                  rowSelection={{
                    type: 'checkbox',
                    onChange: onProductsSelectChange,
                    selectedRowKeys: selectedProducts.map((item) => item.slug ? item.slug : ''),
                  }}
                  pagination={{
                    position: ['bottomRight'],
                    pageSize: 10,
                  }}
                  rootClassName={cls.products_table_main}
                />
              </Flex>
            </Flex>

            <Flex vertical gap={10}>
              <TextField
                name="act"
                type="text"
                label="Номер документа:"
                placeholder="Введите номер"
                className={cls.form__item}
                rules={InputRules.DocumentNumber}
              />
              <TextField
                name="purchase_price"
                type="text"
                label="Цена за закупку:"
                placeholder="Введите цену за одну закупку"
                className={cls.form__item}
              />
              <TextField
                type="text"
                label="Общая стоимость:"
                placeholder="Общая стоимость"
                className={cls.form__item}
              />
              <TextField
                name="supplier"
                type="text"
                label="Поставщик:"
                placeholder="Введите поставщика"
                className={cls.form__item}
                rules={InputRules.Field}
              />
              <TextField
                name="message"
                type="text"
                label="Комментарий"
                placeholder="Введите комментарий для прихода"
                className={cls.form__item}
              />
              <SelectField
                name="responsible"
                className={cls.form__item}
                placeholder="Выберите ответственного"
                label="Ответственный:"
                options={userResponsible?.map(responsible => ({
                  title: responsible.first_name,
                  value: responsible.uuid,
                  userObj: responsible,
                }))}
                rules={InputRules.Field}
              />
              <DraggerFileField
                name="files"
                valuePropName="fileList"
                {...defaultDraggerProps}
                className={cls.dragger_filed}
              />
            </Flex>

            <Flex gap={10}>
              <Button type="primary" style={{ width: '150px' }} disabled={submitted}>Создать</Button>
              <Button style={{ width: '150px' }} disabled={submitted}>Отмена</Button>
            </Flex>
          </Form>
        </Flex>
      </div>
    </div>
  )
}
