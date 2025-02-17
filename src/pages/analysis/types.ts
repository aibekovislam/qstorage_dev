
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

export namespace AnalysisType {
    export interface AnalysisParams {
        type: string;
        interval: string;
        start_date: string;
        end_date: string;
    }

    export interface Item {
        type: string
        interval: string
        date_selected: string
        data: Record<string, number>
    }
}
