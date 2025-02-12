import { AppstoreOutlined, BarChartOutlined, BarsOutlined, CalendarOutlined, DownloadOutlined, LogoutOutlined, ProfileOutlined, SearchOutlined, ShopOutlined, TableOutlined, TeamOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

import { QStorageLogo } from '@/shared/assets/icons'
import { SearchField } from '@/shared/ui/search-field/search-field'

type MenuItem = Required<MenuProps>['items'][number];

export const ManagerSidebarMenuRoutes: MenuItem[] = [
  {
    key: 'group',
    type: 'group',
    children: [
      {
        key: 'logo',
        icon: <QStorageLogo/>,
        className: 'logo',
      },
      {
        key: '#',
        label: (
          <SearchField size="large" prefix={<SearchOutlined/>} />
        ),
        className: 'search_sidebar',
      },
      {
        key: 'warehouse',
        label: 'Склад',
        icon: <ShopOutlined />,
      },
      {
        key: '/products',
        label: 'Товары',
        type: 'group',
        children: [
          {
            key: '/products/incoming',
            label: 'Приход',
            icon: <DownloadOutlined/>,
          },
          {
            key: '/products/outgoing',
            label: 'Уход',
            icon: <LogoutOutlined/>,
          },
          {
            key: '/products/items',
            label: 'Все товары',
            icon: <AppstoreOutlined/>,
          },
          {
            key: '/inventory',
            label: 'Остатки товара',
            icon: <BarsOutlined />,
          },
        ],
      },
      {
        key: '/others',
        label: 'Остальное',
        type: 'group',
        children: [
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
          {
            key: '/employees',
            label: 'Персонал',
            icon: <TeamOutlined />,
          },
          {
            key: '/history',
            label: 'История',
            icon: <ProfileOutlined />,
          },
          {
            key: '/analysis',
            label: 'Анализ поступлений',
            icon: <BarChartOutlined />,
          },
        ],
      },
    ],
  },
]