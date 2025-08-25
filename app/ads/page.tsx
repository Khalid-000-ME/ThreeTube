import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { AdSystemDashboard } from "@/components/ad-system-dashboard"

export default function AdsPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">Advertising System</h1>
              <p className="text-muted-foreground">
                Decentralized advertising with transparent bidding and community governance
              </p>
            </div>
            <AdSystemDashboard />
          </div>
        </main>
      </div>
    </div>
  )
}
