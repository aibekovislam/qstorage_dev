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

export namespace ProductsOutgoingTypes {
    export interface Item {
      id: number
      quantity: number
      date: number
      product: string
      project: number
      responsible: string
    }
  }
