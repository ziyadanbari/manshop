import { Skeleton } from "@/components/ui/skeleton";

export default function ProductCardSkeleton() {
  return (
    <div className="group overflow-hidden rounded-lg border bg-white p-4 shadow">
      <Skeleton className="mb-4 h-64 w-full" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-10" />
        </div>
        <Skeleton className="h-4 w-1/2" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-8 w-1/3" />
        </div>
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}
