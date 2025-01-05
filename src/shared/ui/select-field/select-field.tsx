import { Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { SelectProps } from 'antd/lib'

interface Props extends SelectProps {
  label?: string
  name?: string
}

export const SelectField: React.FC<Props> = (props) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <FormItem noStyle name={props.name}>
      <Select
        title={props.label}
        defaultValue="Все товары"
        style={props.style}
        onChange={handleChange}
        options={props.options}
      />
    </FormItem>
  )
}
