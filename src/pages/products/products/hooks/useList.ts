'use client'

function useList() {

  const breadcrumbData = [
    { href: '/', title: 'Главная' },
    { href: '/products/products', title: 'Товары' },
  ]

  return {
    breadcrumbData,
  }
}

export const use = useList
