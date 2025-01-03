'use client'

import React from 'react'

import { BellOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
import {
  Avatar,
  Badge,
  Button,
  Flex,
  Layout,
  Menu,
  Typography,
  notification,
} from 'antd'
import { MenuProps } from 'antd/lib'

import { QStorageLogo } from '@/shared/assets/icons'
import { SearchField } from '@/shared/ui/search-field/search-field'

import cls from './navbar.module.css'

const { Header } = Layout
const { Text } = Typography

interface Props {
  routes: MenuProps['items']
}

export const Navbar: React.FC<Props> = (props) => {
  const [api, contextHolder] = notification.useNotification()

  const handleNotificationClick = () => {
    api.open({
      message: 'Title',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia pariatur odio quidem temporibus velit deleniti nisi fuga adipisci culpa a, architecto tempora et. Adipisci libero autem fugit laborum at consequuntur.',
      pauseOnHover: true,
    })
  }

  return (
    <>
      {contextHolder}
      <Header className={cls.navbar}>
        <Flex justify="space-between">
          <Flex align="center">
            <div className={cls.navbar__logo}>
              <QStorageLogo />
            </div>
            <Flex className={cls.navbar__navigation}>
              <Menu
                theme="light"
                mode="horizontal"
                items={props.routes}
                className={cls.Menu}
              />
              <Button type="primary">Создать</Button>
            </Flex>
          </Flex>
          <Flex align="center" gap={17}>
            <SearchField />
            <div className={cls.navbar__info}>
              <InfoCircleOutlined size={14} />
            </div>
            <div onClick={handleNotificationClick} className={cls.navbar__notification}>
              <Badge size="small" count={1}>
                <BellOutlined size={14} />
              </Badge>
            </div>
            <div className={cls.navbar__user}>
              <Avatar icon={<UserOutlined />} />
              <Text>Директор</Text>
            </div>
          </Flex>
        </Flex>
      </Header>
    </>
  )
}
