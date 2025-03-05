
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
        "overflow-hidden border bg-card h-full cursor-pointer card-hover",
        "animate-slide-in-bottom opacity-0 [animation-fill-mode:forwards]",
        "transition-all duration-300"
      )}
      style={{ animationDelay: `${(id % 10) * 50}ms` }}
      onClick={() => onClick(influencer)}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />
        <img
          src={profilePicture}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 z-20">
          {isVerified && (
            <span className="bg-primary/90 text-white p-1 rounded-full">
              <BadgeCheck className="h-4 w-4" />
            </span>
          )}
        </div>
        <div className="absolute left-3 bottom-3 z-20">
          <Badge
            variant="secondary"
            className="text-xs font-normal bg-black/40 text-white border-0 backdrop-blur-sm"
          >
            {primaryGenre}
          </Badge>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium truncate">{name}</h3>
            </div>
            <p className="text-sm text-muted-foreground">@{username}</p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center text-sm">
              <Users className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>{formatFollowers(followers)}</span>
            </div>
            
            <div className="flex items-center text-sm justify-self-end">
              <Heart className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>{engagement.toFixed(1)}%</span>
            </div>
            
            <div className="flex items-center text-sm">
              <DollarSign className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span>${price}</span>
            </div>
            
            <div className="flex items-center text-sm justify-self-end">
              <MapPin className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
              <span className="truncate max-w-[80px]">{location}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InfluencerCard;
