
export namespace StockType {
    export interface Product {
        slug: string;
        title: string;
        stock: number;
        image: string
    }

    export interface ApiResponse {
        count: number;
        next: string | null;
        previous: string | null;
        results: {
            total_stock: number;
            products: Product[];
        };
    }
}
