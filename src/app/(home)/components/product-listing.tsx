import React from "react";
import ProductCard from "./product-card";
import ProductCardSkeleton from "./product-card-skeleton";
import type { Product } from "@/types/product";
import { useCartStore } from "@/store/cart-store";

const ProductListing = ({
  filteredProducts,
  isLoading,
}: {
  filteredProducts: Product[];
  isLoading: boolean;
}) => {
  const addToCart = useCartStore((state) => state.addItem);
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
      {isLoading
        ? Array.from({ length: 20 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))
        : filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
    </div>
  );
};

export default ProductListing;
