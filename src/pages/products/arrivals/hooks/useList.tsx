'use client'

import React from 'react'

import { Dayjs } from 'dayjs'

function useList() {
  const [yearValue, setYearValue] = React.useState<Dayjs | null>(null)
  const [monthValue, setMonthValue] = React.useState<Dayjs | null>(null)
  const [dayValue, setDayValue] = React.useState<Dayjs | null>(null)

  const handleChangeYearDatePicker = React.useCallback(
    (newYear: Dayjs | null) => {
      setYearValue(newYear)
      if (!newYear) {
        setMonthValue(null)
        setDayValue(null)

        return
      }
      if (monthValue) {
        setMonthValue(monthValue.year(newYear.year()))
      }
      if (dayValue) {
        setDayValue(dayValue.year(newYear.year()))
      }
    },
    [monthValue, dayValue],
  )

  const handleChangeMonthDatePicker = React.useCallback(
    (newMonth: Dayjs | null) => {
      setMonthValue(newMonth)
      if (!newMonth) {
        setDayValue(null)

        return
      }
      if (!yearValue) {
        setYearValue(newMonth)
      } else {
        setYearValue(yearValue.year(newMonth.year()))
      }
      if (dayValue) {
        setDayValue(
          dayValue.year(newMonth.year()).month(newMonth.month()),
        )
      }
    },
    [yearValue, dayValue],
  )

  const handleChangeDayDatePicker = React.useCallback(
    (newDay: Dayjs | null) => {
      setDayValue(newDay)
      if (!newDay) {
        return
      }
      if (!yearValue) {
        setYearValue(newDay)
      } else {
        setYearValue(yearValue.year(newDay.year()))
      }
      if (!monthValue) {
        setMonthValue(newDay)
      } else {
        setMonthValue(
          monthValue
            .year(newDay.year())
            .month(newDay.month()),
        )
      }
    },
    [yearValue, monthValue],
  )

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/warehouse/1', title: 'Склад №1' },
    { href: '/products', title: 'Товары' },
    { href: '/products/arrival', title: 'Приход товаров' },
  ]

  return {
    yearValue,
    monthValue,
    dayValue,
    breadcrumbData,
    actions: {
      handleChangeYearDatePicker,
      handleChangeMonthDatePicker,
      handleChangeDayDatePicker,
    },
  }
}

export const use = useList
