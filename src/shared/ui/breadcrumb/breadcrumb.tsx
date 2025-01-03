import { Breadcrumb as BreadcrumbAntd } from 'antd'
import { BreadcrumbProps } from 'antd/lib'

interface Props extends BreadcrumbProps{
  title?: string
}

export const Breadcrumb: React.FC<Props> = (props) => {
  return (
    <BreadcrumbAntd
      items={props.items}
      separator="/"
    />
  )
}
