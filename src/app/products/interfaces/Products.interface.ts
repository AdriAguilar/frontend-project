export interface Product {
    id:          number;
    name:        string;
    description: string;
    price:       string;
    quantity:    number;
    stock:       number;
    images?:      string;
    category_id: number;
    user_id:     number;
    created_at?:  Date;
    updated_at?:  Date;
}
