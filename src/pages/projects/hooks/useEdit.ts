'use client'

import React from 'react'

import { Form, notification } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useEdit() {
  const [form] = Form.useForm()
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectTitle = String(searchParams?.get('title') || 'Название проекта')
  const [submitted, setSubmitted] = React.useState(false)
  const [items, setItems] = React.useState<ProjectsType.TableItem | undefined>(undefined)
  const [isProjectsLoading, setIsProjectsLoading] = React.useState(true)
  const [api, contextHolder] = notification.useNotification()

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/projects', title: 'Проекты' },
    { href: '/', title: projectTitle },
    { href: '#', title: 'Изменить' },
  ]

  const ProjectsIDGET = React.useCallback(async (id: number) => {
    try {
      const response = await Projects.API.View.getProjectsById(id)

      setItems(response.data)
    } catch (error) {
      console.log('products by id projects', error)
    } finally {
      setIsProjectsLoading(false)
    }
  }, [])

  const EditProject = React.useCallback(async (id: string, data: ProjectsType.FormEdit) => {
    setSubmitted(true)

    try {
      const response = await Projects.API.Edit.editProject(id, data)

      if (response.status === 200) {
        api.success({
          message: 'Проект успешно был изменён',
          placement: 'top',
        })
        router.push(`/projects/${id}`)
      } else {
        api.error({
          message: 'Что-то пошло не так',
          placement: 'top',
        })
      }
    } catch (error) {
      console.log('error edit employee', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  return {
    breadcrumbData,
    items,
    isProjectsLoading,
    form,
    contextHolder,
    submitted,
    projectTitle,
    actions: {
      router,
      ProjectsIDGET,
      EditProject,
    },
  }
}

export const use = useEdit
