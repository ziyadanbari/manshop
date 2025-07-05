"use client";

import { useFilterStore } from "@/store/filter-store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Cart from "@/components/cart";
import FilterSection from "@/app/(home)/components/filter-section";
import SortSection from "@/app/(home)/components/sort-section";
import { useProductFilters } from "@/hooks/use-product-filters";
import { Filter } from "lucide-react";
import ProductListing from "./product-listing";

export default function ProductPage() {
  const {
    filteredProducts,
    categories,
    genders,
    allSizes,
    totalProducts,
    isLoading,
  } = useProductFilters();
  const { searchQuery, setSearchQuery, isFilterOpen, setIsFilterOpen } =
    useFilterStore();

  const clearFilters = useFilterStore((state) => state.clearFilters);
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">StyleStore</h1>
            {/* Search Bar */}
            <div className="mx-8 max-w-md flex-1">
              <div className="relative">
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            {/* Cart */}
            <Cart />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters Sidebar */}
          <div className="hidden w-64 shrink-0 lg:block">
            <div className="sticky top-24 rounded-lg border bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-semibold">Filters</h2>
              </div>
              <FilterSection
                categories={categories}
                genders={genders}
                allSizes={allSizes}
              />
            </div>
          </div>

          {/* Mobile Filter Button */}
          <div className="fixed bottom-4 left-4 z-40 lg:hidden">
            <Button
              size="lg"
              className="rounded-full shadow-lg"
              onClick={() => setIsFilterOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Filters
            </Button>
            {isFilterOpen && (
              <div className="fixed inset-0 z-50 flex justify-start bg-black/40">
                <div className="h-full w-80 bg-white p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-semibold">Filters</h2>
                    <Button
                      variant="ghost"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Close
                    </Button>
                  </div>
                  <FilterSection
                    categories={categories}
                    genders={genders}
                    allSizes={allSizes}
                  />
                </div>
                <div
                  className="flex-1"
                  onClick={() => setIsFilterOpen(false)}
                />
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Results */}
            <SortSection
              filteredCount={filteredProducts.length}
              totalCount={totalProducts}
            />

            {/* Product Grid */}
            <div>
              <ProductListing
                filteredProducts={filteredProducts}
                isLoading={isLoading}
              />
            </div>

            {filteredProducts.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground text-lg">
                  No products found matching your criteria.
                </p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="mt-4 bg-transparent"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
