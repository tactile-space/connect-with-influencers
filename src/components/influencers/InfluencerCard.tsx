
import React from "react";
import { MapPin, Users, Heart, DollarSign, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Influencer } from "@/hooks/useInfluencers";
import { cn } from "@/lib/utils";

interface InfluencerCardProps {
  influencer: Influencer;
  onClick: (influencer: Influencer) => void;
}

const InfluencerCard = ({ influencer, onClick }: InfluencerCardProps) => {
  const {
    id,
    name,
    username,
    profilePicture,
    isVerified,
    followers,
    engagement,
    price,
    location,
    primaryGenre,
  } = influencer;

  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  // Generate initials for fallback avatar
  const getInitials = () => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Determine genre color class
  const getGenreColorClass = () => {
    const genreColors: Record<string, string> = {
      'fashion': 'from-pink-500 to-purple-500',
      'tech': 'from-blue-500 to-cyan-400',
      'fitness': 'from-green-500 to-emerald-400',
      'beauty': 'from-rose-400 to-pink-600',
      'travel': 'from-cyan-500 to-blue-500',
      'food': 'from-amber-400 to-orange-500',
      'finance': 'from-emerald-500 to-green-600',
      'gaming': 'from-indigo-500 to-purple-600',
      'lifestyle': 'from-violet-400 to-purple-500',
      'education': 'from-blue-400 to-indigo-500',
    };
    
    return genreColors[primaryGenre.toLowerCase()] || 'from-primary to-primary/70';
  };

  return (
    <Card
      className={cn(
        "overflow-hidden border bg-card/50 backdrop-blur-sm hover:bg-card cursor-pointer",
        "animate-slide-in-bottom opacity-0 [animation-fill-mode:forwards]",
        "transition-all duration-300 hover:shadow-lg hover:-translate-y-1",
        "hover:shadow-primary/10"
      )}
      style={{ animationDelay: `${(id % 10) * 50}ms` }}
      onClick={() => onClick(influencer)}
    >
      <CardContent className="p-3 flex items-center space-x-3">
        <div className="relative flex-shrink-0">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-gradient-to-br from-secondary/80 to-secondary flex items-center justify-center shadow-inner">
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={name}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  // Handle image load error by showing initials
                  (e.target as HTMLImageElement).style.display = 'none';
                  (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-white', 'font-medium');
                  (e.target as HTMLImageElement).parentElement!.innerHTML = getInitials();
                }}
              />
            ) : (
              <span className="text-white font-medium">{getInitials()}</span>
            )}
          </div>
          {isVerified && (
            <span className="absolute bottom-0 right-0 bg-primary text-white p-1 rounded-full shadow-md animate-pulse-subtle">
              <BadgeCheck className="h-3 w-3" />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="space-y-1 mb-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate text-sm">{name}</h3>
              <Badge
                variant="outline"
                className={cn(
                  "text-xs font-semibold ml-2 px-1.5 py-0 bg-gradient-to-r text-white shadow-sm",
                  getGenreColorClass()
                )}
              >
                {primaryGenre}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">@{username}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="flex items-center text-xs">
              <Users className="h-3 w-3 mr-1 text-blue-500" />
              <span className="font-medium text-blue-600 dark:text-blue-400">{formatFollowers(followers)}</span>
            </div>
            
            <div className="flex items-center text-xs">
              <Heart className="h-3 w-3 mr-1 text-rose-500" />
              <span className="font-medium text-rose-600 dark:text-rose-400">{engagement.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center text-xs group">
              <DollarSign className="h-3 w-3 mr-1 text-emerald-500 group-hover:animate-pulse-subtle" />
              <span className="font-medium text-emerald-600 dark:text-emerald-400 transition-all group-hover:text-emerald-700 dark:group-hover:text-emerald-300">${price}</span>
            </div>
            
            <div className="flex items-center text-xs">
              <MapPin className="h-3 w-3 mr-1 text-amber-500" />
              <span className="truncate text-amber-700 dark:text-amber-400">{location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
