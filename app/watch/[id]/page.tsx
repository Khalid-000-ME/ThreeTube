import { Navbar } from "@/components/navbar"
import { VideoPlayer } from "@/components/video-player"
import { VideoInfo } from "@/components/video-info"
import { VideoRecommendations } from "@/components/video-recommendations"
import { CommentSection } from "@/components/comment-section"

// Mock video data - in production this would come from blockchain/IPFS
const getVideoData = (id: string) => {
  const videos = [
    {
      id: 1,
      title: "Building DApps with Next.js and Web3",
      creator: "CryptoDevs",
      creatorAddress: "0x1234...5678",
      views: "45.2K",
      likes: "2.1K",
      duration: "12:34",
      videoUrl: "/sample-video.mp4",
      thumbnail: "/web3-development-tutorial.png",
      earnings: "125 $TUBE",
      creatorAvatar: "/developer-avatar.png",
      uploadTime: "2 hours ago",
      description:
        "Learn how to build decentralized applications using Next.js and Web3 technologies. This comprehensive tutorial covers smart contract integration, wallet connectivity, and IPFS storage.",
      category: "Education",
      tags: ["web3", "nextjs", "blockchain", "tutorial"],
      nftTokenId: "1234",
      ipfsHash: "QmX1234567890abcdef",
    },
    // Add more mock videos as needed
  ]

  return videos.find((v) => v.id === Number.parseInt(id)) || videos[0]
}

export default function WatchPage({ params }: { params: { id: string } }) {
  const video = getVideoData(params.id)

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Video Content */}
          <div className="lg:col-span-2 space-y-6">
            <VideoPlayer video={video} />
            <VideoInfo video={video} />
            <CommentSection videoId={video.id} />
          </div>

          {/* Sidebar Recommendations */}
          <div className="lg:col-span-1">
            <VideoRecommendations currentVideoId={video.id} />
          </div>
        </div>
      </div>
    </div>
  )
}
