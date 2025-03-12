'use client'

import React from 'react'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'

import { ProductItems } from '..'
import cls from '../styles/view.module.css'

interface Props {
    item_slug: string
}

export const ViewProduct: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    itemDetail,
    contextHolder,
    projectTitle,
    actions: {
      ProductItemsBySlugGET,
    },
  } = ProductItems.Hooks.View.use()

  React.useEffect(() => {
    ProductItemsBySlugGET(String(props.item_slug))
  }, [])

  console.log(itemDetail)

  return (
    <div className="main">
      {contextHolder}
      <div className={cls.navigation__info}>
        <Breadcrumb items={breadcrumbData}/>
        <h2>Товар ”{projectTitle}”</h2>
      </div>
    </div>
  )
}
