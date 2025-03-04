import { Product } from "./product";

export interface Category {
  id: string;
  name: string;
  description?: string | null;
  image: string;
  products?: Product[];
  createdAt: string;
  updatedAt: string;
}
