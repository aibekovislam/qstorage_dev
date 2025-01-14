'use client'
import { Menu } from 'antd'
import { usePathname } from 'next/navigation'

import cls from './sidebar.module.css'

import type { MenuProps } from 'antd'

interface Props {
  routes: MenuProps['items']
}

export const SideBar: React.FC<Props> = (props) => {
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e)
  }

  const pathname = usePathname()

  return (
    pathname ? (
      <Menu
        onClick={onClick}
        defaultSelectedKeys={['/products/arrivals']}
        defaultOpenKeys={['sub1']}
        selectedKeys={[pathname]}
        mode="inline"
        items={props.routes}
        className={cls.Menu}
      />
    ) : null
  )
}
