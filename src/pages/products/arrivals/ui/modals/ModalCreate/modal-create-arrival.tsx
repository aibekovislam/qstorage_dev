import React from 'react'

import { Divider, Form, Modal } from 'antd'

import { DatePickerField } from '@/shared/ui/date-picker-field/date-picker-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { SelectFileField } from '@/shared/ui/select-file-filed/select-file-filed'
import { TextField } from '@/shared/ui/textfield/textfield'

import cls from './modal-create.module.css'

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const ModalCreateArrival = ({ isModalOpen, onCloseModal }: Props) => {
  return (
    <Modal
      className={cls.modal}
      classNames={{ header: cls.modal__header, body: cls.modal__body, footer: cls.modal__footer }}
      title="Создать приход"
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
          label="Наименование товара:"
          placeholder="Введите наименование товара"
          className={cls.form__item}
        />
        <DatePickerField
          name="date"
          pickerMode="date"
          placeholder="год / месяц / день"
          className={cls.form__item}
          label="Дата прихода:"
        />
        <TextField
          name="document_number"
          type="text"
          label="Номер документа:"
          placeholder="Введите номер"
          className={cls.form__item}
        />
        <TextField
          name="quantity"
          type="number"
          label="Количество:"
          placeholder="Введите количество"
          className={cls.form__item}
        />
        <TextField
          name="price_per_unit"
          type="number"
          label="Цена за единицу:"
          placeholder="Введите цену за единицу"
          className={cls.form__item}
        />
        <TextField
          name="total_cost"
          type="number"
          label="Общая стоимость:"
          placeholder="Введите общую стоимость товара"
          className={cls.form__item}
        />
        <SelectField
          name="responsibility"
          className={cls.form__item}
          placeholder="Выберите ответственного"
          label="Ответственный:"
          options={[{ value: 'islam', label: 'Islam' }, { value: 'baika', label: 'Baika' }]}
        />
        <SelectField
          name="project"
          className={cls.form__item}
          placeholder="Выберите проект"
          label="Проект:"
          options={[{ value: 'menu', label: 'Michelle' }, { value: 'market_place', label: 'Lalafo' }]}
        />
        <SelectFileField />
      </Form>
    </Modal>
  )
}

export default ModalCreateArrival
