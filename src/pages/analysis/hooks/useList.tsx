'use client'
import React from 'react'

import { Dayjs } from 'dayjs'

function useList() {
  const [yearValue, setYearValue] = React.useState<Dayjs | null>(null)
  const [monthValue, setMonthValue] = React.useState<Dayjs | null>(null)
  const [dayValue, setDayValue] = React.useState<Dayjs | null>(null)
  const handleChangeYearDatePicker = React.useCallback((newYear: Dayjs | null) => {
    if (!newYear) {
      setYearValue(null)
      setMonthValue(null)
      setDayValue(null)

      return
    }

    setYearValue(newYear)
    setMonthValue(prev => (prev ? prev.year(newYear.year()) : newYear))
    setDayValue(prev => (prev ? prev.year(newYear.year()) : newYear))
  }, [])

  const handleChangeMonthDatePicker = React.useCallback((newMonth: Dayjs | null) => {
    if (!newMonth) {
      setMonthValue(null)
      setDayValue(null)

      return
    }

    setMonthValue(newMonth)
    setYearValue(prev => (prev ? prev.year(newMonth.year()) : newMonth))
    setDayValue(prev => {
      if (!prev) {
        return newMonth.date(1)
      }

      return prev.year(newMonth.year()).month(newMonth.month())
    })
  }, [])

  const handleChangeDayDatePicker = React.useCallback((newDay: Dayjs | null) => {
    setDayValue(newDay)

    if (!newDay) {
      return
    }

    setYearValue(prev => (prev ? prev.year(newDay.year()) : newDay))
    setMonthValue(prev => (prev ? prev.year(newDay.year()).month(newDay.month()) : newDay))
  }, [])

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/analysis', title: 'Анализы' },
  ]

  return {
    breadcrumbData,
    yearValue,
    monthValue,
    dayValue,
    actions: {
      handleChangeYearDatePicker,
      handleChangeMonthDatePicker,
      handleChangeDayDatePicker,
    },
  }
}

export const use = useList
