'use client'

import React from 'react'

import { DatePicker } from 'antd'
import FormItem from 'antd/es/form/FormItem'

import cls from  './date-picker-field.module.css'

import type { DatePickerProps } from 'antd'
import type { Dayjs } from 'dayjs'

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
