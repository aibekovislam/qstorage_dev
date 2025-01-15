import React from 'react'

import { InboxOutlined } from '@ant-design/icons'
import { Upload, message } from 'antd'
import { Rule } from 'antd/es/form'
import FormItem from 'antd/es/form/FormItem'
import { UploadProps } from 'antd/lib'

import cls from './dragger-file-field.module.css'

const { Dragger } = Upload

const DraggerProps: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  onChange(info) {
    const { status } = info.file

    if (status !== 'uploading') {
      console.log(info.file, info.fileList)
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`)
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`)
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files)
  },
}

interface Props extends UploadProps {
    rules?: Rule[],
    initialValue?: string
}

export const DraggerFileField: React.FC<Props> = (props) => {
  return (
    <FormItem
      className={cls.selectFileField}
      style={props.style}
      initialValue={props.initialValue}
      rules={props.rules}
      name={props.name}
    >
      <Dragger {...DraggerProps}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Выберите файл</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibited from uploading company data or other
          banned files.
        </p>
      </Dragger>
    </FormItem>
  )
}
