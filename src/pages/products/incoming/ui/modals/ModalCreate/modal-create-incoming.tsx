'use client'

import React from 'react'

import { Button, Divider, Flex, Form, Modal } from 'antd'
import Image from 'next/image'

import { AutoCompleteField } from '@/shared/ui/autocomplete-field/autocomplete-field'
import { SelectField } from '@/shared/ui/select-field/select-field'
import { DraggerFileField } from '@/shared/ui/select-file-field/dragger-file-field'
import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductsIncoming } from '../../..'
import { InputRules } from '../../../validate'

import cls from './modal-create.module.css'

interface Props {
  isModalOpen: boolean
  onCloseModal: () => void
}

const ModalCreateIncoming = ({ isModalOpen, onCloseModal }: Props) => {
  const {
    products,
    project,
    userResponsible,
    totalCost,
    submitted,
    form,
    isLoadingProducts,
    isCreated,
    isNewProductMode,
    isResponsibleDisabled,
    isProductSelected,
    actions: {
      fetchProducts,
      setIsNewProductMode,
      setIsProductSelected,
      handleSelectProduct,
      handleChangeProduct,
      handleProjectChange,
      handleFormValuesChange,
      handleDraggerChange,
      ProductsIncomingProjectGET,
      createIncoming,
    },
  } = ProductsIncoming.Hooks.List.use()

  React.useEffect(() => {
    if (isCreated) {
      onCloseModal()
    }
  }, [isCreated, onCloseModal])

  React.useEffect(() => {
    if (products?.length === 0) {
      setIsNewProductMode(true)
      setIsProductSelected(true)
      ProductsIncomingProjectGET()
    }
  }, [products])

  return (
    <Modal
      className={cls.modal}
      title="Создать приход"
      width="800px"
      open={isModalOpen}
      centered
      onCancel={onCloseModal}
      okButtonProps={{ style: { display: 'none' } }}
      footer={[
        <Button disabled={submitted} onClick={onCloseModal} key="back">Отмена</Button>,
        <Button
          form="createIncoming"
          htmlType="submit"
          type="primary"
          key="submit"
          loading={submitted}
        >
          Создать
        </Button>,
      ]}
    >
      <Divider className={cls.divider} />
      <Form
        id="createIncoming"
        form={form}
        className={cls.form}
        onFinish={createIncoming}
        onValuesChange={handleFormValuesChange}
      >
        <AutoCompleteField
          name="product"
          label="Наименование продукта:"
          placeholder="Введите наименование продукта"
          className={cls.form__item}
          options={products?.map(item => ({
            value: item.title,
            label: (
              <Flex align="center" gap={8}>
                <Image
                  width={40}
                  height={40}
                  src={item.image}
                  alt={item.title}
                  style={{ objectFit: 'cover' }}
                  unoptimized
                />
                <span>{item.title}</span>
              </Flex>
            ),
            productObj: item,
          }))}
          onSearch={fetchProducts}
          rules={InputRules.Field}
          onChange={handleChangeProduct}
          onSelect={handleSelectProduct}
          filterOption={false}
          isLoadingProducts={isLoadingProducts}
        />
        <TextField
          name="act"
          type="text"
          label="Номер документа:"
          placeholder="Введите номер"
          className={cls.form__item}
          rules={InputRules.DocumentNumber}
          disabled={!isProductSelected}
        />
        <TextField
          name="quantity"
          type="text"
          label="Количество:"
          placeholder="Введите количество"
          className={cls.form__item}
          rules={InputRules.Number}
          disabled={!isProductSelected}
        />
        <TextField
          name="purchase_price"
          type="text"
          label="Цена за закупку:"
          placeholder="Введите цену за одну закупку"
          className={cls.form__item}
          disabled={!isNewProductMode}
        />
        <TextField
          type="text"
          label="Общая стоимость:"
          placeholder="Общая стоимость"
          className={cls.form__item}
          disabled={!isNewProductMode}
          value={totalCost}
        />
        <TextField
          name="supplier"
          type="text"
          label="Поставщик:"
          placeholder="Введите поставщика"
          className={cls.form__item}
          rules={InputRules.Field}
          disabled={!isProductSelected}
        />
        <TextField
          name="message"
          type="text"
          label="Комментарий"
          placeholder="Введите комментарий для прихода"
          className={cls.form__item}
          rules={InputRules.Field}
          disabled={!isProductSelected}
        />
        <SelectField
          name="project"
          className={cls.form__item}
          placeholder="Выберите проект"
          label="Проект:"
          options={project?.map(project => ({
            label: project.title,
            value: project.id,
          }))}
          onChange={handleProjectChange}
          rules={InputRules.Field}
          disabled={!isProductSelected}
        />
        <SelectField
          name="responsible"
          className={cls.form__item}
          placeholder="Выберите ответственного"
          label="Ответственный:"
          options={userResponsible?.map(responsible => ({
            title: responsible.first_name,
            value: responsible.first_name,
            userObj: responsible,
          }))}
          rules={InputRules.Field}
          disabled={!isResponsibleDisabled}
        />
        <DraggerFileField
          name="files"
          valuePropName="fileList"
          className={cls.dragger_filed}
          disabled={!isProductSelected}
          onChange={handleDraggerChange}
        />
      </Form>
    </Modal>
  )
}

export default ModalCreateIncoming
