import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";
import type { ReviewWithUser } from "@/types/review";

interface ReviewListProps {
  reviews: ReviewWithUser[];
  isLoading: boolean;
}

export default function ReviewList({ reviews, isLoading }: ReviewListProps) {
  if (isLoading) {
    return <div>Loading reviews...</div>;
  }
  if (reviews.length === 0) {
    return (
      <div className="text-muted-foreground text-center">No reviews yet.</div>
    );
  }
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <Avatar>
                <AvatarImage src={"/avatar.png"} />
                <AvatarFallback>
                  {review.user?.name?.charAt(0) ||
                    review.user?.username?.charAt(0) ||
                    "?"}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="mb-2 flex items-center justify-between">
                  <div>
                    <p className="font-semibold">
                      {review.user?.name || review.user?.username || "User"}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-muted-foreground text-sm">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-muted-foreground mb-3">{review.comment}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
