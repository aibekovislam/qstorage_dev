'use client'

import React from 'react'
import { DatePicker } from 'antd'
import type { DatePickerProps } from 'antd'
import type { Dayjs } from 'dayjs'
import cls from  "./date-picker-field.module.css"
import FormItem from 'antd/es/form/FormItem'

interface CustomDatePickerProps extends Omit<DatePickerProps, 'picker'|'value'|'onChange'> {
  pickerMode?: 'year' | 'month' | 'date'
  value?: Dayjs | null
  onChange?: (value: Dayjs | null) => void
}

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  pickerMode = 'date', 
  value,
  onChange,
  ...restProps
}) => {
  const handleChange: DatePickerProps['onChange'] = (dateValue) => {
    onChange?.(dateValue)
  }

  return (
    <FormItem noStyle name={restProps.name}>
      <DatePicker
        picker={pickerMode}
        value={value}
        onChange={handleChange}
        className={cls.datepicker}
        {...restProps}
      />
    </FormItem>
  )
}
