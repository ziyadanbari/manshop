import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Clear existing products
  await prisma.product.deleteMany();

  // Seed products
  const products = [
    {
      name: "Classic White Sneakers",
      description:
        "Timeless white sneakers crafted for comfort and style. Perfect for any casual or semi-formal occasion, these sneakers feature a durable sole and breathable material.",
      price: 89.99,
      originalPrice: 120.0,
      images: ["/placeholder.svg?height=300&width=300"],
      category: "Shoes",
      gender: "Unisex",
      sizes: ["7", "8", "9", "10", "11"],
      colors: ["White", "Black"],
      rating: 4.5,
      reviews: 128,
      inStock: true,
    },
    {
      name: "Premium Denim Jacket",
      description:
        "A classic denim jacket made from high-quality materials. Features a modern fit, sturdy buttons, and versatile style for layering in any season.",
      price: 159.99,
      originalPrice: 199.99,
      images: ["/placeholder.svg?height=300&width=300"],
      category: "Jackets",
      gender: "Men",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Blue", "Black"],
      rating: 4.8,
      reviews: 89,
      inStock: true,
    },
    {
      name: "Elegant Summer Dress",
      description:
        "Lightweight and breezy, this summer dress is perfect for warm days and special occasions. Features a flattering silhouette and vibrant colors.",
      price: 79.99,
      originalPrice: 99.99,
      images: ["/placeholder.svg?height=300&width=300"],
      category: "Dresses",
      gender: "Women",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Pink", "Blue", "White"],
      rating: 4.6,
      reviews: 156,
      inStock: true,
    },
    {
      name: "Casual Cotton T-Shirt",
      description:
        "Soft, breathable cotton t-shirt designed for everyday comfort. Available in a range of colors and sizes to suit any wardrobe.",
      price: 24.99,
      originalPrice: 34.99,
      images: ["/placeholder.svg?height=300&width=300"],
      category: "T-Shirts",
      gender: "Unisex",
      sizes: ["XS", "S", "M", "L", "XL", "XXL"],
      colors: ["White", "Black", "Gray", "Navy"],
      rating: 4.3,
      reviews: 234,
      inStock: true,
    },
    {
      name: "Sport Running Shoes",
      description:
        "Engineered for performance, these running shoes offer superior cushioning and support. Ideal for athletes and casual runners alike.",
      price: 129.99,
      originalPrice: 159.99,
      images: ["/placeholder.svg?height=300&width=300"],
      category: "Shoes",
      gender: "Unisex",
      sizes: ["6", "7", "8", "9", "10", "11", "12"],
      colors: ["Black", "Red", "Blue"],
      rating: 4.7,
      reviews: 98,
      inStock: true,
    },
    {
      name: "Leather Handbag",
      description:
        "Elegant and spacious, this leather handbag is perfect for daily use or special occasions. Features multiple compartments and a timeless design.",
      price: 199.99,
      originalPrice: 249.99,
      images: ["/placeholder.svg?height=300&width=300"],
      category: "Bags",
      gender: "Women",
      sizes: ["One Size"],
      colors: ["Brown", "Black", "Tan"],
      rating: 4.9,
      reviews: 67,
      inStock: false,
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: product,
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
