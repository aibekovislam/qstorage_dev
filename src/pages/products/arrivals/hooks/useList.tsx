const useList = () => {
  const breadcrumbData = [
    {
      href: '/',
      title: 'Главная',
    },
    {
      href: '/warehouse/1',
      title: 'Склад №1',
    },
    {
      href: '/products',
      title: 'Товары',
    },
    {
      href: '/products/arrival',
      title: 'Приход товаров',
    },
  ]

  return {
    breadcrumbData,
  }
}

export const use = useList
