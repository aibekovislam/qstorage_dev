export namespace ProductsTypes {
  export interface Item {
    slug?: string
    title: string
    price: string
    color?: string
    image?: string | null
  }
  export interface ItemCategories {
    slug: string
    title: string
  }
}
