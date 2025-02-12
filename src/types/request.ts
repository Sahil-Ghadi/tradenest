export interface Request {
  id: string;
  name: string;
  email: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}
