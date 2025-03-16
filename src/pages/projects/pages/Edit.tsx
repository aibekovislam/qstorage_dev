'use client'

import React from 'react'

import { Breadcrumb, Button, Flex, Form } from 'antd'

import { LoaderData } from '@/shared/ui/loader/Loader'
import { TextField } from '@/shared/ui/textfield/textfield'

import { Projects } from '..'
import cls from '../styles/edit.module.css'

interface Props {
  project_id: string
}

export const Edit: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    items,
    submitted,
    form,
    isProjectsLoading,
    contextHolder,
    projectTitle,
    actions: { ProjectsIDGET, EditProject },
  } = Projects.Hooks.Edit.use()

  React.useEffect(() => {
    ProjectsIDGET(Number(props.project_id))
  }, [props.project_id, ProjectsIDGET])

  return (
    <div className="main">
      {contextHolder}
      <Flex className={cls.header}>
        <Breadcrumb items={breadcrumbData} />
      </Flex>

      <Flex className={cls.main_title}>
        <h2>Изменить проект “{projectTitle}”</h2>
      </Flex>

      <LoaderData isLoading={isProjectsLoading} data={items}>
        <div className={cls.main_form}>
          <Form
            form={form}
            className={cls.Form}
            initialValues={{ ...items }}
            onFinish={(data) => EditProject(props.project_id, data)}
          >
            <TextField
              name="title"
              placeholder="Введите название проекта"
              label="Название проекта"
            />
            <TextField
              name="description"
              placeholder="Введите описание проекта"
              label="Описание проекта"
            />
            <TextField
              name="color"
              placeholder="Введите цвет проекта"
              label="Цвет проекта"
            />

            <Button
              htmlType="submit"
              type="primary"
              className={cls.btn}
              loading={submitted}
            >
              Сохранить
            </Button>
          </Form>
        </div>
      </LoaderData>
    </div>
  )
}
