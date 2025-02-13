export interface Item{
    id: string;
    name: string;
    buyerName: string;
    sellerId: string;
    price:number;
    status: "SOLD" | "UNSOLD"
}