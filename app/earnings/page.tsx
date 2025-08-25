import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { EarningsDashboard } from "@/components/earnings-dashboard"

export default function EarningsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">Creator Earnings</h1>
              <p className="text-muted-foreground">Track your revenue and payouts on the blockchain</p>
            </div>
            <EarningsDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}
