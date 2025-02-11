import React from 'react'

import { InboxOutlined } from '@ant-design/icons'
import { Upload } from 'antd'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import { UploadProps } from 'antd/lib'

const { Dragger } = Upload

const DraggerProps: UploadProps = {
  name: 'files',
  maxCount: 10,
  multiple: true,
  beforeUpload(file) {
    if (file.size / 1024 / 1024 > 10) {
      // TODO после того как код восседеним нужно поменять на message
      console.log(`Файл "${file.name}" больше 10 МБ!`)

      return Upload.LIST_IGNORE
    }

    return false
  },
}

function normFile(e: any) {
  if (Array.isArray(e)) {
    return e
  }

  return e?.fileList
}

interface Props extends UploadProps {
  rules?: Rule[],
  initialValue?: string,
  valuePropName?: string
}

export const DraggerFileField: React.FC<Props> = (props) => {
  return (
    <FormItem
      name={props.name}
      valuePropName={props.valuePropName}
      getValueFromEvent={normFile}
    >
      <Dragger
        onChange={props.onChange}
        disabled={props.disabled}
        className={props.className}
        {...DraggerProps}
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
