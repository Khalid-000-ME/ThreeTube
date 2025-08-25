"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Home, TrendingUp, Clock, ThumbsUp, Bookmark, Settings, Coins, Target, BarChart3 } from "lucide-react"
import Link from "next/link"

const sidebarItems = [
  { icon: Home, label: "Home", href: "/", active: true },
  { icon: TrendingUp, label: "Trending", href: "/trending" },
  { icon: Clock, label: "Watch Later", href: "/watch-later" },
  { icon: ThumbsUp, label: "Liked Videos", href: "/liked" },
  { icon: Bookmark, label: "Saved", href: "/saved" },
]

const web3Items = [
  { icon: Coins, label: "My Earnings", href: "/earnings", badge: "1,250 $TUBE" },
  { icon: Target, label: "Ad System", href: "/ads" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
]

export function Sidebar() {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border p-4 space-y-6">
      {/* Main Navigation */}
      <div className="space-y-2">
        {sidebarItems.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button
              variant={item.active ? "default" : "ghost"}
              className={`w-full justify-start ${
                item.active
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </Button>
          </Link>
        ))}
      </div>

      <hr className="border-sidebar-border" />

      {/* Web3 Features */}
      <div className="space-y-2">
        <h3 className="text-sm font-semibold text-sidebar-foreground mb-3">Web3 Features</h3>
        {web3Items.map((item) => (
          <Link key={item.label} href={item.href}>
            <Button
              variant="ghost"
              className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              <item.icon className="h-5 w-5 mr-3" />
              <span className="flex-1 text-left">{item.label}</span>
              {item.badge && (
                <Badge variant="secondary" className="text-xs">
                  {item.badge}
                </Badge>
              )}
            </Button>
          </Link>
        ))}
      </div>

      <hr className="border-sidebar-border" />

      {/* Platform Stats */}
      <Card className="p-4 bg-card border-border">
        <h4 className="font-semibold text-card-foreground mb-3">Platform Stats</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Total Videos:</span>
            <span className="font-medium">12,450</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Active Creators:</span>
            <span className="font-medium">3,280</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">$TUBE Distributed:</span>
            <span className="font-medium text-primary">2.4M</span>
          </div>
        </div>
      </Card>

      {/* Settings */}
      <Button
        variant="ghost"
        className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
      >
        <Settings className="h-5 w-5 mr-3" />
        Settings
      </Button>
    </aside>
  )
}
