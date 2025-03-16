export namespace ProductsTypes {

  export interface Item {
    slug?: string
    title: string
    price: string
    color?: Color[]
    image?: string | null
    expiration_date?: string
    characteristics?: string
    barcode?: string
    warehouse?: number
  }

  export interface Table {
    slug?: string
    title: string
    price: string
    color?: Color[]
    image?: string | null
    expiration_date?: string
    characteristics?: string
    barcode?: string
    warehouse?: number
    purchase_price?: number
    quantity?: number
  }

  export interface Form {
    title: string
    price: string
    color: Color
    expiration_date?: string
    characteristics?: string
    warehouse?: number
  }

  export interface Color {
    id: number;
    name: string;
    hash_code: string;
  }

  export interface ItemDetail {
    slug: string;
    title: string;
    price: string;
    color: Color[];
    description: string;
    expiration_date: string;
    characteristics: string;
    image?: string | null;
    barcode: string;
    warehouse: number;
  }

  export interface ItemCategories {
    slug: string;
    title: string;
  }

  export interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Item[];
  }
}
