
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

  return (
    <Card
      className={cn(
        "overflow-hidden border bg-card cursor-pointer card-hover",
        "animate-slide-in-bottom opacity-0 [animation-fill-mode:forwards]",
        "transition-all duration-300"
      )}
      style={{ animationDelay: `${(id % 10) * 50}ms` }}
      onClick={() => onClick(influencer)}
    >
      <CardContent className="p-3 flex items-center space-x-3">
        <div className="relative flex-shrink-0">
          <div className="h-16 w-16 rounded-full overflow-hidden bg-secondary">
            <img
              src={profilePicture}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          {isVerified && (
            <span className="absolute bottom-0 right-0 bg-primary/90 text-white p-1 rounded-full">
              <BadgeCheck className="h-3 w-3" />
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="space-y-1 mb-2">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate text-sm">{name}</h3>
              <Badge
                variant="secondary"
                className="text-xs font-normal ml-2 px-1.5 py-0"
              >
                {primaryGenre}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">@{username}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1">
            <div className="flex items-center text-xs">
              <Users className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{formatFollowers(followers)}</span>
            </div>
            
            <div className="flex items-center text-xs">
              <Heart className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>{engagement.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center text-xs">
              <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
              <span>${price}</span>
            </div>
            
            <div className="flex items-center text-xs">
              <MapPin className="h-3 w-3 mr-1 text-muted-foreground" />
              <span className="truncate">{location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
