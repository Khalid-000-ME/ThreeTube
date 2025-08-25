"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Coins, Heart, Gift, Loader2, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface DonationModalProps {
  creator: {
    name: string
    address: string
    avatar: string
  }
  children: React.ReactNode
}

const presetAmounts = [
  { amount: "0.01", label: "☕ Coffee", description: "Buy me a coffee" },
  { amount: "0.05", label: "🍕 Pizza", description: "Support my work" },
  { amount: "0.1", label: "🚀 Boost", description: "Love your content!" },
  { amount: "0.5", label: "💎 Premium", description: "Amazing creator!" },
]

export function DonationModal({ creator, children }: DonationModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState("")
  const [customAmount, setCustomAmount] = useState("")
  const [message, setMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [txHash, setTxHash] = useState("")

  const donationAmount = selectedAmount || customAmount

  const handleDonate = async () => {
    if (!donationAmount || Number.parseFloat(donationAmount) <= 0) return

    setIsProcessing(true)

    try {
      // Simulate blockchain transaction
      await new Promise((resolve) => setTimeout(resolve, 3000))

      // Mock transaction hash
      const mockTxHash = `0x${Math.random().toString(16).substring(2, 66)}`
      setTxHash(mockTxHash)
      setIsComplete(true)

      console.log("Donation sent:", {
        amount: donationAmount,
        recipient: creator.address,
        message,
        txHash: mockTxHash,
      })
    } catch (error) {
      console.error("Donation failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const resetModal = () => {
    setSelectedAmount("")
    setCustomAmount("")
    setMessage("")
    setIsProcessing(false)
    setIsComplete(false)
    setTxHash("")
  }

  const handleClose = () => {
    setIsOpen(false)
    setTimeout(resetModal, 300) // Reset after modal closes
  }

  if (isComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4 py-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <div>
              <h3 className="text-xl font-semibold">Donation Sent!</h3>
              <p className="text-muted-foreground mt-2">
                Your donation of {donationAmount} ETH has been sent to {creator.name}
              </p>
            </div>

            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex justify-between text-sm">
                <span>Transaction Hash:</span>
                <code className="text-xs bg-background px-2 py-1 rounded">{txHash.substring(0, 20)}...</code>
              </div>
              <div className="flex justify-between text-sm">
                <span>Network:</span>
                <span>Ethereum (Testnet)</span>
              </div>
            </div>

            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>Support Creator</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Creator Info */}
          <div className="flex items-center space-x-3 p-4 bg-muted rounded-lg">
            <Avatar className="h-12 w-12">
              <AvatarImage src={creator.avatar || "/placeholder.svg"} alt={creator.name} />
              <AvatarFallback>{creator.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold">{creator.name}</h4>
              <p className="text-sm text-muted-foreground">{creator.address}</p>
            </div>
          </div>

          {/* Preset Amounts */}
          <div className="space-y-3">
            <Label>Quick Amounts</Label>
            <div className="grid grid-cols-2 gap-3">
              {presetAmounts.map((preset) => (
                <Button
                  key={preset.amount}
                  variant={selectedAmount === preset.amount ? "default" : "outline"}
                  className="h-auto p-3 flex flex-col items-start"
                  onClick={() => {
                    setSelectedAmount(preset.amount)
                    setCustomAmount("")
                  }}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{preset.label}</span>
                    <Badge variant="secondary">{preset.amount} ETH</Badge>
                  </div>
                  <span className="text-xs text-muted-foreground">{preset.description}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Amount */}
          <div className="space-y-2">
            <Label htmlFor="custom-amount">Custom Amount (ETH)</Label>
            <Input
              id="custom-amount"
              type="number"
              step="0.001"
              placeholder="0.01"
              value={customAmount}
              onChange={(e) => {
                setCustomAmount(e.target.value)
                setSelectedAmount("")
              }}
            />
          </div>

          {/* Message */}
          <div className="space-y-2">
            <Label htmlFor="message">Message (Optional)</Label>
            <Textarea
              id="message"
              placeholder="Leave a message for the creator..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Transaction Info */}
          {donationAmount && (
            <Alert>
              <Coins className="h-4 w-4" />
              <AlertDescription>
                You're about to send {donationAmount} ETH (≈ ${(Number.parseFloat(donationAmount) * 2500).toFixed(2)})
                to {creator.name}
              </AlertDescription>
            </Alert>
          )}

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              Cancel
            </Button>
            <Button
              onClick={handleDonate}
              disabled={!donationAmount || Number.parseFloat(donationAmount) <= 0 || isProcessing}
              className="flex-1"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Gift className="h-4 w-4 mr-2" />
                  Send Donation
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
