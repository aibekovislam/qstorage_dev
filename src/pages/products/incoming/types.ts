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
    files: File
    quantity: string
    purchase_price: string
    supplier: string
    message: string
    product: string
    project: number
    responsible: string | undefined
    act: string
    total_cost: number
  }
  export interface TableProduct {
    color: string
    image: string
    price: string
    purchase_price: string
    slug: string
    title: string
  }
  export interface TableResponsible {
    email: string
    first_name: string
    last_name: string
    surname: string
    uuid: string
    image: string
  }
  export interface TableProject {
    id: number
    image: string
    title: string
    description: string
    color: string
  }
}
