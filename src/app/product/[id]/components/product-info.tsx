import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ShoppingCart, Heart, Share2 } from "lucide-react";

export default function ProductInfo({
  product,
  selectedSize,
  setSelectedSize,
  selectedColor,
  setSelectedColor,
  quantity,
  setQuantity,
  isWishlisted,
  setIsWishlisted,
  handleAddToCart,
}: any) {
  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100,
  );
  return (
    <div className="space-y-6">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="secondary">{product.category}</Badge>
          <Badge variant="outline">{product.gender}</Badge>
          {discountPercentage > 0 && (
            <Badge className="bg-destructive">-{discountPercentage}%</Badge>
          )}
        </div>
        <h1 className="mb-2 text-3xl font-bold">{product.name}</h1>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <span
                key={i}
                className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
              >
                ★
              </span>
            ))}
            <span className="text-muted-foreground ml-2 text-sm">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-3xl font-bold">
          ${product?.price?.toFixed(2)}
        </span>
        {product.originalPrice > product.price && (
          <span className="text-muted-foreground text-xl line-through">
            ${product.originalPrice.toFixed(2)}
          </span>
        )}
      </div>
      <p className="text-muted-foreground leading-relaxed">
        {product.description}
      </p>
      {/* Product Options */}
      <div className="space-y-4">
        <div>
          <Label className="mb-2 block text-base font-medium">Size</Label>
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {product.sizes.map((size: string) => (
                <SelectItem key={size} value={size}>
                  Size {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="mb-2 block text-base font-medium">Color</Label>
          <Select value={selectedColor} onValueChange={setSelectedColor}>
            <SelectTrigger className="w-full">
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
        <div>
          <Label className="mb-2 block text-base font-medium">Quantity</Label>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center font-medium">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() =>
                setQuantity(Math.min(product.stockCount, quantity + 1))
              }
              disabled={quantity >= product.stockCount}
            >
              +
            </Button>
            <span className="text-muted-foreground ml-2 text-sm">
              {product.stockCount} in stock
            </span>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="space-y-3">
        <Button onClick={handleAddToCart} size="lg" className="w-full">
          <ShoppingCart className="mr-2 h-5 w-5" />
          Add to Cart - ${(product.price * quantity).toFixed(2)}
        </Button>
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="lg"
            className="flex-1 bg-transparent"
            onClick={() => setIsWishlisted(!isWishlisted)}
          >
            <Heart
              className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
            />
            {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
          </Button>
          <Button variant="outline" size="lg">
            <Share2 className="mr-2 h-5 w-5" />
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}
