import { Input } from 'antd'

import cls from './search-field.module.css'

interface Props {
   onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const SearchField: React.FC<Props> = ({ onChange }) => {
  return (
    <Input
      className={cls.search__input}
      placeholder="Поиск"
      onChange={onChange}
      style={{
        height: 34,
        width: 240,
        borderRadius: 5,
      }}
    />
  )
}
