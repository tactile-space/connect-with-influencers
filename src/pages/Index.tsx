
import React, { useState } from "react";
import { ArrowUpDown, Filter, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/layout/Navbar";
import CityDropdown from "@/components/ui/CityDropdown";
import FilterPanel from "@/components/filters/FilterPanel";
import InfluencerCard from "@/components/influencers/InfluencerCard";
import InfluencerModal from "@/components/influencers/InfluencerModal";
import { useInfluencers, Influencer } from "@/hooks/useInfluencers";

const Index = () => {
  const {
    influencers,
    isLoading,
    error,
    setFilters,
    setSortOption,
    sortOption,
    setSelectedCity
  } = useInfluencers();

  const [selectedInfluencer, setSelectedInfluencer] = useState<Influencer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSortChange = (value: string) => {
    const [field, direction] = value.split("-") as [
      "followers" | "engagement" | "price" | "id",
      "asc" | "desc"
    ];
    setSortOption({ field, direction });
  };

  const handleCitySelect = (city: string | null) => {
    setSelectedCity(city);
  };

  const handleApplyFilters = (filters: any) => {
    setFilters(filters);
  };

  const handleInfluencerClick = (influencer: Influencer) => {
    setSelectedInfluencer(influencer);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Sort options mapping
  const sortOptions = [
    { value: "followers-desc", label: "Followers: High to Low" },
    { value: "followers-asc", label: "Followers: Low to High" },
    { value: "engagement-desc", label: "Engagement: High to Low" },
    { value: "engagement-asc", label: "Engagement: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "id-desc", label: "Recently Active" },
  ];

  const currentSortValue = `${sortOption.field}-${sortOption.direction}`;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 md:px-6 pt-24 pb-16">
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Find Instagram Influencers</h1>
            <p className="text-muted-foreground mt-1">
              Discover and connect with the perfect influencers for your brand
            </p>
          </div>
          
          {/* Filters and sorting */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <CityDropdown onSelect={handleCitySelect} />
              <FilterPanel onApplyFilters={handleApplyFilters} />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full sm:w-auto bg-white dark:bg-card border hover:border-primary">
                  <ArrowUpDown className="h-4 w-4 mr-2" />
                  <span>Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuRadioGroup value={currentSortValue} onValueChange={handleSortChange}>
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem key={option.value} value={option.value}>
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <Separator />
          
          {/* Influencer Grid */}
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : error ? (
            <div className="text-center py-12 text-destructive">
              <p>{error}</p>
            </div>
          ) : influencers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No influencers match your current filters.</p>
              <Button variant="link" onClick={() => window.location.reload()}>
                Reset all filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {influencers.map((influencer) => (
                <InfluencerCard
                  key={influencer.id}
                  influencer={influencer}
                  onClick={handleInfluencerClick}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      
      {selectedInfluencer && (
        <InfluencerModal
          influencer={selectedInfluencer}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default Index;
