
import React, { useState } from "react";
import { X, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import RangeSlider from "@/components/ui/RangeSlider";

// These would come from an API in a real app
const genres = [
  { value: "fashion", label: "Fashion" },
  { value: "tech", label: "Tech" },
  { value: "fitness", label: "Fitness" },
  { value: "beauty", label: "Beauty" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food & Cooking" },
  { value: "finance", label: "Finance" },
  { value: "gaming", label: "Gaming" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "education", label: "Education" },
];

interface FilterState {
  gender: string | null;
  genres: string[];
  followerRange: [number, number];
  engagementRange: [number, number];
  priceRange: [number, number];
  verifiedOnly: boolean;
}

interface FilterPanelProps {
  onApplyFilters: (filters: FilterState) => void;
}

const FilterPanel = ({ onApplyFilters }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const [filters, setFilters] = useState<FilterState>({
    gender: null,
    genres: [],
    followerRange: [0, 1000000],
    engagementRange: [0, 10],
    priceRange: [0, 10000],
    verifiedOnly: false,
  });

  const handleGenderChange = (value: string) => {
    setFilters((prev) => ({ ...prev, gender: value }));
  };

  const toggleGenre = (genre: string) => {
    setFilters((prev) => {
      const genres = prev.genres.includes(genre)
        ? prev.genres.filter((g) => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres };
    });
  };

  const handleFollowerRangeChange = (values: [number, number]) => {
    setFilters((prev) => ({ ...prev, followerRange: values }));
  };

  const handleEngagementRangeChange = (values: [number, number]) => {
    setFilters((prev) => ({ ...prev, engagementRange: values }));
  };

  const handlePriceRangeChange = (values: [number, number]) => {
    setFilters((prev) => ({ ...prev, priceRange: values }));
  };

  const toggleVerifiedOnly = () => {
    setFilters((prev) => ({ ...prev, verifiedOnly: !prev.verifiedOnly }));
  };

  const applyFilters = () => {
    // Calculate active filters for badge display
    const active: string[] = [];
    
    if (filters.gender) active.push("Gender");
    if (filters.genres.length > 0) active.push("Genre");
    if (filters.followerRange[0] !== 0 || filters.followerRange[1] !== 1000000) active.push("Followers");
    if (filters.engagementRange[0] !== 0 || filters.engagementRange[1] !== 10) active.push("Engagement");
    if (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 10000) active.push("Price");
    if (filters.verifiedOnly) active.push("Verified Only");
    
    setActiveFilters(active);
    onApplyFilters(filters);
    setIsOpen(false);
  };

  const resetFilters = () => {
    setFilters({
      gender: null,
      genres: [],
      followerRange: [0, 1000000],
      engagementRange: [0, 10],
      priceRange: [0, 10000],
      verifiedOnly: false,
    });
    setActiveFilters([]);
    onApplyFilters({
      gender: null,
      genres: [],
      followerRange: [0, 1000000],
      engagementRange: [0, 10],
      priceRange: [0, 10000],
      verifiedOnly: false,
    });
  };

  const formatFollowerCount = (value: number) => {
    if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
    return value.toString();
  };

  const formatPrice = (value: number) => {
    return `$${value}`;
  };

  const formatEngagement = (value: number) => {
    return `${value}%`;
  };

  return (
    <div className="relative">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            className="bg-white dark:bg-card flex items-center gap-2 relative border hover:border-primary"
          >
            <Filter className="h-4 w-4" />
            <span>Filters</span>
            {activeFilters.length > 0 && (
              <Badge
                variant="default"
                className="h-5 min-w-5 flex items-center justify-center rounded-full p-0 text-[10px]"
              >
                {activeFilters.length}
              </Badge>
            )}
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-5">
            <SheetTitle className="text-xl font-medium">Filters</SheetTitle>
          </SheetHeader>
          
          <div className="space-y-6">
            {/* Gender Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Gender</h3>
              <div className="grid grid-cols-3 gap-2">
                <Button
                  variant={filters.gender === "male" ? "default" : "outline"}
                  className={`w-full ${filters.gender === "male" ? "" : "bg-white dark:bg-card"}`}
                  onClick={() => handleGenderChange("male")}
                >
                  Male
                </Button>
                <Button
                  variant={filters.gender === "female" ? "default" : "outline"}
                  className={`w-full ${filters.gender === "female" ? "" : "bg-white dark:bg-card"}`}
                  onClick={() => handleGenderChange("female")}
                >
                  Female
                </Button>
                <Button
                  variant={filters.gender === "other" ? "default" : "outline"}
                  className={`w-full ${filters.gender === "other" ? "" : "bg-white dark:bg-card"}`}
                  onClick={() => handleGenderChange("other")}
                >
                  Other
                </Button>
              </div>
            </div>
            
            <Separator />
            
            {/* Genre/Niche Filter */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm">Genre / Niche</h3>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre) => (
                  <Badge
                    key={genre.value}
                    variant={filters.genres.includes(genre.value) ? "default" : "outline"}
                    className={`cursor-pointer transition-colors ${
                      filters.genres.includes(genre.value) 
                        ? "" 
                        : "bg-white dark:bg-card hover:bg-secondary"
                    }`}
                    onClick={() => toggleGenre(genre.value)}
                  >
                    {genre.label}
                    {filters.genres.includes(genre.value) && (
                      <Check className="ml-1 h-3 w-3" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            <Separator />
            
            {/* Follower Range */}
            <RangeSlider
              label="Follower Count"
              min={0}
              max={1000000}
              step={1000}
              defaultValue={filters.followerRange}
              formatValue={formatFollowerCount}
              onChange={handleFollowerRangeChange}
            />
            
            <Separator />
            
            {/* Engagement Rate */}
            <RangeSlider
              label="Engagement Rate (%)"
              min={0}
              max={10}
              step={0.1}
              defaultValue={filters.engagementRange}
              formatValue={formatEngagement}
              onChange={handleEngagementRangeChange}
            />
            
            <Separator />
            
            {/* Price Range */}
            <RangeSlider
              label="Price Range"
              min={0}
              max={10000}
              step={100}
              defaultValue={filters.priceRange}
              formatValue={formatPrice}
              onChange={handlePriceRangeChange}
            />
            
            <Separator />
            
            {/* Verified Badge */}
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="verified-toggle">Verified Creators Only</Label>
                <p className="text-sm text-muted-foreground">
                  Show only verified Instagram influencers
                </p>
              </div>
              <Switch
                id="verified-toggle"
                checked={filters.verifiedOnly}
                onCheckedChange={toggleVerifiedOnly}
              />
            </div>
          </div>
          
          <SheetFooter className="mt-8 flex-row gap-3 sm:space-x-0">
            <Button
              variant="outline"
              className="flex-1 bg-white dark:bg-card"
              onClick={resetFilters}
            >
              Reset All
            </Button>
            <Button className="flex-1" onClick={applyFilters}>
              Apply Filters
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-2">
          {activeFilters.map((filter) => (
            <Badge key={filter} variant="secondary" className="flex items-center gap-1">
              {filter}
            </Badge>
          ))}
          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-xs text-muted-foreground hover:text-foreground"
            onClick={resetFilters}
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
