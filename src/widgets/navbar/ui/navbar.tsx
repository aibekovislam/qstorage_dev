'use client'

import React from 'react'

import { ArrowUpOutlined, BellOutlined, InfoCircleOutlined, UserOutlined } from '@ant-design/icons'
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
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'

import { QStorageLogo } from '@/shared/assets/icons'
import { SearchField } from '@/shared/ui/search-field/search-field'

import cls from './navbar.module.css'

const { Header } = Layout
const { Text, Paragraph  } = Typography

interface Props {
  routes: MenuProps['items']
}

export const Navbar: React.FC<Props> = (props) => {
  const router = useRouter()
  const onClick: MenuProps['onClick'] = (e) => {
    router.push(e.key)
  }

  const [api, contextHolder] = notification.useNotification()

  const pathname = usePathname()

  const handleNotificationClick = () => {
    const key = `open${Date.now()}`
    const btn = (
      <Button onClick={() => api.destroy(key)} type="primary">
        Ок
      </Button>
    )

    api.open({
      message: (
        <Flex justify={'space-between'}>
          <Flex gap={5}>
            <ArrowUpOutlined className={cls.icon__up} />
            <span>ПРИХОД</span>
          </Flex>
          <div className={cls.date}>
            <span>12.10.2024</span>
          </div>
        </Flex>
      ),
      description: (
        <Flex justify={'space-between'}>
          <Flex className={cls.text_content}>
            <Typography className={cls.title}>Менеджер Чынгыз А.</Typography>
            <Paragraph className={cls.description}>Менеджер Чынгыз А. Принял заявку на новый товар от Ислам Б. </Paragraph>
          </Flex>
          <div>
            <Image
              src={'https://outdoorvitals.com/cdn/shop/products/greensatushopify.png?v=1701706579&width=1000'}
              alt={'image'}
              style={{ objectFit: 'cover' }}
              width={70}
              height={70}
            />
          </div>
        </Flex>
      ),
      btn,
      key,
      duration: null,
      closable: false,
    })
  }

  function findActiveKey(path: string): string {
    const matchedItem = props.routes?.find((item) => {
      const itemKey = item?.key as string

      return path.startsWith(itemKey)
    })

    return String(matchedItem?.key) || ''
  }

  const activeKey = findActiveKey(pathname ? pathname : '')

  return (
    pathname ? (
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
                  selectedKeys={[activeKey]}
                  disabledOverflow
                  onClick={onClick}
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
    ) : null
  )
}
