"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Coins, TrendingUp, Eye, Calendar, Download, ExternalLink, ArrowUpRight } from "lucide-react"

const earningsData = {
  totalEarnings: "2,847.50",
  monthlyEarnings: "456.20",
  pendingPayouts: "123.45",
  totalViews: "145.2K",
  totalSubscribers: "3.2K",
  averageViewPayout: "0.0032",
}

const recentPayouts = [
  {
    id: 1,
    amount: "45.67",
    type: "View Rewards",
    date: "2024-01-15",
    txHash: "0xabcd...1234",
    status: "completed",
  },
  {
    id: 2,
    amount: "12.34",
    type: "Donations",
    date: "2024-01-14",
    txHash: "0xefgh...5678",
    status: "completed",
  },
  {
    id: 3,
    amount: "89.12",
    type: "NFT Sales",
    date: "2024-01-13",
    txHash: "0xijkl...9012",
    status: "completed",
  },
]

const topVideos = [
  {
    id: 1,
    title: "Building DApps with Next.js and Web3",
    views: "45.2K",
    earnings: "125.50",
    thumbnail: "/web3-development-tutorial.png",
  },
  {
    id: 2,
    title: "Smart Contract Security Best Practices",
    views: "67.1K",
    earnings: "234.80",
    thumbnail: "/smart-contract-security-coding.png",
  },
  {
    id: 3,
    title: "DeFi Protocols Explained Simply",
    views: "89.3K",
    earnings: "445.20",
    thumbnail: "/defi-protocols-explanation.png",
  },
]

export function EarningsDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")

  const handleWithdraw = () => {
    console.log("Initiating withdrawal to wallet...")
    // In production, this would trigger smart contract withdrawal
  }

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
            <Coins className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsData.totalEarnings} $TUBE</div>
            <p className="text-xs text-muted-foreground">
              ≈ ${(Number.parseFloat(earningsData.totalEarnings) * 0.85).toFixed(2)} USD
            </p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsData.monthlyEarnings} $TUBE</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsData.pendingPayouts} $TUBE</div>
            <p className="text-xs text-muted-foreground">Next payout in 3 days</p>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. per View</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{earningsData.averageViewPayout} $TUBE</div>
            <div className="flex items-center text-xs text-green-600">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +5.2% this week
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="videos">Top Videos</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Earnings Progress */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Monthly Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Views Goal</span>
                    <span>45.2K / 50K</span>
                  </div>
                  <Progress value={90.4} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Earnings Goal</span>
                    <span>456.20 / 500 $TUBE</span>
                  </div>
                  <Progress value={91.2} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subscribers Goal</span>
                    <span>3.2K / 5K</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button onClick={handleWithdraw} className="w-full justify-start">
                  <Download className="h-4 w-4 mr-2" />
                  Withdraw Earnings ({earningsData.pendingPayouts} $TUBE)
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View on Blockchain Explorer
                </Button>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Analytics Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="payouts" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Recent Payouts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentPayouts.map((payout) => (
                  <div
                    key={payout.id}
                    className="flex items-center justify-between p-4 border border-border rounded-lg"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{payout.amount} $TUBE</span>
                        <Badge variant="secondary">{payout.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{payout.date}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {payout.status}
                      </Badge>
                      <p className="text-xs text-muted-foreground font-mono">{payout.txHash}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="videos" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Top Earning Videos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topVideos.map((video) => (
                  <div key={video.id} className="flex items-center space-x-4 p-4 border border-border rounded-lg">
                    <img
                      src={video.thumbnail || "/placeholder.svg"}
                      alt={video.title}
                      className="w-20 h-12 object-cover rounded"
                    />
                    <div className="flex-1 space-y-1">
                      <h4 className="font-medium line-clamp-1">{video.title}</h4>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{video.views} views</span>
                        <span>{video.earnings} $TUBE earned</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="bg-transparent">
                      View Details
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle>Revenue Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Advanced Analytics Coming Soon</h3>
                <p className="text-muted-foreground">
                  Detailed revenue analytics, audience insights, and performance metrics will be available in the next
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
