import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";

interface ReviewFormProps {
  userRating: number;
  setUserRating: (n: number) => void;
  hoverRating: number;
  setHoverRating: (n: number) => void;
  reviewText: string;
  setReviewText: (s: string) => void;
  handleSubmitReview: () => void;
  isSubmitting?: boolean;
}

export default function ReviewForm({
  userRating,
  setUserRating,
  hoverRating,
  setHoverRating,
  reviewText,
  setReviewText,
  handleSubmitReview,
  isSubmitting,
}: ReviewFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <Label className="mb-2 block text-base font-medium">Your Rating</Label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`h-8 w-8 cursor-pointer transition-colors ${
                star <= (hoverRating || userRating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300 hover:text-yellow-400"
              }`}
              onClick={() => setUserRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
      </div>
      <div>
        <Label htmlFor="review" className="mb-2 block text-base font-medium">
          Your Review
        </Label>
        <Textarea
          id="review"
          placeholder="Share your thoughts about this product..."
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
        />
      </div>
      <Button
        onClick={handleSubmitReview}
        disabled={!userRating || !reviewText.trim() || isSubmitting}
      >
        Submit Review
      </Button>
    </div>
  );
}
