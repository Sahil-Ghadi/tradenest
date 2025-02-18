export interface Item{
    $id: string;
    name: string;
    buyerName: string;
    sellerName: string;
    price:number;
    status: "SOLD" | "UNSOLD" | "REQUESTED",
    $createdAt: string

}