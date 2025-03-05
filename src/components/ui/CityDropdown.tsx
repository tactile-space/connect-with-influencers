
import React, { useState, useRef, useEffect } from "react";
import { Check, ChevronDown, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// These would come from an API in a real app
const cities = [
  { value: "new-york", label: "New York", country: "United States" },
  { value: "los-angeles", label: "Los Angeles", country: "United States" },
  { value: "london", label: "London", country: "United Kingdom" },
  { value: "paris", label: "Paris", country: "France" },
  { value: "tokyo", label: "Tokyo", country: "Japan" },
  { value: "berlin", label: "Berlin", country: "Germany" },
  { value: "sydney", label: "Sydney", country: "Australia" },
  { value: "toronto", label: "Toronto", country: "Canada" },
  { value: "singapore", label: "Singapore", country: "Singapore" },
  { value: "dubai", label: "Dubai", country: "UAE" },
];

interface CityDropdownProps {
  onSelect: (city: string | null) => void;
}

const CityDropdown = ({ onSelect }: CityDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  const handleSelect = (city: string) => {
    setSelectedCity(city);
    setOpen(false);
    onSelect(city);
  };

  const clearSelection = () => {
    setSelectedCity(null);
    onSelect(null);
  };

  const getDisplayValue = () => {
    if (!selectedCity) return "Select location";
    return cities.find((city) => city.value === selectedCity)?.label || selectedCity;
  };

  return (
    <div className="relative w-full sm:w-64">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between bg-white dark:bg-card border transition-all hover:border-primary"
          >
            <div className="flex items-center gap-2 truncate">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="truncate">{getDisplayValue()}</span>
            </div>
            <div className="flex items-center gap-1">
              {selectedCity && (
                <Button
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    clearSelection();
                  }}
                  className="h-4 w-4 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                  <span className="sr-only">Clear</span>
                </Button>
              )}
              <ChevronDown className="h-4 w-4 opacity-50" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            <CommandInput placeholder="Search cities..." className="h-9" />
            <CommandList>
              <CommandEmpty>No cities found.</CommandEmpty>
              <CommandGroup>
                {cities.map((city) => (
                  <CommandItem
                    key={city.value}
                    value={city.value}
                    onSelect={() => handleSelect(city.value)}
                    className="flex items-center justify-between"
                  >
                    <div className="flex flex-col">
                      <span>{city.label}</span>
                      <span className="text-xs text-muted-foreground">
                        {city.country}
                      </span>
                    </div>
                    {selectedCity === city.value && (
                      <Check className="h-4 w-4 text-primary" />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CityDropdown;
