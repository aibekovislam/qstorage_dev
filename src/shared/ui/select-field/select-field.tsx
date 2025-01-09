import { Select } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { SelectProps } from 'antd/lib'
import cls from "./select-field.module.css"
import { Rule } from 'antd/es/form'

interface Props extends SelectProps {
  label?: string
  name?: string
  initialValue?: string
  rules?: Rule[]
}

export const SelectField: React.FC<Props> = (props) => {
  const handleChange = (value: string) => {
    console.log(`selected ${value}`)
  }

  return (
    <FormItem 
      className={cls.selectField}
      label={props.label}
      style={props.style}
    >
      <FormItem 
        name={props.name}
        rules={props.rules}
        initialValue={props.initialValue}
        noStyle
      >
      <Select
        defaultValue={props.defaultValue}
        style={props.style}
        onChange={handleChange}
        options={props.options}
        placeholder={props.placeholder}
        className={props.className}
      />
    </FormItem>
    </FormItem>
  )
}
