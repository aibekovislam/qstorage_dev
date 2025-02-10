'use client'

import React, { useState } from 'react'

import { MenuOutlined, UserOutlined } from '@ant-design/icons'
import { Layout, Drawer, Button, Flex, Avatar } from 'antd'

import { SideBar } from '@/widgets/sidebar'
import { ManagerSidebarMenuRoutes } from '@/widgets/sidebar/model/manager-menu-routes'

import cls from './manager-layout.module.css'

interface Props {
  children: React.ReactNode;
}

export const ManagerLayout: React.FC<Props> = ({ children }) => {
  const [drawerVisible, setDrawerVisible] = useState(false)

  const showDrawer = () => {
    setDrawerVisible(true)
  }

  const onClose = () => {
    setDrawerVisible(false)
  }

  return (
    <>
      <Layout className={cls.main_layout}>
        <Layout className={cls.layout_side_content}>
          <Layout.Sider
            width="270px"
            className={cls.sidebar}
            breakpoint="lg"
            collapsedWidth="0"
          >
            <SideBar routes={ManagerSidebarMenuRoutes} />
          </Layout.Sider>
          <Layout.Content className={cls.content}>
            <Flex justify="space-between" align="center" className={cls.header}>
              <Button
                className={cls.burger_button}
                icon={<MenuOutlined />}
                onClick={showDrawer}
              />

              <Flex gap={5} align="center" justify="space-between" className={cls.avatar_mobile}>
                <Avatar icon={<UserOutlined />} />
                <span>Директор</span>
              </Flex>
            </Flex>
            {children}
          </Layout.Content>
        </Layout>
      </Layout>

      <Drawer
        title="Меню"
        placement="left"
        closable={true}
        onClose={onClose}
        open={drawerVisible}
        className={cls.drawer}
      >
        <SideBar routes={ManagerSidebarMenuRoutes} />
      </Drawer>
    </>
  )
}
