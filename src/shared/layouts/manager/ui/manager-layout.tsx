'use client'

import React from 'react'

import { Flex, Layout } from 'antd'
import { AppProgressBar } from 'next-nprogress-bar'

import { Navbar } from '@/widgets/navbar'
import { ManagerNavbarMenuRoutes } from '@/widgets/navbar/model/manager-menu-routes'
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
        <Layout.Header className={cls.header}>
          <Navbar routes={ManagerNavbarMenuRoutes} />
        </Layout.Header>
        <Layout>
          <Layout.Sider width="214px" className={cls.sidebar}>
            <SideBar routes={ManagerSidebarMenuRoutes}/>
          </Layout.Sider>
          <Layout.Content>{children}</Layout.Content>
        </Layout>
      </Layout>
      <AppProgressBar
        height="4px"
        color="#fffd00"
        options={{ showSpinner: false }}
        shallowRouting
      />
    </Flex>
  )
}
