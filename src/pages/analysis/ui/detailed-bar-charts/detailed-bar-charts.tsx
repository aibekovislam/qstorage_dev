import React from 'react'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

import cls from './detailed-bar-charts.module.css'

interface DetailedBarChartsProps {
  analysis?: {
    data: { [key: string]: number }
    interval: string
    type: string
  } | null
}

export const DetailedBarCharts: React.FC<DetailedBarChartsProps> = ({ analysis }) => {
  const chartData =
    analysis && analysis.data
      // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
      ? Object.entries(analysis.data).map(([_, value]) => ({
        name: analysis.type,
        sales: value,
      }))
      : []

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
        className={cls.barChart}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="#1677ff" />
      </BarChart>
    </ResponsiveContainer>
  )
}
