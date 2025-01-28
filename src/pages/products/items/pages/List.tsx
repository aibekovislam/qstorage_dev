'use client'

import React from 'react'

import { Flex, List } from 'antd'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { Items } from '..'
import cls from '../styles/view.module.css'

export const ListProducts: React.FC = () => {
  const {
    breadcrumbData,
    productsList,
    actions: {
      ProductsGET,
    },
  } = Items.Hooks.List.use()

  React.useEffect(() => {
    ProductsGET()
  }, [])

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
          loading={!productsList}
          dataSource={productsList}
          renderItem={(item) => (
            <List.Item
              key={item.slug}
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
                  <Image
                    width={117}
                    height={106}
                    className={cls.card_image}
                    src={item.image || NoPhoto.src}
                    alt={item.title}
                  />
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
