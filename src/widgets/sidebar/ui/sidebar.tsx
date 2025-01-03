'use client'
import { Menu } from 'antd'

import cls from './sidebar.module.css'

import type { MenuProps } from 'antd'

interface Props {
  routes: MenuProps['items']
}

export const SideBar: React.FC<Props> = (props) => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  return (
    <Menu
      onClick={onClick}
      defaultSelectedKeys={['in-out']}
      defaultOpenKeys={['sub1']}
      mode="inline"
      items={props.routes}
      className={cls.Menu}
    />
  )
}
