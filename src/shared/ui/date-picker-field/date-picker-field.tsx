'use client'

import React from 'react'

import { DatePicker } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { Rule } from 'antd/es/form'
import cls from  './date-picker-field.module.css'
import type { DatePickerProps } from 'antd'
import type { Dayjs } from 'dayjs'

interface Props extends DatePickerProps{
  label?: string,
  rules?: Rule[],
  initialValue?: string
  pickerMode?: 'year' | 'month' | 'date'
  onChange?: (value: Dayjs | null) => void
}

export const DatePickerField: React.FC<Props> = (props) => {
  const handleChange: DatePickerProps['onChange'] = (dateValue) => {
    props.onChange?.(dateValue)
  }

  return (
    <FormItem
      className={cls.dateField}
      label={props.label} 
      style={props.style}
    >
      <FormItem 
        name={props.name}
        rules={props.rules}
        initialValue={props.initialValue}
        noStyle
      >
        <DatePicker
          picker={props.pickerMode}
          value={props.value}
          placeholder={props.placeholder}
          onChange={handleChange}
          className={`${cls.datepicker} ${props.className}`}
        />
      </FormItem>
    </FormItem>
  )
}
