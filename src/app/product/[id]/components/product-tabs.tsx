import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star } from "lucide-react";
import type { ReviewWithUser } from "@/types/review";
import type { Product } from "@/types/product";
import ReviewForm from "./review-form";
import ReviewList from "./review-list";

interface ReviewState {
  userRating: number;
  setUserRating: (n: number) => void;
  hoverRating: number;
  setHoverRating: (n: number) => void;
  reviewText: string;
  setReviewText: (s: string) => void;
  handleSubmitReview: () => void;
  isSubmitting?: boolean;
}

interface ProductTabsProps {
  product: Product;
  reviews: ReviewWithUser[];
  isReviewsLoading: boolean;
  reviewState: ReviewState;
}

export default function ProductTabs({
  product,
  reviews,
  isReviewsLoading,
  reviewState,
}: ProductTabsProps) {
  // Calculate rating distribution from real reviews
  const ratingCounts = [0, 0, 0, 0, 0];
  console.log(reviews, reviewState);
  reviews.forEach((r) => {
    if (r.rating >= 1 && r.rating <= 5) ratingCounts[r.rating - 1]!++;
  });
  const total = reviews.length || 1;
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars, i) => ({
    stars,
    count: ratingCounts[5 - stars],
    percentage: Math.round((ratingCounts[5 - stars]! / total) * 100),
  }));

  return (
    <Tabs defaultValue="details" className="mb-12">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                {product?.description}
              </p>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="reviews" className="mt-6">
        <div className="space-y-6">
          {/* Rating Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Customer Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="text-center">
                  <div className="mb-2 text-4xl font-bold">
                    {product.rating}
                  </div>
                  <div className="mb-2 flex justify-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground">
                    Based on {reviews.length} reviews
                  </p>
                </div>
                <div className="space-y-2">
                  {ratingDistribution.map((item) => (
                    <div key={item.stars} className="flex items-center gap-2">
                      <span className="w-8 text-sm">{item.stars}★</span>
                      <Progress value={item.percentage} className="flex-1" />
                      <span className="text-muted-foreground w-8 text-sm">
                        {item.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Write a Review */}
          <Card>
            <CardHeader>
              <CardTitle>Write a Review</CardTitle>
            </CardHeader>
            <CardContent>
              <ReviewForm {...reviewState} />
            </CardContent>
          </Card>
          {/* Reviews List */}
          <ReviewList reviews={reviews} isLoading={isReviewsLoading} />
        </div>
      </TabsContent>
    </Tabs>
  );
}
