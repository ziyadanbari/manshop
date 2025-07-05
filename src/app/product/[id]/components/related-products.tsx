import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Product } from "@/types/product";
import Link from "next/link";

export default function RelatedProducts({
  relatedProducts,
}: {
  relatedProducts: Product[];
}) {
  return (
    <div>
      <h2 className="mb-6 text-2xl font-bold">You Might Also Like</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {relatedProducts.map((relatedProduct) => (
          <Link key={relatedProduct.id} href={`/product/${relatedProduct.id}`}>
            <Card
              key={relatedProduct.id}
              className="group cursor-pointer transition-shadow hover:shadow-lg"
            >
              <div className="relative overflow-hidden">
                <Image
                  src={relatedProduct.images[0] || "/placeholder.svg"}
                  alt={relatedProduct.name}
                  width={200}
                  height={200}
                  className="h-48 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="bg-destructive absolute top-2 left-2">
                  -
                  {Math.round(
                    ((relatedProduct.originalPrice - relatedProduct.price) /
                      relatedProduct.originalPrice) *
                      100,
                  )}
                  %
                </Badge>
              </div>
              <CardContent className="p-4">
                <h3 className="mb-2 line-clamp-2 font-semibold">
                  {relatedProduct.name}
                </h3>
                <div className="mb-2 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(relatedProduct.rating)
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-muted-foreground ml-1 text-sm">
                    ({relatedProduct.rating})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold">
                    ${relatedProduct?.price?.toFixed?.(2)}
                  </span>
                  <span className="text-muted-foreground text-sm line-through">
                    ${relatedProduct?.originalPrice?.toFixed?.(2)}
                  </span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
