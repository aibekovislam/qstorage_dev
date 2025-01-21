'use client'

import React from 'react'

import { Flex, List } from 'antd'
import Image from 'next/image'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { Items } from '..'
import cls from '../styles/view.module.css'

const products = [
  {
    id: 1,
    title: 'Штаны',
    price: 364,
    color: 'Серый',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
  {
    id: 2,
    title: 'Платье',
    price: 549,
    color: 'Черный',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
  {
    id: 3,
    title: 'Пиджак',
    price: 2000,
    color: 'Темно-синий',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
  {
    id: 4,
    title: 'Носки',
    price: 784,
    color: 'Синий с полосками',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
  {
    id: 5,
    title: 'Сумка',
    price: 3364,
    color: 'Коричневый',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
  {
    id: 6,
    title: 'Футболка',
    price: 2364,
    color: 'Розовый',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
  {
    id: 7,
    title: 'Рубашка',
    price: 3564,
    color: 'Белый',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
  {
    id: 8,
    title: 'Куртка',
    price: 6364,
    color: 'Желтый',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
  {
    id: 9,
    title: 'Топ',
    price: 364,
    color: 'Черный',
    imageUrl: 'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000',
  },
]

export const View: React.FC = () => {
  const {
    breadcrumbData,
  } = Items.Hooks.List.use()

  return (
    <div className="main">
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
        <h2>Товары “Склад №1”</h2>
      </div>
      <Flex className={cls.filterPanel}>
        <FilterPanel defaultValue={'all_products'}  options={[{ value: 'all_products', label: 'Все товары' }, { value: 'pants', label: 'Штаны' }]}/>
      </Flex>
      <div className={cls.products_main}>
        <List
          size={'small'}
          grid={{
            gutter: 16,
            column: 7,
            xxl: 7,
            xl: 7,
            lg: 4,
            md: 3,
            sm: 2,
            xs: 2,
          }}
          loading={!products}
          dataSource={products}
          renderItem={(item) => (
            <List.Item
              key={item.id}
              style={{
                background: 'transparent',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '10px',
                padding: 0,
              }}
            >
              <div className={cls.card}>
                <Flex justify={'center'}>
                  <Image width={117} height={106} className={cls.card_image} src={item.imageUrl} alt={item.title}/>
                </Flex>
                <div className={cls.card__info}>
                  <h2>{item.title}</h2>
                  <p>{item.color}</p>
                  <span>{item.price} сом</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
