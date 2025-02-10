'use client'

import React from 'react'

import { Button, Flex, Form } from 'antd'

import { TextField } from '@/shared/ui/textfield/textfield'

import { ProductItems } from '..'
import cls from '../styles/create.module.css'
import { ProductRules } from '../validate'

export const Create = () => {
  const { submitted, actions: { createProduct, ProductItemsCategoreisGET } } = ProductItems.Hooks.Create.use()

  React.useCallback(() => {
    ProductItemsCategoreisGET()
  }, [ProductItemsCategoreisGET])

  return (
    <Form onFinish={createProduct}  className={cls.form}>
      <TextField
        name="title"
        type="text"
        label="Наименование продукта"
        placeholder="Введите наименование продукта"
        className={cls.form__item}
        rules={ProductRules.Title}
      />
      <TextField
        name="price"
        type="number"
        label="Цена за единицу:"
        placeholder="Введите цену за единицу"
        className={cls.form__item}
        rules={ProductRules.Price}
      />
      <Flex className={cls.btn_container} justify={'end'}>
        <Button htmlType="submit" type="primary" loading={submitted}>Создать продукт</Button>
      </Flex>
    </Form>
  )
}
