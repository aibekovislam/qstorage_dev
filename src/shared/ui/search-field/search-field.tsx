import { Input } from 'antd'

import cls from './search-field.module.css'
import { InputProps } from 'antd/lib'

interface Props extends InputProps {
   name?: string
}

export const SearchField: React.FC<Props> = (props) => {
  return (
    <Input
      name={props.name}
      className={cls.search__input}
      placeholder="Поиск"
      onChange={props.onChange}
    />
  )
}
