'use client'

import React, { useState } from 'react'

import { DatePicker, Space } from 'antd'
import { Dayjs } from 'dayjs'

import cls from './date-picker-field.module.css'

import type { DatePickerProps } from 'antd'

export const DatePrickerField = () => {
  const [date, setDate] = useState<Dayjs | null>(null)

  const handleYearChange: DatePickerProps['onChange'] = (value) => {
    if (!value) {
      setDate(null)

      return
    }
    if (date) {
      const newDate = date.year(value.year())

      setDate(newDate)
    } else {
      setDate(value)
    }
  }

  const handleMonthChange: DatePickerProps['onChange'] = (value) => {
    if (!value) {
      setDate(null)

      return
    }
    if (date) {
      const newDate = date.year(value.year()).month(value.month())

      setDate(newDate)
    } else {
      setDate(value)
    }
  }

  const handleDayChange: DatePickerProps['onChange'] = (value) => {
    setDate(value)
  }

  return (
    <Space size={4} className={cls.datePickerContainer}>
      <DatePicker
        picker="year"
        value={date}
        onChange={handleYearChange}
        placeholder="Год"
      />

      <DatePicker
        picker="month"
        value={date}
        onChange={handleMonthChange}
        placeholder="Месяц"
      />

      <DatePicker
        value={date}
        onChange={handleDayChange}
        placeholder="День"
      />
    </Space>
  )
}
