export interface StorageRequestsResponse {
  incomings: ProductRecord[];
  outgoings: ProductRecord[];
}

export interface ProductRecord {
  id: number;
  files: any[];
  quantity: number;
  purchase_price: string;
  status: string | null;
  act: string;
  date: string;
  supplier: string;
  message: string | null;
  type?: 'incoming' | 'outgoing'; 

  barcode: string | null;
  product: {
    slug: string;
    title: string;
    category: string | null;
    price: string;
    color: string | null;
    image: string | null;
  };
  project: {
    id: number;
    image: string;
    title: string;
    description: string;
    color: string;
  };
  responsible: {
    uuid: string;
    avatar: string | null;
    first_name: string;
    last_name: string;
    surname: string;
    email: string;
  };
}