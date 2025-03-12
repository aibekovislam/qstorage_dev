export namespace ProductsTypes {
  export interface Item {
    slug?: string
    title: string
    price: string
    color?: {
      id: number
      name: string
      hash_code: string
    }
    image?: string | null
    expiration_date?: string
    characteristics?: string
    barcode?: string
    warehouse?: number
  }
  export interface ItemCategories {
    slug: string
    title: string
  }
}
