"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ThumbsUp, ThumbsDown, Reply, Shield, MessageCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Comment {
  id: number
  author: string
  authorAddress: string
  authorAvatar: string
  content: string
  timestamp: string
  likes: number
  dislikes: number
  isVerified: boolean
  zkProofVerified: boolean
}

const mockComments: Comment[] = [
  {
    id: 1,
    author: "Web3Developer",
    authorAddress: "0xabcd...1234",
    authorAvatar: "/developer-avatar.png",
    content:
      "Great tutorial! The explanation of smart contract integration was really clear. Thanks for sharing this knowledge with the community.",
    timestamp: "2 hours ago",
    likes: 12,
    dislikes: 0,
    isVerified: true,
    zkProofVerified: true,
  },
  {
    id: 2,
    author: "BlockchainNewbie",
    authorAddress: "0xefgh...5678",
    authorAvatar: "/blockchain-expert-avatar.png",
    content:
      "This is exactly what I needed to understand Web3 development. The step-by-step approach makes it easy to follow along.",
    timestamp: "4 hours ago",
    likes: 8,
    dislikes: 1,
    isVerified: false,
    zkProofVerified: true,
  },
]

interface CommentSectionProps {
  videoId: number
}

export function CommentSection({ videoId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(mockComments)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)

    // Simulate zkProof verification and comment submission
    try {
      // In production, this would:
      // 1. Generate zkProof that user watched 50% of video
      // 2. Submit proof and comment to smart contract
      // 3. Verify proof on-chain before accepting comment

      await new Promise((resolve) => setTimeout(resolve, 2000)) // Simulate proof generation

      const comment: Comment = {
        id: comments.length + 1,
        author: "CurrentUser",
        authorAddress: "0x1234...5678",
        authorAvatar: "/placeholder.svg",
        content: newComment,
        timestamp: "Just now",
        likes: 0,
        dislikes: 0,
        isVerified: true,
        zkProofVerified: true,
      }

      setComments([comment, ...comments])
      setNewComment("")
    } catch (error) {
      console.error("Failed to submit comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleLikeComment = (commentId: number) => {
    setComments(
      comments.map((comment) => (comment.id === commentId ? { ...comment, likes: comment.likes + 1 } : comment)),
    )
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <MessageCircle className="h-5 w-5" />
          <span>{comments.length} Comments</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Comment Input */}
        <div className="space-y-4">
          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Comments require zkProof verification that you've watched at least 50% of the video to prevent spam.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <Textarea
              placeholder="Add a comment... (zkProof verification required)"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows={3}
              className="bg-input border-border"
            />
            <div className="flex justify-end">
              <Button
                onClick={handleSubmitComment}
                disabled={!newComment.trim() || isSubmitting}
                className="bg-primary hover:bg-primary/90"
              >
                {isSubmitting ? "Verifying & Posting..." : "Comment"}
              </Button>
            </div>
          </div>
        </div>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <div key={comment.id} className="space-y-3">
              <div className="flex space-x-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={comment.authorAvatar || "/placeholder.svg"} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-card-foreground">{comment.author}</span>
                    <span className="text-xs text-muted-foreground">{comment.authorAddress}</span>
                    {comment.zkProofVerified && (
                      <Badge variant="secondary" className="text-xs">
                        <Shield className="h-3 w-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                  </div>

                  <p className="text-card-foreground">{comment.content}</p>

                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLikeComment(comment.id)}
                      className="text-muted-foreground hover:text-foreground p-0 h-auto"
                    >
                      <ThumbsUp className="h-4 w-4 mr-1" />
                      {comment.likes}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground p-0 h-auto"
                    >
                      <ThumbsDown className="h-4 w-4 mr-1" />
                      {comment.dislikes}
                    </Button>

                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-muted-foreground hover:text-foreground p-0 h-auto"
                    >
                      <Reply className="h-4 w-4 mr-1" />
                      Reply
                    </Button>
                  </div>
                </div>
              </div>

              {comment.id < comments.length && <hr className="border-border" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
