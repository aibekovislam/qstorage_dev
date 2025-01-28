'use client'

import React from 'react'

import { Flex, Layout } from 'antd'

import { SideBar } from '@/widgets/sidebar'
import { ManagerSidebarMenuRoutes } from '@/widgets/sidebar/model/manager-menu-routes'

import cls from './manager-layout.module.css'

interface Props {
  children: React.ReactNode;
}

export const ManagerLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex gap="middle" wrap>
      <Layout className={cls.main_layout}>
        <Layout className={cls.layout_side_content}>
          <Layout.Sider width="270px" className={cls.sidebar}>
            <SideBar routes={ManagerSidebarMenuRoutes}/>
          </Layout.Sider>
          <Layout.Content className={cls.content}>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>
    </Flex>
  )
}
