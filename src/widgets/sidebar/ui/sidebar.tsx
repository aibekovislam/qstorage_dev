'use client'

import React from 'react'

import { Flex, Menu } from 'antd'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { useAppSelector } from '@/shared/hooks/redux'
import { NEXT_PUBLIC_COMPANY_BASE_URL } from '@/shared/utils/consts'

import cls from './sidebar.module.css'

import type { MenuProps } from 'antd'

interface Props {
  routes: MenuProps['items']
}

export const SideBar: React.FC<Props> = (props) => {
  const router = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  }

  const pathname = usePathname()

  const user = useAppSelector((state) => state.user.userData)

  const getActiveRouter = (routes: MenuProps['items']) => {
    if (!routes) return []

    return routes.filter((item) => pathname?.includes(String(item?.key)))
  }

  return (
    pathname ? (
      <div className={cls.sidebar_wrapper}>
        <Flex className={cls.profile}>
          {
            user?.avatar ? (
              <Image src={`${NEXT_PUBLIC_COMPANY_BASE_URL}${user?.avatar}`} width={50} height={50} alt="profile_image" className={cls.profile_image} />
            ) : (
              <Flex className={cls.default_avatar}>
                {user?.email[0]}
              </Flex>
            )
          }

          <Flex gap={5} vertical>
            <h3 className={cls.usernames}>{`${user?.first_name} ${user?.last_name}`}</h3>
            <span className={cls.role}>{user?.role}</span>
          </Flex>
        </Flex>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={['/products/arrivals']}
          defaultOpenKeys={['sub1']}
          selectedKeys={getActiveRouter(props.routes)?.map(item => item?.key as string) ?? []}
          mode="inline"
          items={props.routes}
          className={cls.Menu}
        />
      </div>
    ) : null
  )
}
