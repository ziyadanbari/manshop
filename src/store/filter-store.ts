import { create } from "zustand";

interface FilterStore {
  searchQuery: string;
  selectedCategories: string[];
  selectedGenders: string[];
  selectedSizes: string[];
  priceRange: string;
  sortBy: string;
  isFilterOpen: boolean;

  setSearchQuery: (query: string) => void;
  setSelectedCategories: (categories: string[]) => void;
  setSelectedGenders: (genders: string[]) => void;
  setSelectedSizes: (sizes: string[]) => void;
  setPriceRange: (range: string) => void;
  setSortBy: (sort: string) => void;
  setIsFilterOpen: (open: boolean) => void;

  toggleCategory: (category: string) => void;
  toggleGender: (gender: string) => void;
  toggleSize: (size: string) => void;

  clearFilters: () => void;
}

export const useFilterStore = create<FilterStore>((set, get) => ({
  searchQuery: "",
  selectedCategories: [],
  selectedGenders: [],
  selectedSizes: [],
  priceRange: "",
  sortBy: "",
  isFilterOpen: false,

  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategories: (categories) =>
    set({ selectedCategories: categories }),
  setSelectedGenders: (genders) => set({ selectedGenders: genders }),
  setSelectedSizes: (sizes) => set({ selectedSizes: sizes }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setIsFilterOpen: (open) => set({ isFilterOpen: open }),

  toggleCategory: (category) => {
    const { selectedCategories } = get();
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    set({ selectedCategories: newCategories });
  },

  toggleGender: (gender) => {
    const { selectedGenders } = get();
    const newGenders = selectedGenders.includes(gender)
      ? selectedGenders.filter((g) => g !== gender)
      : [...selectedGenders, gender];
    set({ selectedGenders: newGenders });
  },

  toggleSize: (size) => {
    const { selectedSizes } = get();
    const newSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    set({ selectedSizes: newSizes });
  },

  clearFilters: () =>
    set({
      searchQuery: "",
      selectedCategories: [],
      selectedGenders: [],
      selectedSizes: [],
      priceRange: "",
      sortBy: "",
    }),
}));
