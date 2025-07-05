import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-12 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Carousel Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full rounded-lg" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-20 w-20 rounded-md" />
            ))}
          </div>
        </div>
        {/* Info Skeleton */}
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-10 w-3/4" />
          <Skeleton className="h-6 w-1/3" />
          <Skeleton className="h-6 w-1/4" />
          <Skeleton className="h-20 w-full" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
      {/* Tabs Skeleton */}
      <div className="mb-12">
        <div className="mb-4 flex gap-4">
          {["Details", "Specifications", "Reviews", "Care Guide"].map((tab) => (
            <Skeleton key={tab} className="h-8 w-32" />
          ))}
        </div>
        <Skeleton className="h-40 w-full" />
      </div>
      {/* Related Products Skeleton */}
      <div>
        <Skeleton className="mb-6 h-8 w-1/3" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-72 w-full rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
