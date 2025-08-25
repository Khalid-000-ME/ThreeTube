"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Upload, Wallet, Menu, User, Moon, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "@/components/theme-provider"
import Link from "next/link"

export function Navbar() {
  const [isWalletConnected, setIsWalletConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [tokenBalance, setTokenBalance] = useState("0")
  const { theme, setTheme } = useTheme()

  const connectWallet = async () => {
    if (typeof window !== "undefined" && (window as any).ethereum) {
      try {
        // Simulate wallet connection
        setIsWalletConnected(true)
        setWalletAddress("0x1234...5678")
        setTokenBalance("1,250")
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      alert("Please install MetaMask to connect your wallet")
    }
  }

  const disconnectWallet = () => {
    setIsWalletConnected(false)
    setWalletAddress("")
    setTokenBalance("0")
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border px-4 py-3">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-black text-sm">3T</span>
            </div>
            <h1 className="font-logo font-[1000] text-3xl text-foreground tracking-wide">ThreeTube</h1>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex flex-1 max-w-2xl mx-8">
          <div className="relative w-full">
            <Input
              placeholder="Search videos, creators, or topics..."
              className="pr-12 bg-input border-border focus:ring-ring"
            />
            <Button
              size="sm"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-primary hover:bg-primary/90"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-3">
          {/* Token Balance (when connected) */}
          {isWalletConnected && (
            <Badge variant="secondary" className="hidden sm:flex items-center space-x-1">
              <span className="text-xs font-medium">$TUBE:</span>
              <span className="font-semibold">{tokenBalance}</span>
            </Badge>
          )}

          <Button onClick={toggleTheme} variant="ghost" size="sm" className="hidden sm:flex">
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>

          {/* Upload Button */}
          <Link href="/upload">
            <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2 bg-transparent">
              <Upload className="h-4 w-4" />
              <span>Upload</span>
            </Button>
          </Link>

          {/* Wallet Connection */}
          {!isWalletConnected ? (
            <Button
              onClick={connectWallet}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              size="sm"
            >
              <Wallet className="h-4 w-4 mr-2" />
              Connect Wallet
            </Button>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="hidden sm:flex items-center space-x-2 bg-transparent">
                <User className="h-4 w-4" />
                <span className="text-xs">{walletAddress}</span>
              </Button>
              <Button
                onClick={disconnectWallet}
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                Disconnect
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden mt-3">
        <div className="relative">
          <Input placeholder="Search videos..." className="pr-12 bg-input border-border" />
          <Button
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 p-0 bg-primary hover:bg-primary/90"
          >
            <Search className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
