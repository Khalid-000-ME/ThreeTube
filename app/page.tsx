import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { VideoGrid } from "@/components/video-grid"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h2 className="font-heading font-bold text-2xl text-foreground mb-2">Trending on ThreeTube</h2>
              <p className="text-muted-foreground">Discover the latest videos from our decentralized community</p>
            </div>
            <VideoGrid />
          </div>
        </main>
      </div>
    </div>
  )
}
