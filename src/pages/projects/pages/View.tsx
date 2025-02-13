'use client'

import React from 'react'

import { Avatar, Breadcrumb, Button, Flex, Popover, Space, Tag, Typography, Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import dayjs from 'dayjs'
import Image from 'next/image'

import { NoPhoto } from '@/shared/assets/images/'

import { Projects } from '..'
import cls from '../styles/view.module.css'
import { ProjectsType } from '../types'

interface Props {
  project_id: number
}

const { Paragraph } = Typography

const createColumns = (checkStatus: any, getTagColor: any): ColumnsType<ProjectsType.Table> => {
  const columns: ColumnsType<ProjectsType.Table> = [
    {
      title: 'Приход / Уход',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Товар',
      dataIndex: 'product',
      key: 'product',
      render: (product: ProjectsType.Product) => (
        <Space>
          <Image
            src={product.image || NoPhoto.src}
            alt={product.title}
            style={{ objectFit: 'cover' }}
            width={50}
            height={40}
            className={cls.table_image}
          />
          <span>{product.title}</span>
        </Space>
      ),
    },
    {
      title: 'Проект',
      dataIndex: 'project',
      key: 'project',
      render: (project: ProjectsType.Item) => (
        <span>{project.title}</span>
      ),
    },
    {
      title: 'Кол-во',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Статус',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getTagColor(status)}>{checkStatus(status)}</Tag>
      ),
    },
    {
      title: 'Дата',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => {
        const formatted = dayjs(date).format('DD.MM.YYYY')

        return (
          <span>{formatted}</span>
        )
      },
    },
    {
      title: '№ Акта',
      dataIndex: 'act',
      key: 'act',
    },
    {
      title: 'Поставщик',
      dataIndex: 'supplier',
      key: 'supplier',
    },
    {
      title: 'Ответственный',
      dataIndex: 'responsible',
      key: 'responsible',
      render: (responsible: ProjectsType.Responsible) => (
        <Space>
          <Avatar>{responsible.image}</Avatar>
          <span>{responsible.first_name}</span>
        </Space>
      ),
    },
    {
      title: 'Комментарий',
      dataIndex: 'message',
      key: 'message',
      render: (comment: string) => {
        return (
          <Popover overlayClassName={cls.card} className={cls.custom__popover} content={comment}>
            <Paragraph>{!comment ? '' : `${comment.slice(0, 10)}...`}...</Paragraph>
          </Popover>
        )
      },
    },
  ]

  return columns
}

export const View: React.FC<Props> = (props) => {
  const {
    breadcrumbData,
    items,
    projectTitle,
    actions: {
      ProjectsOperationsGET,
      deleteProject,
      checkStatus,
      getTagColor,
    },
  } = Projects.Hooks.View.use()

  React.useEffect(() => {
    ProjectsOperationsGET(Number(props.project_id))
  }, [])

  return (
    <div className="main">
      <Flex className={cls.header}>
        <Breadcrumb items={breadcrumbData}/>
        <Flex className={cls.filter__panel}>
          <Button onClick={() => deleteProject(Number(props.project_id))} className={cls.btn}>
            Удалить
          </Button>
        </Flex>
      </Flex>
      <div className={cls.main_title}>
        <h2>Проект “{projectTitle}”</h2>
      </div>
      <Table<ProjectsType.Table>
        columns={createColumns(checkStatus, getTagColor)}
        dataSource={items}
        pagination={{ position: ['bottomRight'] }}
        rowKey={(record) => record.id}
        loading={!items}
        scroll={{ x: 'max-content' }}
      />
    </div>
  )
}
