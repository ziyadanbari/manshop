export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  gender: string;
  sizes: string[];
  colors: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Classic White Sneakers",
    price: 89.99,
    originalPrice: 120.0,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shoes",
    gender: "Unisex",
    sizes: ["7", "8", "9", "10", "11"],
    colors: ["White", "Black"],
    rating: 4.5,
    reviews: 128,
    inStock: true,
  },
  {
    id: 2,
    name: "Premium Denim Jacket",
    price: 159.99,
    originalPrice: 199.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Jackets",
    gender: "Men",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Blue", "Black"],
    rating: 4.8,
    reviews: 89,
    inStock: true,
  },
  {
    id: 3,
    name: "Elegant Summer Dress",
    price: 79.99,
    originalPrice: 99.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Dresses",
    gender: "Women",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Pink", "Blue", "White"],
    rating: 4.6,
    reviews: 156,
    inStock: true,
  },
  {
    id: 4,
    name: "Casual Cotton T-Shirt",
    price: 24.99,
    originalPrice: 34.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "T-Shirts",
    gender: "Unisex",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["White", "Black", "Gray", "Navy"],
    rating: 4.3,
    reviews: 234,
    inStock: true,
  },
  {
    id: 5,
    name: "Sport Running Shoes",
    price: 129.99,
    originalPrice: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Shoes",
    gender: "Unisex",
    sizes: ["6", "7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Red", "Blue"],
    rating: 4.7,
    reviews: 98,
    inStock: true,
  },
  {
    id: 6,
    name: "Leather Handbag",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Bags",
    gender: "Women",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    rating: 4.9,
    reviews: 67,
    inStock: false,
  },
];
