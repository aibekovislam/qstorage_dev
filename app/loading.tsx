import React from 'react'

import { Flex, Spin } from 'antd'

export default function Loader() {
  return (
    <Flex justify="center" align="center" style={{ width: '100%', height: '100%' }}>
      <Spin size="large" />
    </Flex>
  )
}
