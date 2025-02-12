export interface Request {
  id: string;
  name: string;
  buyerName: string;
  sellerId: string;
  status: "PENDING" | "APPROVE" | "REJECT";
  //createdAt: string;
}
