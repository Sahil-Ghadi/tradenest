export interface Request {
  id: string;
  Itemname: string;
  itemId: string;
  buyerName: string;
  sellerId: string;
  status: "PENDING" | "APPROVE" | "REJECT";
  price:number;
  //createdAt: string;
}
