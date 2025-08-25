import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Eye, Clock } from "lucide-react"
import Link from "next/link"

// Mock video data for demonstration
const mockVideos = [
  {
    id: 1,
    title: "Building DApps with Next.js and Web3",
    creator: "CryptoDevs",
    views: "45.2K",
    duration: "12:34",
    thumbnail: "/web3-development-tutorial.png",
    earnings: "125 $TUBE",
    creatorAvatar: "/developer-avatar.png",
    uploadTime: "2 hours ago",
  },
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
  {
    id: 5,
    title: "DeFi Protocols Explained Simply",
    creator: "DeFiSimple",
    views: "89.3K",
    duration: "11:07",
    thumbnail: "/defi-protocols-explanation.png",
    earnings: "445 $TUBE",
    creatorAvatar: "/defi-educator-avatar.png",
    uploadTime: "1 week ago",
  },
  {
    id: 6,
    title: "Web3 Gaming Revolution",
    creator: "GameChain",
    views: "52.7K",
    duration: "18:33",
    thumbnail: "/web3-gaming-blockchain.png",
    earnings: "287 $TUBE",
    creatorAvatar: "/gaming-developer-avatar.png",
    uploadTime: "4 days ago",
  },
]

export function VideoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockVideos.map((video) => (
        <Link key={video.id} href={`/watch/${video.id}`}>
          <Card className="group cursor-pointer hover:shadow-lg transition-all duration-200 bg-card border-border">
            <div className="relative">
              <img
                src={video.thumbnail || "/placeholder.svg"}
                alt={video.title}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {video.duration}
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-card-foreground line-clamp-2 mb-2 group-hover:text-primary transition-colors">
                {video.title}
              </h3>
              <div className="flex items-center space-x-3 mb-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={video.creatorAvatar || "/placeholder.svg"} alt={video.creator} />
                  <AvatarFallback>{video.creator[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-card-foreground truncate">{video.creator}</p>
                </div>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Eye className="h-3 w-3" />
                  <span>{video.views} views</span>
                </div>
                <span>{video.uploadTime}</span>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}
