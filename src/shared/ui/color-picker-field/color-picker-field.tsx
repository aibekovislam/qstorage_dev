'use client'

import React, { useState } from 'react'

import { Form, FormItemProps } from 'antd'
import { Rule } from 'antd/es/form'

import cls from './color-picker-field.module.css'

interface Props extends FormItemProps {
  label?: string
  rules?: Rule[]
  initialValue?: string
  name?: string
}

const COLOR_OPTIONS = [
  '#FA541C',
  '#1890FF',
  '#F5222D',
  '#52C41A',
  '#722ED1',
  '#13C2C2',
  '#EB2F96',
  '#8B4513',
]

export const ColorPickerField: React.FC<Props> = (props) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    props.initialValue || COLOR_OPTIONS[0],
  )

  const handleClickColor = (color: string) => {
    setSelectedColor(color)
    console.log('Выбранный цвет:', color)
  }

  return (
    <Form.Item
      label={props.label}
      name={props.name}
      rules={props.rules}
      initialValue={props.initialValue}
    >
      <div className={cls.wrapper}>
        {COLOR_OPTIONS.map((color) => (
          <div
            key={color}
            className={cls.colorSquare}
            style={{
              backgroundColor: color,
              border: selectedColor === color ? '1.5px solid black' : '1px solid #ddd',
            }}
            onClick={() => handleClickColor(color)}
          />
        ))}
      </div>
    </Form.Item>
  )
}
