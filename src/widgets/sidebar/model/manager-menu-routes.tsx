import { BarsOutlined, CalendarOutlined, RetweetOutlined, ShopOutlined, TableOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

type MenuItem = Required<MenuProps>['items'][number];

export const ManagerSidebarMenuRoutes: MenuItem[] = [
  {
    key: 'group',
    type: 'group',
    children: [
      {
        key: 'warehouse',
        label: 'Склад',
        icon: <ShopOutlined />,
      },
      {
        key: '/products/incoming',
        label: 'Приход/Уход',
        icon: <RetweetOutlined />,
      },
      {
        key: 'stock',
        label: 'Остатки товара',
        icon: <BarsOutlined />,
      },
      {
        key: '/projects',
        label: 'Проект',
        icon: <TableOutlined />,
      },
      {
        key: '/storage-requests',
        label: 'Заявки на склад',
        icon: <CalendarOutlined />,
      },
    ],
  },
]
