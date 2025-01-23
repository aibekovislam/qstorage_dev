'use client'

import React from 'react'

import { Area, AreaChart, Tooltip } from 'recharts'

import cls from './area-charts.module.css'

const data = [
  { name: 'Day 1', uv: 8 },
  { name: 'Day 2', uv: 12 },
  { name: 'Day 3', uv: 9 },
  { name: 'Day 4', uv: 15 },
  { name: 'Day 5', uv: 10 },
  { name: 'Day 6', uv: 14 },
  { name: 'Day 7', uv: 7 },
  { name: 'Day 8', uv: 16 },
  { name: 'Day 9', uv: 11 },
  { name: 'Day 10', uv: 17 },
]

export const AreaCharts = () => {
  return (
    <AreaChart
      width={200}
      height={60}
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
      className={cls.area_chart}
    >
      <Tooltip />
      <Area type="monotone" dataKey="uv" stroke="#825dd3" fill="#825dd3" />
    </AreaChart>
  )
}
