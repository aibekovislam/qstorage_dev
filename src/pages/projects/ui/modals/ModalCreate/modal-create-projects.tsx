import React from 'react'

import { Divider, Form, Modal } from 'antd'

import { ColorPickerField } from '@/shared/ui/color-picker-field/color-picker-field'
import { DraggerFileField } from '@/shared/ui/select-file-field/dragger-file-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import cls from './modal-create-projects.module.css'

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const ModalCreateProjects = ({ isModalOpen, onCloseModal }: Props) => {
  return (
    <Modal
      className={cls.modal}
      classNames={{ header: cls.modal__header, body: cls.modal__body, footer: cls.modal__footer }}
      title="Добавить проект"
      width={'800px'}
      okButtonProps={{ style: { backgroundColor: 'primary' } }}
      okText={'Создать'}
      onOk={() => {
        onCloseModal()
      }}
      open={isModalOpen}
      centered={true}
      onCancel={() => {
        onCloseModal()
      }}
    >
      <Divider className={cls.divider}/>
      <Form className={cls.form}>
        <TextField
          name="product_title"
          type="text"
          label="Название проекта"
          placeholder="Введите название проекта"
          className={cls.form__item}
        />
        <TextField
          name="product_title"
          type="text"
          label="Описание"
          placeholder="Введите описание"
          className={cls.form__item}
        />
        <ColorPickerField
          name="color"
          label="Выберите цвет"
          initialValue="#FA541C"
        />
        <DraggerFileField />
      </Form>
    </Modal>
  )
}

export default ModalCreateProjects
