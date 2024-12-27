'use client'

import React from 'react'

import { Button, Flex, Form } from 'antd'
import Link from 'next/link'

import { AuthIcon } from '@/shared/assets/icons'
import { TextField } from '@/shared/ui/textfield/textfield'

import cls from '../styles/view.module.css'

export const View = () => {
  return (
    <Flex align="center" justify="space-between">
      <Flex className={cls.auth} justify="center" align="center">
        <h1 className={cls.auth_title}>Склад №1</h1>

        <Form className={cls.form}>
          <Flex className={cls.form_flex} justify="center" align="center">
            <h2 className={cls.auth_form_title}>Вход</h2>

            <Flex className={cls.form__items} gap={24}>
              <TextField
                name="email"
                type="email"
                placeholder="Имя пользователя/почта"
              />

              <TextField
                name="password"
                type="password"
                placeholder="Пароль"
              />

              <Flex justify="flex-end">
                <Link href={'/forgot-password/'}>
                  <span className={cls.forgot_password}>Забыли пароль</span>
                </Link>
              </Flex>

              <Button type="primary">Вход</Button>
            </Flex>
          </Flex>
        </Form>
      </Flex>

      <Flex className={cls.auth_image} justify="center" align="center">
        <AuthIcon/>
      </Flex>
    </Flex>
  )
}
