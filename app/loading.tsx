import React from 'react'

import { Flex, Spin } from 'antd'

export default function Loader() {
  return (
    <Flex justify="center" align="center" style={{ width: '100%', height: '100vh' }}>
      <Spin size="large" />
      <h3 style={{ fontWeight: '500', marginTop: 15 }}>Загрузка</h3>
    </Flex>
  )
}
