import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Clock, Coins } from "lucide-react"
import Link from "next/link"

const recommendedVideos = [
  {
    id: 2,
    title: "The Future of Decentralized Video Platforms",
    creator: "BlockchainExplorer",
    views: "23.8K",
    duration: "8:45",
    thumbnail: "/blockchain-future.png",
    earnings: "89 $TUBE",
    creatorAvatar: "/blockchain-expert-avatar.png",
    uploadTime: "5 hours ago",
  },
  {
    id: 3,
    title: "Smart Contract Security Best Practices",
    creator: "SecureCode",
    views: "67.1K",
    duration: "15:22",
    thumbnail: "/smart-contract-security-coding.png",
    earnings: "234 $TUBE",
    creatorAvatar: "/security-expert-avatar.png",
    uploadTime: "1 day ago",
  },
  {
    id: 4,
    title: "NFT Marketplace Deep Dive",
    creator: "NFTGuru",
    views: "34.5K",
    duration: "20:18",
    thumbnail: "/nft-marketplace-interface.png",
    earnings: "156 $TUBE",
    creatorAvatar: "/nft-expert-avatar.png",
    uploadTime: "3 days ago",
  },
]

interface VideoRecommendationsProps {
  currentVideoId: number
}

export function VideoRecommendations({ currentVideoId }: VideoRecommendationsProps) {
  const filteredVideos = recommendedVideos.filter((video) => video.id !== currentVideoId)

  return (
    <div className="space-y-4">
      <h3 className="font-heading font-semibold text-lg text-foreground">Recommended</h3>

      <div className="space-y-4">
        {filteredVideos.map((video) => (
          <Link key={video.id} href={`/watch/${video.id}`}>
            <Card className="group cursor-pointer hover:shadow-md transition-all duration-200 bg-card border-border">
              <CardContent className="p-3">
                <div className="flex space-x-3">
                  <div className="relative flex-shrink-0">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-40 h-24 object-cover rounded"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 py-0.5 rounded text-xs flex items-center">
                      <Clock className="h-2 w-2 mr-1" />
                      {video.duration}
                    </div>
                    <Badge className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs">
                      <Coins className="h-2 w-2 mr-1" />
                      {video.earnings.split(" ")[0]}
                    </Badge>
                  </div>

                  <div className="flex-1 min-w-0 space-y-2">
                    <h4 className="font-medium text-sm text-card-foreground line-clamp-2 group-hover:text-primary transition-colors">
                      {video.title}
                    </h4>

                    <div className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={video.creatorAvatar || "/placeholder.svg"} alt={video.creator} />
                        <AvatarFallback className="text-xs">{video.creator[0]}</AvatarFallback>
                      </Avatar>
                      <span className="text-xs text-muted-foreground truncate">{video.creator}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-3 w-3" />
                        <span>{video.views}</span>
                      </div>
                      <span>{video.uploadTime}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
