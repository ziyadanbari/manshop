"use client";

import { useFilterStore } from "@/store/filter-store";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterSectionProps {
  categories: string[];
  genders: string[];
  allSizes: string[];
}

export default function FilterSection({
  categories,
  genders,
  allSizes,
}: FilterSectionProps) {
  const {
    selectedCategories,
    selectedGenders,
    selectedSizes,
    priceRange,
    setPriceRange,
    toggleCategory,
    toggleGender,
    toggleSize,
    clearFilters,
  } = useFilterStore();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="mb-3 font-semibold">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => toggleCategory(category)}
              />
              <Label htmlFor={`category-${category}`} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold">Gender</h3>
        <div className="space-y-2">
          {genders.map((gender) => (
            <div key={gender} className="flex items-center space-x-2">
              <Checkbox
                id={`gender-${gender}`}
                checked={selectedGenders.includes(gender)}
                onCheckedChange={() => toggleGender(gender)}
              />
              <Label htmlFor={`gender-${gender}`} className="text-sm">
                {gender}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold">Sizes</h3>
        <div className="grid grid-cols-3 gap-2">
          {allSizes.map((size) => (
            <div key={size} className="flex items-center space-x-2">
              <Checkbox
                id={`size-${size}`}
                checked={selectedSizes.includes(size)}
                onCheckedChange={() => toggleSize(size)}
              />
              <Label htmlFor={`size-${size}`} className="text-sm">
                {size}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="mb-3 font-semibold">Price Range</h3>
        <Select value={priceRange} onValueChange={setPriceRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select price range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0-50">$0 - $50</SelectItem>
            <SelectItem value="50-100">$50 - $100</SelectItem>
            <SelectItem value="100-200">$100 - $200</SelectItem>
            <SelectItem value="200">$200+</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={clearFilters}
        variant="outline"
        className="w-full bg-transparent"
      >
        Clear All Filters
      </Button>
    </div>
  );
}
