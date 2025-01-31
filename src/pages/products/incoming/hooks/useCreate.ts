import React from 'react'

import { ProductsIncoming } from '..'
import { ProductsIncomingTypes } from '../types'

function useCreate() {
  const [submitted, setSubmitted] = React.useState(false)

  const onFinish = React.useCallback(async (data:ProductsIncomingTypes.Table) => {
    setSubmitted(true)
    try {
      const dataToSend = {
        ...data,
      }

      const response = await ProductsIncoming.API.Create.createProduct(dataToSend)

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
