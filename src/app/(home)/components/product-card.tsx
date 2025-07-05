"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import type { Product } from "@/types/product";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, color: string) => void;
}

export default function ProductCard({
  product,
  onAddToCart,
}: ProductCardProps) {
  const router = useRouter();
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]!);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]!);

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );

  return (
    <div onClick={() => router.push(`/product/${product.id}`)}>
      <Card className="group cursor-pointer overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        <div className="relative overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            width={300}
            height={300}
            className="h-64 w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discountPercentage > 0 && (
            <Badge className="bg-destructive absolute top-2 left-2">
              -{discountPercentage}%
            </Badge>
          )}
          {!product.inStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <Badge variant="secondary">Out of Stock</Badge>
            </div>
          )}
        </div>

        <CardContent className="p-4">
          <div className="space-y-3">
            <div>
              <h3 className="line-clamp-2 text-lg font-semibold">
                {product.name}
              </h3>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-xs ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-muted-foreground text-sm">
                  ({product.reviews})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xl font-bold">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-muted-foreground text-sm line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <div>
                <Label className="text-sm font-medium">Size</Label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size: string) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm font-medium">Color</Label>
                <Select value={selectedColor} onValueChange={setSelectedColor}>
                  <SelectTrigger className="mt-1 w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {product.colors.map((color: string) => (
                      <SelectItem key={color} value={color}>
                        {color}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button
              className="w-full"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product, selectedSize, selectedColor);
              }}
              disabled={!product.inStock}
            >
              {product.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
