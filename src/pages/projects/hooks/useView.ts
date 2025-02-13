'use client'

import React from 'react'

import { useRouter, useSearchParams } from 'next/navigation'

import { Projects } from '..'
import { ProjectsType } from '../types'

function useView() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const projectTitle = String(searchParams?.get('title') || 'Название проекта')
  const [items, setItems] = React.useState<ProjectsType.Table[] | undefined>(undefined)

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/projects', title: 'Проекты' },
    { href: '#', title: projectTitle },
  ]

  const ProjectsOperationsGET = React.useCallback(async (id: number) => {
    try {
      const response = await Projects.API.View.getProjectsOperationsById(id)

      setItems(response.data)
    } catch (error) {
      console.log('products by id projects', error)
    }
  }, [])

  const deleteProject = (async (id: number) => {
    try {
      await Projects.API.View.deleteProject(id)

      router.push('/projects')
    } catch (error) {
      console.log('projects delete request error', error)
    }
  })

  const checkStatus = React.useCallback((status: string): string => {
    const statusMap: Record<string, string> = {
      in_progress: 'В ПРОЦЕССЕ',
      verified: 'ПРОВЕРЕНО',
      new: 'НОВОЕ',
      rejected: 'ОТКЛОНЕНО',
      not_verified: 'НЕ ПРОВЕРЕНО',
    }

    return statusMap[status] || 'НЕИЗВЕСТНЫЙ СТАТУС'
  }, [])

  const getTagColor = React.useCallback((status: string): string => {
    const colorMap: Record<string, string> = {
      in_progress: 'gold',
      verified: 'green',
      new: 'geekblue',
      rejected: 'red',
      not_verified: 'gray',
    }

    return colorMap[status] || 'default'
  }, [])

  return {
    breadcrumbData,
    items,
    projectTitle,
    actions: {
      ProjectsOperationsGET,
      deleteProject,
      checkStatus,
      getTagColor,
    },
  }
}

export const use = useView
