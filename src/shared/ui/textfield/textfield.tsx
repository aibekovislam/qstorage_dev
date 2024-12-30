import React from 'react'

import { Input, InputProps } from 'antd'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'

import cls from './textfield.module.css'

interface Props extends InputProps {
  label?: string
  initialValue?: string
  text?: string
  rules?: Rule[]
  maxLength?: number
}

export const TextField: React.FC<Props> = (props) => {
  return (
    <FormItem
      className={`${cls.textField} ${props.disabled && cls.textField_disabled}`}
      label={props.label}
      style={props.style}
    >
      {
        props.text ? (
          <p className={cls.textField__description}>
            {props.text}
          </p>
        ) : null
      }

      <FormItem
        name={props.name}
        rules={props.rules}
        initialValue={props.initialValue}
        noStyle
      >
        <Input
          className={cls.textField__input}
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={props.onChange}
          type={props.type}
          maxLength={props.maxLength}
        />
      </FormItem>
    </FormItem>
  )
}
