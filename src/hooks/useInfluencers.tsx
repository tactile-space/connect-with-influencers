
import { useState, useEffect } from "react";

export interface Influencer {
  id: number;
  name: string;
  username: string;
  profilePicture: string;
  isVerified: boolean;
  followers: number;
  engagement: number;
  price: number;
  location: string;
  primaryGenre: string;
  secondaryGenres?: string[];
  bio?: string;
  postsPerWeek?: number;
  avgLikes?: number;
  avgComments?: number;
  pastCollaborations?: Array<{
    brand: string;
    logo: string;
    date: string;
    type: string;
  }>;
  pricePerStory?: number;
  pricePerReel?: number;
  joinedDate?: string;
}

// Mock data for demonstration
const generateMockInfluencers = (): Influencer[] => {
  const genres = ["Fashion", "Tech", "Fitness", "Beauty", "Travel", "Food", "Finance", "Gaming", "Lifestyle", "Education"];
  const secondaryGenresList = ["Luxury", "Sustainable", "Wellness", "DIY", "Reviews", "How-to", "Unboxing", "Tutorials"];
  const locations = ["New York", "Los Angeles", "London", "Paris", "Tokyo", "Berlin", "Sydney", "Toronto", "Singapore", "Dubai"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const brandLogos = [
    "https://placehold.co/200x200/png?text=A",
    "https://placehold.co/200x200/png?text=B",
    "https://placehold.co/200x200/png?text=C",
    "https://placehold.co/200x200/png?text=D",
    "https://placehold.co/200x200/png?text=E",
  ];
  
  return Array.from({ length: 32 }, (_, i) => {
    const followers = Math.floor(Math.random() * 2000000) + 10000;
    const engagement = Math.random() * 6 + 1; // 1-7%
    const followerLevel = followers > 500000 ? "high" : followers > 100000 ? "medium" : "low";
    const price = followerLevel === "high" ? Math.floor(Math.random() * 5000) + 2000 :
                  followerLevel === "medium" ? Math.floor(Math.random() * 1500) + 500 :
                  Math.floor(Math.random() * 400) + 100;
    
    // Ensure prices are reasonable
    const pricePerStory = Math.round(price * 0.4);
    const pricePerReel = Math.round(price * 2.5);
    
    const primaryGenre = genres[Math.floor(Math.random() * genres.length)];
    
    // Generate 1-2 secondary genres that aren't the primary
    const availableSecondaryGenres = secondaryGenresList.filter(g => g !== primaryGenre);
    const numSecondaryGenres = Math.floor(Math.random() * 2) + 1;
    const secondaryGenres = Array.from({ length: numSecondaryGenres }, () => {
      const idx = Math.floor(Math.random() * availableSecondaryGenres.length);
      const genre = availableSecondaryGenres[idx];
      availableSecondaryGenres.splice(idx, 1);
      return genre;
    });
    
    // Generate past collaborations (some influencers won't have any)
    const hasPastCollabs = Math.random() > 0.3;
    const pastCollaborations = hasPastCollabs ? Array.from({ length: Math.floor(Math.random() * 4) + 1 }, () => {
      const month = months[Math.floor(Math.random() * months.length)];
      const year = 2023;
      return {
        brand: `Brand ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        logo: brandLogos[Math.floor(Math.random() * brandLogos.length)],
        date: `${month} ${year}`,
        type: Math.random() > 0.5 ? "Paid Partnership" : "Product Review"
      };
    }) : [];
    
    // Generate when they joined Instagram
    const randomYear = Math.floor(Math.random() * 6) + 2015;
    const randomMonth = months[Math.floor(Math.random() * months.length)];
    
    return {
      id: i + 1,
      name: `Influencer ${i + 1}`,
      username: `influencer${i + 1}`,
      profilePicture: `https://placehold.co/400x400/png?text=${i + 1}`,
      isVerified: Math.random() > 0.7,
      followers,
      engagement,
      price,
      location: locations[Math.floor(Math.random() * locations.length)],
      primaryGenre,
      secondaryGenres,
      bio: "Creative content creator passionate about sharing authentic experiences and connecting with communities around the world.",
      postsPerWeek: Math.floor(Math.random() * 6) + 1,
      avgLikes: Math.floor(followers * (engagement / 100)),
      avgComments: Math.floor(followers * (engagement / 100) * 0.05),
      pastCollaborations: pastCollaborations.length > 0 ? pastCollaborations : undefined,
      pricePerStory,
      pricePerReel,
      joinedDate: `${randomMonth} ${randomYear}`,
    };
  });
};

interface FilterState {
  gender: string | null;
  genres: string[];
  followerRange: [number, number];
  engagementRange: [number, number];
  priceRange: [number, number];
  verifiedOnly: boolean;
}

interface SortOption {
  field: 'followers' | 'engagement' | 'price' | 'id';
  direction: 'asc' | 'desc';
}

export const useInfluencers = () => {
  const [allInfluencers, setAllInfluencers] = useState<Influencer[]>([]);
  const [filteredInfluencers, setFilteredInfluencers] = useState<Influencer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    gender: null,
    genres: [],
    followerRange: [0, 2000000],
    engagementRange: [0, 10],
    priceRange: [0, 10000],
    verifiedOnly: false,
  });
  const [sortOption, setSortOption] = useState<SortOption>({
    field: 'followers',
    direction: 'desc'
  });
  const [selectedCity, setSelectedCity] = useState<string | null>(null);

  // Load mock data
  useEffect(() => {
    try {
      const mockData = generateMockInfluencers();
      setAllInfluencers(mockData);
      setFilteredInfluencers(mockData);
      setIsLoading(false);
    } catch (err) {
      setError("Failed to load influencer data");
      setIsLoading(false);
    }
  }, []);

  // Apply filters
  useEffect(() => {
    if (allInfluencers.length === 0) return;

    let result = [...allInfluencers];

    // Apply city filter
    if (selectedCity) {
      // In a real app, this would filter by actual city data
      // For demo, just filter by random subset based on city name length
      const cityHash = selectedCity.length;
      result = result.filter(inf => inf.id % cityHash === 0);
    }

    // Apply gender filter (not implemented in the mock data)
    if (filters.gender) {
      // This would filter by gender in a real app
    }

    // Apply genre filter
    if (filters.genres.length > 0) {
      result = result.filter(inf => 
        filters.genres.includes(inf.primaryGenre) || 
        inf.secondaryGenres?.some(genre => filters.genres.includes(genre))
      );
    }

    // Apply follower range
    result = result.filter(inf => 
      inf.followers >= filters.followerRange[0] && 
      inf.followers <= filters.followerRange[1]
    );

    // Apply engagement range
    result = result.filter(inf => 
      inf.engagement >= filters.engagementRange[0] && 
      inf.engagement <= filters.engagementRange[1]
    );

    // Apply price range
    result = result.filter(inf => 
      inf.price >= filters.priceRange[0] && 
      inf.price <= filters.priceRange[1]
    );

    // Apply verified filter
    if (filters.verifiedOnly) {
      result = result.filter(inf => inf.isVerified);
    }

    // Apply sorting
    result.sort((a, b) => {
      if (sortOption.direction === 'asc') {
        return a[sortOption.field] - b[sortOption.field];
      } else {
        return b[sortOption.field] - a[sortOption.field];
      }
    });

    setFilteredInfluencers(result);
  }, [allInfluencers, filters, sortOption, selectedCity]);

  return {
    influencers: filteredInfluencers,
    isLoading,
    error,
    setFilters,
    setSortOption,
    sortOption,
    setSelectedCity
  };
};
