'use client'

import React from 'react'

import { Button, Flex, List } from 'antd'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'
import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { FilterPanel } from '@/shared/ui/filter-panel/filter-panel'

import { ProductItems } from '..'
import cls from '../styles/list.module.css'

export const ListProducts: React.FC = () => {
  const {
    breadcrumbData,
    productsList,
    actions: {
      ProductsGET,
      router,
    },
  } = ProductItems.Hooks.List.use()

  React.useEffect(() => {
    ProductsGET()
  }, [])

  console.log(productsList)

  return (
    <div className="main">
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
        <Button onClick={() => router.push('/products/items/create')} type="primary">Создать товар</Button>
      </div>
      <Flex className={cls.filterPanel}>
        <h2>Товары</h2>
        <Flex gap={10}>
          <FilterPanel defaultValue={'all_products'}  options={[{ value: 'all_products', label: 'Все товары' }, { value: 'pants', label: 'Штаны' }]}/>
        </Flex>
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
              <div onClick={() => router.push(`/products/items/${item.slug}?title=${encodeURIComponent(item.title)}`)} className={cls.card}>
                <Flex justify={'center'}>
                  <Image
                    width={117}
                    height={106}
                    className={cls.card_image}
                    src={item.image || NoPhoto.src}
                    alt={item.title}
                    priority
                  />
                </Flex>
                <div className={cls.card__info}>
                  <h2>{item.title}</h2>
                  <Flex gap={5}>
                    {item.color?.length ? (
                      item.color.map((color) => (
                        <div key={color.id} style={{ backgroundColor: color.hash_code }} className={cls.circle_color} />
                      ))
                    ) : (
                      <div className={cls.no_colors}>Нет цветов</div>
                    )}
                  </Flex>
                  <span>{parseInt(item.price)} сом</span>
                </div>
              </div>
            </List.Item>
          )}
        />
      </div>
    </div>
  )
}
