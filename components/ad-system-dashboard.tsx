"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { DollarSign, Target, Eye, TrendingUp, Plus, Play, Pause, BarChart3 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface AdCampaign {
  id: number
  title: string
  budget: string
  spent: string
  impressions: number
  clicks: number
  ctr: number
  status: "active" | "paused" | "completed"
  targetCategory: string
  bidAmount: string
  endDate: string
}

const mockCampaigns: AdCampaign[] = [
  {
    id: 1,
    title: "Web3 Development Course",
    budget: "50.0",
    spent: "23.5",
    impressions: 12450,
    clicks: 342,
    ctr: 2.75,
    status: "active",
    targetCategory: "Education",
    bidAmount: "0.002",
    endDate: "2024-02-15",
  },
  {
    id: 2,
    title: "DeFi Trading Platform",
    budget: "100.0",
    spent: "67.8",
    impressions: 28900,
    clicks: 891,
    ctr: 3.08,
    status: "active",
    targetCategory: "DeFi",
    bidAmount: "0.0035",
    endDate: "2024-02-20",
  },
]

const adStats = {
  totalSpent: "91.3",
  totalImpressions: "41.35K",
  averageCTR: "2.91%",
  activeCampaigns: 2,
}

export function AdSystemDashboard() {
  const [campaigns, setCampaigns] = useState<AdCampaign[]>(mockCampaigns)
  const [newCampaign, setNewCampaign] = useState({
    title: "",
    budget: "",
    bidAmount: "",
    targetCategory: "",
    description: "",
    duration: "7",
  })

  const handleCreateCampaign = async () => {
    if (!newCampaign.title || !newCampaign.budget || !newCampaign.bidAmount) return

    console.log("Creating ad campaign:", newCampaign)

    // Simulate campaign creation
    const campaign: AdCampaign = {
      id: campaigns.length + 1,
      title: newCampaign.title,
      budget: newCampaign.budget,
      spent: "0",
      impressions: 0,
      clicks: 0,
      ctr: 0,
      status: "active",
      targetCategory: newCampaign.targetCategory,
      bidAmount: newCampaign.bidAmount,
      endDate: new Date(Date.now() + Number.parseInt(newCampaign.duration) * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
    }

    setCampaigns([...campaigns, campaign])
    setNewCampaign({
      title: "",
      budget: "",
      bidAmount: "",
      targetCategory: "",
      description: "",
      duration: "7",
    })
  }

  const toggleCampaignStatus = (campaignId: number) => {
    setCampaigns(
      campaigns.map((campaign) =>
        campaign.id === campaignId
          ? { ...campaign, status: campaign.status === "active" ? "paused" : "active" }
          : campaign,
      ),
    )
  }

  const getStatusColor = (status: AdCampaign["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-500"
      case "paused":
        return "bg-yellow-500"
      case "completed":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Ad Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adStats.totalSpent} $TUBE</div>
            <p className="text-xs text-muted-foreground">
              ≈ ${(Number.parseFloat(adStats.totalSpent) * 0.85).toFixed(2)} USD
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adStats.totalImpressions}</div>
            <p className="text-xs text-green-600">+15.2% from last week</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average CTR</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adStats.averageCTR}</div>
            <p className="text-xs text-green-600">Above industry average</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Campaigns</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{adStats.activeCampaigns}</div>
            <p className="text-xs text-muted-foreground">2 running, 0 paused</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="create">Create Ad</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-6">
          <div className="space-y-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge className={`${getStatusColor(campaign.status)} text-white`}>
                          {campaign.status === "active" ? (
                            <Play className="h-3 w-3 mr-1" />
                          ) : (
                            <Pause className="h-3 w-3 mr-1" />
                          )}
                          {campaign.status}
                        </Badge>
                        <Badge variant="outline">{campaign.targetCategory}</Badge>
                      </div>
                      <CardTitle className="text-xl">{campaign.title}</CardTitle>
                    </div>
                    <Button
                      onClick={() => toggleCampaignStatus(campaign.id)}
                      variant="outline"
                      size="sm"
                      className="bg-transparent"
                    >
                      {campaign.status === "active" ? "Pause" : "Resume"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Budget Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Budget Used</span>
                      <span>
                        {campaign.spent} / {campaign.budget} $TUBE
                      </span>
                    </div>
                    <Progress
                      value={(Number.parseFloat(campaign.spent) / Number.parseFloat(campaign.budget)) * 100}
                      className="h-2"
                    />
                  </div>

                  {/* Performance Metrics */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Impressions</p>
                      <p className="font-semibold">{campaign.impressions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Clicks</p>
                      <p className="font-semibold">{campaign.clicks}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">CTR</p>
                      <p className="font-semibold">{campaign.ctr}%</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Bid Amount</p>
                      <p className="font-semibold">{campaign.bidAmount} $TUBE</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs text-muted-foreground">
                    <span>Ends: {campaign.endDate}</span>
                    <Button variant="ghost" size="sm" className="h-auto p-0">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Create New Ad Campaign</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <Alert>
                <Target className="h-4 w-4" />
                <AlertDescription>
                  Ads are reviewed by the community through DAO governance to ensure quality and relevance. Approved ads
                  participate in decentralized auctions for placement.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="campaign-title">Campaign Title</Label>
                    <Input
                      id="campaign-title"
                      value={newCampaign.title}
                      onChange={(e) => setNewCampaign((prev) => ({ ...prev, title: e.target.value }))}
                      placeholder="Enter campaign name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget ($TUBE)</Label>
                    <Input
                      id="budget"
                      type="number"
                      step="0.1"
                      value={newCampaign.budget}
                      onChange={(e) => setNewCampaign((prev) => ({ ...prev, budget: e.target.value }))}
                      placeholder="50.0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bid-amount">Bid per Impression ($TUBE)</Label>
                    <Input
                      id="bid-amount"
                      type="number"
                      step="0.001"
                      value={newCampaign.bidAmount}
                      onChange={(e) => setNewCampaign((prev) => ({ ...prev, bidAmount: e.target.value }))}
                      placeholder="0.002"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="target-category">Target Category</Label>
                    <Select
                      value={newCampaign.targetCategory}
                      onValueChange={(value) => setNewCampaign((prev) => ({ ...prev, targetCategory: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="DeFi">DeFi</SelectItem>
                        <SelectItem value="NFT">NFT</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="Entertainment">Entertainment</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Campaign Duration</Label>
                    <Select
                      value={newCampaign.duration}
                      onValueChange={(value) => setNewCampaign((prev) => ({ ...prev, duration: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="3">3 days</SelectItem>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="14">14 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Ad Description</Label>
                <Textarea
                  id="description"
                  value={newCampaign.description}
                  onChange={(e) => setNewCampaign((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Describe your ad content and target audience..."
                  rows={4}
                />
              </div>

              <Button
                onClick={handleCreateCampaign}
                disabled={!newCampaign.title || !newCampaign.budget || !newCampaign.bidAmount}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Ad Performance Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed performance metrics, audience insights, and ROI analysis will be available in the next
                  update.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
