'use client'

import { Navbar } from '@/widgets/navbar';
import { SideBar } from '@/widgets/sidebar';
import { Layout } from 'antd';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

export const ManagerLayout: React.FC<Props> = ({ children }) => {
  return (
    <Layout>
      <Layout.Header>
        <Navbar />
      </Layout.Header>
      <Layout.Sider>
        <SideBar />
      </Layout.Sider>
      <Layout.Content>
        {children}
      </Layout.Content>
    </Layout>
  );
};
