
export namespace StockType {
    export interface ApiResponse {
        count: number;
        next: string | null;
        previous: string | null;
        results: Table[];
        total_stock: number
    }
    export interface Table {
        slug: string
        title: string;
        price: string;
        image: string
        total_purchase: number
    }
}
