
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

  // Generate initials for fallback avatar
  const getInitials = () => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  // Determine genre color class
  const getGenreColorClass = (genre: string) => {
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
    
    return genreColors[genre.toLowerCase()] || 'from-gray-500 to-gray-600';
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden animate-scale-in sm:rounded-xl rounded-t-xl max-h-[90vh] overflow-y-auto">
        <DialogClose className="absolute right-4 top-4 z-50 bg-black/30 backdrop-blur-md rounded-full p-1.5 hover:bg-black/50 transition-colors border border-white/20 shadow-lg">
          <X className="h-5 w-5 text-white" />
          <span className="sr-only">Close</span>
        </DialogClose>
        
        {/* Cover Section with gradient background */}
        <div className="relative h-48 bg-gradient-to-r from-primary/20 via-secondary/30 to-primary/10 overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBvcGFjaXR5PSIuMDUiPjxjaXJjbGUgY3g9IjEiIGN5PSIxIiByPSIxIi8+PC9nPjwvc3ZnPg==')] opacity-50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
          <div className="absolute left-1/2 -bottom-16 -translate-x-1/2 transform transition-all animate-fade-in">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-background shadow-xl overflow-hidden 
                            bg-gradient-to-br from-secondary/80 to-secondary flex items-center justify-center">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt={name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                      (e.target as HTMLImageElement).parentElement!.classList.add('flex', 'items-center', 'justify-center', 'text-white', 'font-bold', 'text-2xl');
                      (e.target as HTMLImageElement).parentElement!.innerHTML = getInitials();
                    }}
                  />
                ) : (
                  <span className="text-white font-bold text-2xl">{getInitials()}</span>
                )}
              </div>
              {isVerified && (
                <span className="absolute bottom-1 right-2 bg-primary text-white p-1.5 rounded-full shadow-lg animate-pulse-subtle">
                  <BadgeCheck className="h-4 w-4" />
                </span>
              )}
            </div>
          </div>
        </div>
        
        {/* Profile Info */}
        <div className="px-6 pt-20 pb-6 text-center">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center justify-center gap-1 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              {name}
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">@{username}</p>
          
          <div className="flex justify-center gap-2 mt-3 flex-wrap">
            <Badge 
              variant="outline"
              className={`bg-gradient-to-r text-white font-semibold px-2.5 py-1 ${getGenreColorClass(primaryGenre)}`}
            >
              {primaryGenre}
            </Badge>
            {secondaryGenres && secondaryGenres.map((genre) => (
              <Badge 
                key={genre} 
                variant="outline"
                className="text-xs font-medium bg-secondary/50 backdrop-blur-sm"
              >
                {genre}
              </Badge>
            ))}
          </div>
          
          <div className="flex items-center justify-center gap-2 mt-3 text-sm text-muted-foreground flex-wrap">
            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1 text-amber-500" />
              <span>{location}</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-muted-foreground"></div>
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1 text-blue-400" />
              <span>Joined {joinedDate}</span>
            </div>
          </div>
          
          <p className="mt-4 text-sm max-w-lg mx-auto text-balance">{bio}</p>
          
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col items-center">
              <div className="text-lg font-medium text-blue-600 dark:text-blue-400">{formatFollowers(followers)}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Users className="h-3 w-3 mr-1 text-blue-500" />
                Followers
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-medium text-rose-600 dark:text-rose-400">{engagement.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Heart className="h-3 w-3 mr-1 text-rose-500" />
                Engagement
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-lg font-medium text-amber-600 dark:text-amber-400">{postsPerWeek}</div>
              <div className="text-xs text-muted-foreground flex items-center">
                <Calendar className="h-3 w-3 mr-1 text-amber-500" />
                Posts/Week
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Tabs Section */}
        <Tabs defaultValue="stats" className="px-6 py-4">
          <TabsList className="grid grid-cols-3 bg-secondary/30 backdrop-blur-sm">
            <TabsTrigger value="stats" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground transition-all">Statistics</TabsTrigger>
            <TabsTrigger value="pricing" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground transition-all">Pricing</TabsTrigger>
            <TabsTrigger value="collaborations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-primary-foreground transition-all">Collaborations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stats" className="space-y-4 mt-4 animate-fade-in">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg p-3 border border-muted/30 shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Heart className="h-3.5 w-3.5 mr-1 text-rose-500" />
                  <span>Average Likes</span>
                </div>
                <div className="text-lg font-medium text-rose-600 dark:text-rose-400">{formatFollowers(avgLikes)}</div>
              </div>
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg p-3 border border-muted/30 shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <MessageCircle className="h-3.5 w-3.5 mr-1 text-blue-500" />
                  <span>Average Comments</span>
                </div>
                <div className="text-lg font-medium text-blue-600 dark:text-blue-400">{formatFollowers(avgComments)}</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg p-3 border border-muted/30 shadow-sm">
              <div className="flex items-center text-sm text-muted-foreground mb-1">
                <BarChart2 className="h-3.5 w-3.5 mr-1 text-primary" />
                <span>Engagement Trend</span>
              </div>
              <div className="h-24 flex items-end justify-between gap-1 pt-4">
                {[3.2, 4.1, 3.8, 4.5, 5.2, 4.8, 5.6].map((value, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-primary/90 to-primary/70 w-full rounded-t shadow-sm hover:from-primary hover:to-primary/80 transition-all hover:-translate-y-0.5 cursor-pointer"
                    style={{ height: `${(value / 6) * 100}%`, transition: 'all 0.2s ease', animationDelay: `${i * 100}ms` }}
                  ></div>
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>7 days ago</span>
                <span>Today</span>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="pricing" className="space-y-4 mt-4 animate-fade-in">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg p-3 border border-muted/30 shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Instagram className="h-3.5 w-3.5 mr-1 text-purple-500" />
                  <span>Per Post</span>
                </div>
                <div className="text-lg font-medium text-purple-600 dark:text-purple-400">${price}</div>
              </div>
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg p-3 border border-muted/30 shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <Clock className="h-3.5 w-3.5 mr-1 text-blue-500" />
                  <span>Per Story</span>
                </div>
                <div className="text-lg font-medium text-blue-600 dark:text-blue-400">${pricePerStory}</div>
              </div>
              <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg p-3 border border-muted/30 shadow-sm">
                <div className="flex items-center text-sm text-muted-foreground mb-1">
                  <DollarSign className="h-3.5 w-3.5 mr-1 text-emerald-500" />
                  <span>Per Reel</span>
                </div>
                <div className="text-lg font-medium text-emerald-600 dark:text-emerald-400">${pricePerReel}</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg p-3 border border-muted/30 shadow-sm">
              <div className="flex items-center text-sm text-muted-foreground mb-2">
                <DollarSign className="h-3.5 w-3.5 mr-1 text-primary" />
                <span>Package Deals</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span>3 Posts + 5 Stories</span>
                  <span className="font-medium text-primary">${Math.round(price * 3 * 0.9 + pricePerStory * 5 * 0.8)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>1 Reel + 3 Stories</span>
                  <span className="font-medium text-primary">${Math.round(pricePerReel * 0.95 + pricePerStory * 3 * 0.8)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Full Campaign (5 Posts, 1 Reel, 10 Stories)</span>
                  <span className="font-medium text-primary">${Math.round((price * 5 + pricePerReel + pricePerStory * 10) * 0.7)}</span>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="collaborations" className="mt-4 animate-fade-in">
            {pastCollaborations && pastCollaborations.length > 0 ? (
              <div className="space-y-3">
                {pastCollaborations.map((collab, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 p-3 bg-gradient-to-br from-muted/50 to-muted/30 backdrop-blur-sm rounded-lg border border-muted/30 shadow-sm
                              hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-pointer"
                  >
                    <div className="h-10 w-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5 shadow-inner">
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
                    <Badge variant="outline" className="text-xs bg-gradient-to-r from-pink-500 to-purple-500 text-white">
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
        
        <div className="p-4 flex gap-3 border-t bg-gradient-to-b from-background to-muted/10">
          <Button
            variant="outline"
            className="flex-1 hover:border-primary/30 transition-all hover:shadow-sm active:scale-95"
            onClick={() => window.open(`https://instagram.com/${username}`, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Visit Profile
          </Button>
          <Button 
            variant="secondary" 
            className="flex-1 shadow-sm hover:shadow-md transition-all active:scale-95 bg-gradient-to-r from-secondary to-secondary/90 hover:from-secondary/90 hover:to-secondary"
            onClick={handleAddToDeal}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add to Deals
          </Button>
          <Button 
            className="flex-1 shadow-sm hover:shadow-md transition-all active:scale-95 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
            onClick={handleConnect}
          >
            <Mail className="h-4 w-4 mr-2" />
            Connect
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default InfluencerModal;
