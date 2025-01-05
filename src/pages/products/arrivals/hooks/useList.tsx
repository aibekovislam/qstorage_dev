'use client'

import React from 'react'

import type { Dayjs } from 'dayjs'

function useList() {
  const [yearValue, setYearValue] = React.useState<Dayjs | null>(null)
  const [monthValue, setMonthValue] = React.useState<Dayjs | null>(null)
  const [dayValue, setDayValue] = React.useState<Dayjs | null>(null)

  const handleChangeYearDatePicker = React.useCallback((newYear: Dayjs | null) => {
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
  }, [])

  const handleChangeMonthDatePicker = React.useCallback((newMonth: Dayjs | null) => {
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
        dayValue
          .year(newMonth.year())
          .month(newMonth.month()),
      )
    }
  }, [])

  const handleChangeDayDatePicker = React.useCallback((newDay: Dayjs | null) => {
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
  }, [])

  const breadcrumbData = [
    {
      href: '/',
      title: 'Главная',
    },
    {
      href: '/warehouse/1',
      title: 'Склад №1',
    },
    {
      href: '/products',
      title: 'Товары',
    },
    {
      href: '/products/arrival',
      title: 'Приход товаров',
    },
  ]

  return {
    // стэйты
    yearValue,
    monthValue,
    dayValue,
    // хэндлеры
    handleChangeYearDatePicker,
    handleChangeMonthDatePicker,
    handleChangeDayDatePicker,
    // остальное
    breadcrumbData,
  }
}

export const use = useList
