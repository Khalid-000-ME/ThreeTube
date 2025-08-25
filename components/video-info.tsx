"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { ThumbsUp, ThumbsDown, Share2, Download, Flag, Coins, Eye, Calendar, Tag } from "lucide-react"
import { DonationModal } from "./donation-modal"

interface VideoInfoProps {
  video: {
    id: number
    title: string
    creator: string
    creatorAddress: string
    creatorAvatar: string
    views: string
    likes: string
    uploadTime: string
    description: string
    category: string
    tags: string[]
    earnings: string
    nftTokenId: string
    ipfsHash: string
  }
}

export function VideoInfo({ video }: VideoInfoProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isDisliked, setIsDisliked] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [showFullDescription, setShowFullDescription] = useState(false)

  const handleLike = async () => {
    // In production, this would interact with smart contracts
    setIsLiked(!isLiked)
    if (isDisliked) setIsDisliked(false)
    console.log("Like recorded on blockchain")
  }

  const handleDislike = async () => {
    setIsDisliked(!isDisliked)
    if (isLiked) setIsLiked(false)
    console.log("Dislike recorded on blockchain")
  }

  const handleSubscribe = async () => {
    setIsSubscribed(!isSubscribed)
    console.log("Subscription updated on blockchain")
  }

  return (
    <div className="space-y-6">
      {/* Video Title and Actions */}
      <div className="space-y-4">
        <h1 className="font-heading font-bold text-2xl text-foreground">{video.title}</h1>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Eye className="h-4 w-4" />
              <span>{video.views} views</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>{video.uploadTime}</span>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLike}
              className={`${isLiked ? "bg-primary text-primary-foreground" : "bg-transparent"}`}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              {video.likes}
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handleDislike}
              className={`${isDisliked ? "bg-destructive text-destructive-foreground" : "bg-transparent"}`}
            >
              <ThumbsDown className="h-4 w-4" />
            </Button>

            <Button variant="outline" size="sm" className="bg-transparent">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>

            <Button variant="outline" size="sm" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>

            <Button variant="outline" size="sm" className="bg-transparent">
              <Flag className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Creator Info */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src={video.creatorAvatar || "/placeholder.svg"} alt={video.creator} />
                <AvatarFallback>{video.creator[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-card-foreground">{video.creator}</h3>
                <p className="text-sm text-muted-foreground">{video.creatorAddress}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge variant="secondary">
                    <Coins className="h-3 w-3 mr-1" />
                    Earned: {video.earnings}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Button
                onClick={handleSubscribe}
                className={`${
                  isSubscribed
                    ? "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </Button>
              <DonationModal
                creator={{
                  name: video.creator,
                  address: video.creatorAddress,
                  avatar: video.creatorAvatar,
                }}
              >
                <Button variant="outline" className="bg-transparent">
                  <Coins className="h-4 w-4 mr-2" />
                  Donate
                </Button>
              </DonationModal>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Video Description */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {video.category}
              </Badge>
              {video.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  #{tag}
                </Badge>
              ))}
            </div>

            <div>
              <p className={`text-card-foreground ${showFullDescription ? "" : "line-clamp-3"}`}>{video.description}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 p-0 h-auto text-primary hover:text-primary/80"
              >
                {showFullDescription ? "Show less" : "Show more"}
              </Button>
            </div>

            {/* Blockchain Info */}
            <div className="border-t border-border pt-4 space-y-2">
              <h4 className="font-semibold text-sm text-card-foreground">Blockchain Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">NFT Token ID:</span>
                  <span className="ml-2 font-mono">#{video.nftTokenId}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">IPFS Hash:</span>
                  <span className="ml-2 font-mono">{video.ipfsHash}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
