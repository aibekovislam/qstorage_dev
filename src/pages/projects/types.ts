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

export namespace ProjectsType {
    export interface Item {
        id: number
        image: string
        title: string
        description: string
        color: string
        warehouse: number
    }
    export interface Products {
        slug?: string
        title: string
        price: string
        color?: string
        image?: string | null
    }
    export interface Warehouse {
        id: number
        title: string
    }
    export interface Form {
        title: string
        description: string
        color: string
        warehouse: number
        image: any
    }
    export interface Table {
        id: number
        quantity: number
        date: number
        product: Product
        project: number
        responsible: string
    }
    export interface Responsible {
        email: string
        first_name: string
        last_name: string
        surname: string
        uuid: string
        image: string
    }
    export interface Product {
        color: string
        image: string
        price: string
        purchase_price: string
        slug: string
        title: string
    }
}
