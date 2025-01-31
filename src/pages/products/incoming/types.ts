export interface ProductRecord {
    key: React.Key
    product: string
    project: string
    quantity: string
    status: string
    date: string
    actNumber: string
    supplier: string
    responsible: string
    comment: string
    imageUrl?: string
  }
export namespace ProductsIncomingTypes {
  export interface Table {
    id: number
    quantity: number
    date: number
    product: TableProduct
    project: number
    responsible: string
  }
  export interface Form {
    id: number
    quantity: number
    status: string
    act: string
    date: string
    supplier: string
    message: string
    product: string
    project: number
    responsible: string
  }
  export interface TableProduct {
    color: string
    image: string
    price: string
    purchase_price: string
    slug: string
    title: string
  }
}
