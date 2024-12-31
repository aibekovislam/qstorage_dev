'use client'

import React from 'react'

import { Flex, Layout } from 'antd'
import { AppProgressBar } from 'next-nprogress-bar'

import { Navbar } from '@/widgets/navbar'
import { SideBar } from '@/widgets/sidebar'

import cls from './manager-layout.module.css'

interface Props {
  children: React.ReactNode;
}

export const ManagerLayout: React.FC<Props> = ({ children }) => {
  return (
    <Flex gap="middle" wrap>
      <Layout>
        <Layout.Header className={cls.header}>
          <Navbar/>
        </Layout.Header>
        <Layout>
          <Layout.Sider width="25%" className={cls.sidebar}>
            <SideBar/>
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
