export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  originalPrice: number;
  images: string[];
  category: string;
  gender: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  createdAt: Date;
  updatedAt: Date;
}
