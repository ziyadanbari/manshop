"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import ProductImagesCarousel from "@/app/product/[id]/components/product-images-carousel";
import ProductInfo from "@/app/product/[id]/components/product-info";
import ProductTabs from "@/app/product/[id]/components/product-tabs";
import RelatedProducts from "@/app/product/[id]/components/related-products";
import { api } from "@/trpc/react";
import ProductDetailSkeleton from "@/app/product/[id]/components/product-detail-skeleton";
import { useCartStore } from "@/store/cart-store";
import Cart from "@/components/cart";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number.parseInt(params.id as string);
  const addCartItem = useCartStore((state) => state.addItem);
  // Fetch product data via tRPC
  const { data: product, isLoading } = api.product.getById.useQuery({
    id: productId,
  });

  // Fetch all products for related products (could be optimized)
  const { data: allProducts = [] } = api.product.getAll.useQuery(undefined, {
    enabled: !!product,
  });
  // Fetch reviews for this product
  const {
    data: reviews = [],
    refetch: refetchReviews,
    isLoading: isReviewsLoading,
  } = api.review.getProductReviews.useQuery(
    { productId },
    { enabled: !!product },
  );

  // State for options and review
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  // Review mutation
  const reviewMutation = api.review.create.useMutation({
    onSuccess: () => {
      refetchReviews();
      setUserRating(0);
      setReviewText("");
    },
  });

  useEffect(() => {
    if (product) {
      setSelectedSize(product?.sizes?.[0] || "");
      setSelectedColor(product?.colors?.[0] || "");
    }
  }, [product]);

  // Related products: filter out current product and take 4 others
  const relatedProducts = product
    ? allProducts.filter((p) => p.id !== product.id).slice(0, 4)
    : [];

  // Review state to pass to ProductTabs
  const reviewState = {
    userRating,
    setUserRating,
    hoverRating,
    setHoverRating,
    reviewText,
    setReviewText,
    handleSubmitReview: () => {
      if (userRating > 0 && reviewText.trim()) {
        reviewMutation.mutate({
          productId,
          rating: userRating,
          comment: reviewText,
        });
      }
    },
  };
  if (isLoading) return <ProductDetailSkeleton />;
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold">Product Not Found</h1>
          <Button onClick={() => router.push("/")} variant="outline">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button
              onClick={() => router.push("/")}
              variant="ghost"
              className="p-2"
            >
              <ChevronLeft className="mr-2 h-5 w-5" />
              <span className="hidden sm:block">Back to Products</span>
            </Button>
            <h1 className="text-xl font-bold">StyleStore</h1>
            <Cart />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Product Images Carousel */}
          <div className="space-y-4">
            <ProductImagesCarousel
              images={product.images}
              name={product.name}
            />
          </div>
          {/* Product Information */}
          <ProductInfo
            product={product}
            selectedSize={selectedSize}
            setSelectedSize={setSelectedSize}
            selectedColor={selectedColor}
            setSelectedColor={setSelectedColor}
            quantity={quantity}
            setQuantity={setQuantity}
            isWishlisted={isWishlisted}
            setIsWishlisted={setIsWishlisted}
            handleAddToCart={() => {
              addCartItem(product, selectedSize, selectedColor);
            }}
          />
        </div>
        {/* Product Details Tabs */}
        <ProductTabs
          product={product}
          reviews={reviews}
          isReviewsLoading={isReviewsLoading}
          reviewState={reviewState}
        />
        {/* Related Products */}
        <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </div>
  );
}
