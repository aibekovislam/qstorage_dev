import { BarChartOutlined, ProfileOutlined, TableOutlined, TeamOutlined } from '@ant-design/icons'
import { MenuProps } from 'antd'

export const ManagerNavbarMenuRoutes: MenuProps['items'] = [
  {
    key: '/products',
    label: 'Товары',
    icon: <TableOutlined />,
  },
  {
    key: 'staff',
    label: 'Персонал',
    icon: <TeamOutlined />,
  },
  {
    key: 'history',
    label: 'История',
    icon: <ProfileOutlined />,
  },
  {
    key: 'analysis',
    label: 'Анализ поступлений',
    icon: <BarChartOutlined />,
  },
]
