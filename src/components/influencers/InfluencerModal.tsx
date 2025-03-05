import React from "react";
import {
  MapPin,
  Users,
  Heart,
  Calendar,
  MessageCircle,
  DollarSign,
  BadgeCheck,
  ExternalLink,
  Plus,
  Mail,
  X,
  BarChart2,
  Clock,
  Instagram
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Influencer } from "@/hooks/useInfluencers";
import { toast } from "sonner";

interface InfluencerModalProps {
  influencer: Influencer | null;
  isOpen: boolean;
  onClose: () => void;
}

const InfluencerModal = ({ influencer, isOpen, onClose }: InfluencerModalProps) => {
  if (!influencer) return null;

  const {
    name,
    username,
    profilePicture,
    isVerified,
    followers,
    engagement,
    price,
    location,
    bio,
    primaryGenre,
    secondaryGenres,
    postsPerWeek,
    avgLikes,
    avgComments,
    pastCollaborations,
    pricePerStory,
    pricePerReel,
    joinedDate,
  } = influencer;

  const handleAddToDeal = () => {
    toast.success(`Added ${name} to your deals`, {
      description: "You can manage this in your Deals dashboard"
    });
    onClose();
  };

  const handleConnect = () => {
    toast.success(`Connection request sent to ${name}`, {
      description: "You'll be notified when they respond"
    });
    onClose();
  };
  
  const formatFollowers = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(0)}K`;
    return count.toString();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden animate-scale-in">
        <DialogClose className="absolute right-4 top-4 z-50 bg-black/30 backdrop-blur-md rounded-full p-1.5 hover:bg-black/50 transition-colors">
          <X className="h-4 w-4 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        {/* Cover Section */}
        <div className="relative h-48 bg-gradient-to-r from-primary/20 to-primary/10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">
            <div className="relative">
              <img
                src={profilePicture}
                alt={name}
                className="w-32 h-32 rounded-full border-4 border-background object-cover"
              />
              {isVerified && (
                <span className="absolute bottom-1 right-2 bg-primary text-white p-1 rounded-full">
                  <BadgeCheck className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pt-20 pb-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold flex items-center justify-center gap-1">
              {name}
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">@{username}</p>
          
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            <Badge variant="secondary">{primaryGenre}</Badge>
            {secondaryGenres && secondaryGenres.map((genre) => (
              <Badge key={genre} variant="outline">{genre}</Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              <span>{location}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Joined {joinedDate}</span>
            </div>
          </div>
          
          <p className="mt-4 text-sm max-w-lg mx-auto text-balance">{bio}</p>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center">
              <div className="text-lg font-medium">{formatFollowers(followers)}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Users className="h-3 w-3 mr-1" />
                Followers
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-medium">{engagement.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Heart className="h-3 w-3 mr-1" />
                Engagement
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-medium">{postsPerWeek}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                Posts/Week
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Tabs Section */}
        <Tabs defaultValue="stats" className="px-6 py-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="stats">Statistics</TabsTrigger>
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="collaborations">Collaborations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Heart className="h-3.5 w-3.5 mr-1" />
                  <span>Average Likes</span>
                </div>
                <div className="text-lg font-medium">{formatFollowers(avgLikes)}</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MessageCircle className="h-3.5 w-3.5 mr-1" />
                  <span>Average Comments</span>
                </div>
                <div className="text-lg font-medium">{formatFollowers(avgComments)}</div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <BarChart2 className="h-3.5 w-3.5 mr-1" />
                <span>Engagement Trend</span>
              </div>
              <div className="h-24 flex items-end justify-between gap-1 pt-4">
                {[3.2, 4.1, 3.8, 4.5, 5.2, 4.8, 5.6].map((value, i) => (
                  <div
                    key={i}
                    className="bg-primary/80 w-full rounded-t"
                    style={{ height: `${(value / 6) * 100}%` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>7 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-4 mt-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Instagram className="h-3.5 w-3.5 mr-1" />
                  <span>Per Post</span>
                </div>
                <div className="text-lg font-medium">${price}</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Clock className="h-3.5 w-3.5 mr-1" />
                  <span>Per Story</span>
                </div>
                <div className="text-lg font-medium">${pricePerStory}</div>
              </div>
              <div className="bg-muted/50 rounded-lg p-3">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <DollarSign className="h-3.5 w-3.5 mr-1" />
                  <span>Per Reel</span>
                </div>
                <div className="text-lg font-medium">${pricePerReel}</div>
              </div>
            </div>
            
            <div className="bg-muted/50 rounded-lg p-3">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <DollarSign className="h-3.5 w-3.5 mr-1" />
                <span>Package Deals</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>3 Posts + 5 Stories</span>
                  <span className="font-medium">${Math.round(price * 3 * 0.9 + pricePerStory * 5 * 0.8)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>1 Reel + 3 Stories</span>
                  <span className="font-medium">${Math.round(pricePerReel * 0.95 + pricePerStory * 3 * 0.8)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Full Campaign (5 Posts, 1 Reel, 10 Stories)</span>
                  <span className="font-medium">${Math.round((price * 5 + pricePerReel + pricePerStory * 10) * 0.7)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="collaborations" className="mt-4">
            {pastCollaborations && pastCollaborations.length > 0 ? (
              <div className="space-y-3">
                {pastCollaborations.map((collab, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="h-10 w-10 rounded flex items-center justify-center bg-primary/10">
                      <img
                        src={collab.logo}
                        alt={collab.brand}
                        className="h-6 w-6 object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{collab.brand}</div>
                      <div className="text-xs text-muted-foreground">{collab.date}</div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {collab.type}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-8 text-center text-muted-foreground">
                <p>No past collaborations data available</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        <div className="p-4 flex gap-3 border-t">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.open(`https://instagram.com/${username}`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Profile
          </Button>
          <Button variant="secondary" className="flex-1" onClick={handleAddToDeal}>
            <Plus className="h-4 w-4 mr-2" />
            Add to Deals
          </Button>
          <Button className="flex-1" onClick={handleConnect}>
            <Mail className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfluencerModal;
