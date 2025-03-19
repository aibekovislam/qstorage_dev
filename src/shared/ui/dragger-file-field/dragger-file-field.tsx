import React from 'react'

import { InboxOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import { UploadProps } from 'antd/lib'

import cls from './dragger-file-field.module.css'

const { Dragger } = Upload

function normFile(e: any) {
  if (Array.isArray(e)) {
    return e
  }

  return e?.fileList
}

interface Props extends UploadProps {
  rules?: Rule[],
  initialValue?: string,
  valuePropName?: string,
  label?: string
}

export const DraggerFileField: React.FC<Props> = (props) => {
  return (
    <FormItem
      name={props.name}
      valuePropName={props.valuePropName}
      className={cls.draggerField}
      label={props.label}
      getValueFromEvent={normFile}
    >
      <Dragger
        onChange={props.onChange}
        disabled={props.disabled}
        className={props.className}
        {...props}
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Выберите файл</p>
        <p className="ant-upload-hint">
          Тут можно загрузить один или несколько файлов
        </p>
      </Dragger>
    </FormItem>
  )
}
