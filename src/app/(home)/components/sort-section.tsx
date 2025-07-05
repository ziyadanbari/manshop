"use client";

import { useFilterStore } from "@/store/filter-store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SortSectionProps {
  filteredCount: number;
  totalCount: number;
}

export default function SortSection({
  filteredCount,
  totalCount,
}: SortSectionProps) {
  const { sortBy, setSortBy } = useFilterStore();

  return (
    <div className="mb-6 flex items-center justify-between">
      <p className="text-muted-foreground">
        Showing {filteredCount} of {totalCount} products
      </p>
      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="name">Name</SelectItem>
          <SelectItem value="price-low">Price: Low to High</SelectItem>
          <SelectItem value="price-high">Price: High to Low</SelectItem>
          <SelectItem value="rating">Highest Rated</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
