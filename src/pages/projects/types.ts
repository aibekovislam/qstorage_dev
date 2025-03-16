export namespace ProjectsType {
    export interface Item {
        id: number
        image: string
        title: string
        description: string
        color: string
        warehouse: number
    }
    export interface Warehouse {
        id: number
        title: string
        image: string | null
    }
    export interface Form {
        title: string
        description: string
        color: string
        warehouse: number
        image: string
    }

    export interface FormEdit {
        title: string
        description: string
        color: string
        warehouse: number
    }
    export interface TableItem {
        id: number;
        image: string;
        title: string;
        description: string;
        color: string;
        warehouse: number;
    }
}
