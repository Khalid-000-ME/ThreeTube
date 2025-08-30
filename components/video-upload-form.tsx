"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, FileVideo, Loader2, CheckCircle, AlertCircle, Coins, Shield } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PinataSDK } from "pinata";

interface UploadProgress {
  stage: "idle" | "uploading" | "processing" | "minting" | "complete" | "error"
  progress: number
  message: string
}

const PINATA_GATEWAY = process.env.NEXT_PUBLIC_PINATA_GATEWAY!;

const pinata = new PinataSDK({
  pinataJwt: process.env.NEXT_PUBLIC_PINATA_JWT!, // make sure to expose via NEXT_PUBLIC
  pinataGateway: PINATA_GATEWAY,
});

export function VideoUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [CID, setCID] = useState('');
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    stage: "idle",
    progress: 0,
    message: "",
  })
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    tags: "",
    thumbnail: null as File | null,
    monetization: true,
    nftPrice: "0.1",
  })
  const [ipfsHash, setIpfsHash] = useState("")
  const [nftTokenId, setNftTokenId] = useState("")

  const fileInputRef = useRef<HTMLInputElement>(null)
  const thumbnailInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setSelectedFile(file)
      setUploadProgress({ stage: "idle", progress: 0, message: "" });
      const upload = await pinata.upload.file(file);
      setCID(upload.cid);
      const gatewayUrl = `https://${PINATA_GATEWAY}/ipfs/${CID}`;
console.log("Pinned file available at:", gatewayUrl);
    } else {
      alert("Please select a valid video file")
    }
  }

  const handleThumbnailSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("image/")) {
      setFormData((prev) => ({ ...prev, thumbnail: file }))
    }
  }

  const IPFSUpload = async (CID: string) => {
    // Simulate IPFS upload process
    setUploadProgress({ stage: "uploading", progress: 10, message: "Uploading to IPFS..." })
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setUploadProgress({ stage: "uploading", progress: 40, message: "Processing video metadata..." })
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setUploadProgress({ stage: "processing", progress: 70, message: "Generating video hash..." })
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock IPFS hash
    setIpfsHash(CID);

    setUploadProgress({ stage: "minting", progress: 85, message: "Minting NFT..." })
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock NFT token ID
    const mockTokenId = Math.floor(Math.random() * 10000).toString()
    setNftTokenId(mockTokenId)

    setUploadProgress({ stage: "complete", progress: 100, message: "Upload complete!" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedFile) {
      alert("Please select a video file")
      return
    }

    if (!formData.title.trim()) {
      alert("Please enter a video title")
      return
    }

    try {
      await IPFSUpload(CID)
    } catch (error) {
      setUploadProgress({
        stage: "error",
        progress: 0,
        message: "Upload failed. Please try again.",
      })
    }
  }

  const resetForm = () => {
    setSelectedFile(null)
    setUploadProgress({ stage: "idle", progress: 0, message: "" })
    setFormData({
      title: "",
      description: "",
      category: "",
      tags: "",
      thumbnail: null,
      monetization: true,
      nftPrice: "0.1",
    })
    setIpfsHash("")
    setNftTokenId("")
    if (fileInputRef.current) fileInputRef.current.value = ""
    if (thumbnailInputRef.current) thumbnailInputRef.current.value = ""
  }

  if (uploadProgress.stage === "complete") {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <CardTitle className="text-2xl font-heading">Upload Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">IPFS Hash:</span>
              <code className="text-sm bg-background px-2 py-1 rounded">{ipfsHash}</code>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">NFT Token ID:</span>
              <Badge variant="secondary">#{nftTokenId}</Badge>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Blockchain:</span>
              <span className="text-sm">Ethereum (Testnet)</span>
            </div>
          </div>

          <Alert>
            <Shield className="h-4 w-4" />
            <AlertDescription>
              Your video is now stored on IPFS and minted as an NFT. You have full ownership and control over your
              content.
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button onClick={resetForm} variant="outline" className="flex-1 bg-transparent">
              Upload Another Video
            </Button>
            <Button className="flex-1">View Video</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Upload Progress */}
      {uploadProgress.stage !== "idle" && uploadProgress.stage !== "error" && (
        <Card>
          <CardContent className="pt-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{uploadProgress.message}</span>
                <span className="text-sm text-muted-foreground">{uploadProgress.progress}%</span>
              </div>
              <Progress value={uploadProgress.progress} className="h-2" />
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Processing your video for the decentralized web...</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Error State */}
      {uploadProgress.stage === "error" && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{uploadProgress.message}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Upload */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileVideo className="h-5 w-5" />
              <span>Video File</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div
                className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                {selectedFile ? (
                  <div>
                    <p className="font-medium">{selectedFile.name}</p>
                    <p className="text-sm text-muted-foreground">{(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium mb-2">Click to upload video</p>
                    <p className="text-sm text-muted-foreground">Supports MP4, WebM, AVI (Max 500MB)</p>
                  </div>
                )}
              </div>
              <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileSelect} className="hidden" />
            </div>
          </CardContent>
        </Card>

        {/* Video Details */}
        <Card>
          <CardHeader>
            <CardTitle>Video Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="Enter video title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your video content"
                rows={4}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="blockchain">Blockchain</SelectItem>
                    <SelectItem value="defi">DeFi</SelectItem>
                    <SelectItem value="nft">NFT</SelectItem>
                    <SelectItem value="gaming">Gaming</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData((prev) => ({ ...prev, tags: e.target.value }))}
                  placeholder="web3, blockchain, tutorial"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thumbnail">Thumbnail (Optional)</Label>
              <Input ref={thumbnailInputRef} type="file" accept="image/*" onChange={handleThumbnailSelect} />
            </div>
          </CardContent>
        </Card>

        {/* NFT & Monetization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Coins className="h-5 w-5" />
              <span>NFT & Monetization</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div>
                <h4 className="font-medium">Mint as NFT</h4>
                <p className="text-sm text-muted-foreground">Create an NFT to prove ownership of your content</p>
              </div>
              <Badge variant="secondary">Included</Badge>
            </div>

            <div className="space-y-2">
              <Label htmlFor="nftPrice">NFT Price (ETH)</Label>
              <Input
                id="nftPrice"
                type="number"
                step="0.001"
                value={formData.nftPrice}
                onChange={(e) => setFormData((prev) => ({ ...prev, nftPrice: e.target.value }))}
                placeholder="0.1"
              />
              <p className="text-xs text-muted-foreground">Set to 0 for free minting. You can always sell later.</p>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end space-x-3">
          <Button type="button" variant="outline" onClick={resetForm}>
            Reset
          </Button>
          <Button type="submit" disabled={!selectedFile || uploadProgress.stage !== "idle"} className="min-w-32">
            {uploadProgress.stage === "idle" ? (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload & Mint NFT
              </>
            ) : (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Processing...
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}