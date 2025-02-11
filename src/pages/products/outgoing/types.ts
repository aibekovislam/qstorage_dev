export namespace ProductsOutgoingTypes {
  export interface Table {
    id: number
    quantity: number
    date: number
    product: Product
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
  export interface Product {
    color: string
    image: string
    price: string
    purchase_price: string
    slug: string
    title: string
  }
  export interface Responsible {
    email: string
    first_name: string
    last_name: string
    surname: string
    uuid: string
    image: string
  }
  export interface Project {
    id: number
    image: string
    title: string
    description: string
    color: string
  }
}
