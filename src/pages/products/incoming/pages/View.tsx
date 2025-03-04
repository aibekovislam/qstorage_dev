'use client'

import React from 'react'

import { Flex } from 'antd'
import Link from 'next/link'

import { Breadcrumb } from '@/shared/ui/breadcrumb/breadcrumb'
import { LoaderData } from '@/shared/ui/loader/Loader'

import { ProductsIncoming } from '..'
import cls from '../styles/view.module.css'

interface Props {
  incoming_id: string
}

export const View: React.FC<Props> = ({ incoming_id }) => {
  const {
    breadcrumbData,
    incomingItem,
    incomingItemLoading,
    actions: {
      getIncomingDetails,
    },
  } = ProductsIncoming.Hooks.View.use()

  React.useEffect(() => {
    if (incoming_id) {
      getIncomingDetails(incoming_id)
    }
  }, [incoming_id])

  return (
    <div>
      <div className="main">
        <LoaderData isLoading={incomingItemLoading} data={incomingItem}>
          <div className={cls.navigation__info}>
            <Breadcrumb items={breadcrumbData}/>
            <h2>Приход товаров {incomingItem?.product?.title}</h2>
          </div>

          <Flex className={cls.incoming_info}>
            <Flex className={cls.incoming_info__block}>
              <h3 className={cls.title}>Документы (накладная)</h3>

              {
                incomingItem?.files.map((item, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Link href={item.file} key={index} className={cls.docs_item}>{item.file}</Link>
                ))
              }
            </Flex>
          </Flex>
        </LoaderData>
      </div>
    </div>
  )
}
