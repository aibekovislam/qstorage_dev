'use client'
import {  BellOutlined, InfoCircleOutlined, RightOutlined, UserOutlined } from '@ant-design/icons'
import { Avatar, Badge, Divider, Flex, Menu } from 'antd'
import { usePathname, useRouter } from 'next/navigation'

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

  return (
    pathname ? (
      <div className={cls.sidebar_wrapper}>
        <Menu
          onClick={onClick}
          defaultSelectedKeys={['/products/arrivals']}
          defaultOpenKeys={['sub1']}
          selectedKeys={[pathname]}
          mode="inline"
          items={props.routes}
          className={cls.Menu}
        />
        {/* <ul className={`${cls.sidebar_footer} ${cls.sidebar_navigation}`}>
          <div className={cls.sidebar_navigation__item}>
            <Badge size="small" count={1}>
              <BellOutlined size={14} />
            </Badge>
            <span>Уведомления</span>
          </div>
          <div className={cls.sidebar_navigation__item}>
            <InfoCircleOutlined size={14} />
            <span>Помощь и поддержка</span>
          </div>
        </ul> */}

        {/* <div className={cls.sidebar_footer}>
          <Divider className={cls.sidebar_divider}/>
        </div>
        <div className={`${cls.sidebar_footer} ${cls.navbar__user}`}>
          <Flex className={cls.account}>
            <Avatar icon={<UserOutlined />} />
            <span>Директор</span>
          </Flex>
          <RightOutlined className={cls.arrow_icon}/>
        </div> */}
      </div>
    ) : null
  )
}
