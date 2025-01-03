import { Select } from 'antd'
import { SelectProps } from 'antd/lib'

interface Props extends SelectProps {
  label?: string
}

export const SelectField: React.FC<Props> = (props) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <Select
      title={props.label}
      defaultValue="Все товары"
      style={props.style}
      onChange={handleChange}
      options={props.options}
    />
  )
}
