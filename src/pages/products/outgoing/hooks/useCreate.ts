import React from 'react'

import { ProductsOutgoing } from '..'
import { ProductsOutgoingTypes } from '../types'

function useCreate() {
  const [submitted, setSubmitted] = React.useState(false)

  const onFinish = React.useCallback(async (data:ProductsOutgoingTypes.Table) => {
    setSubmitted(true)
    try {
      const dataToSend = {
        ...data,
      }

      const response = await ProductsOutgoing.API.Create.createProduct(dataToSend)

      if (!(response.status === 200)) {
        throw new Error(`Submission failed: ${response.statusText}`)
      }
    } catch (error) {
      console.error('create product error:', error)
    } finally {
      setSubmitted(false)
    }
  }, [])

  return {
    submitted,
    actions: {
      onFinish,
    },
  }
}

export const use = useCreate
