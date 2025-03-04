export namespace ProductsIncomingTypes {
  export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Table[];
  }
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
    warehouse: number
  }

  export interface Item {
    id: number;
    files: any[];
    quantity: number;
    purchase_price?: string | null;
    status?: string | null;
    act?: string | null;
    date: string;
    supplier?: string | null;
    message?: string | null;
    barcode?: string | null;
    product?: Product;
    project?: number | null;
    responsible?: string | null;
  }
}
