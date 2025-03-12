export namespace ProductsTypes {

  export interface Item {
    slug?: string;
    title?: string;
    price?: string;
    color?: Color[];
    description?: string;
    image?: string | null;
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
}
