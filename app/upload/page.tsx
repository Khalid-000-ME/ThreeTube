import { Navbar } from "@/components/navbar"
import { Sidebar } from "@/components/sidebar"
import { VideoUploadForm } from "@/components/video-upload-form"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="font-heading font-bold text-3xl text-foreground mb-2">Upload Video</h1>
              <p className="text-muted-foreground">Share your content on the decentralized web and mint it as an NFT</p>
            </div>
            <VideoUploadForm />
          </div>
        </main>
      </div>
    </div>
  )
}
