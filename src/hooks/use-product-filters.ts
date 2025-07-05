import { useFilterStore } from "@/store/filter-store";
import { api } from "@/trpc/react";

export const useProductFilters = () => {
  const {
    searchQuery,
    selectedCategories,
    selectedGenders,
    selectedSizes,
    priceRange,
    sortBy,
  } = useFilterStore();

  // Fetch filtered products from database
  const { data: filteredProducts = [], isLoading } =
    api.product.getFiltered.useQuery({
      searchQuery,
      categories: selectedCategories,
      genders: selectedGenders,
      sizes: selectedSizes,
      priceRange,
      sortBy,
    });

  // Fetch filter options
  const { data: categories = [] } = api.product.getCategories.useQuery();
  const { data: genders = [] } = api.product.getGenders.useQuery();
  const { data: allSizes = [] } = api.product.getSizes.useQuery();

  // Get total count
  const { data: allProducts = [] } = api.product.getAll.useQuery();
  const totalProducts = allProducts.length;

  return {
    filteredProducts,
    categories,
    genders,
    allSizes,
    totalProducts,
    isLoading,
  };
};
