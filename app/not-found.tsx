import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { HomeIcon, ArrowLeftIcon } from "lucide-react"

export const metadata: Metadata = {
  title: "404 - Page Not Found | LFT Fitness App",
  description: "The page you're looking for doesn't exist. Return to LFT fitness app homepage.",
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#000000] text-white flex flex-col">
      {/* Header */}
      <header className="px-4 py-7 border-b border-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/images/lft-logo.png" alt="LFT Logo" width={80} height={32} className="h-12 w-auto" />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-8xl font-bold mb-4 text-[#94969d]">404</h1>
            <h2 className="text-4xl font-bold mb-6">Page Not Found</h2>
            <p className="text-[#94969d] text-xl mb-8 max-w-lg mx-auto">
              The page you're looking for doesn't exist or has been moved. Let's get you back on track with your fitness
              journey.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              asChild
              className="bg-white text-black hover:bg-[#f5f5f5] px-8 py-4 rounded-lg font-bold text-lg cursor-pointer"
            >
              <Link href="/" className="flex items-center gap-2">
                <HomeIcon className="w-5 h-5" />
                Go Home
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10 px-8 py-4 rounded-lg font-bold text-lg cursor-pointer bg-transparent"
            >
              <Link href="javascript:history.back()" className="flex items-center gap-2">
                <ArrowLeftIcon className="w-5 h-5" />
                Go Back
              </Link>
            </Button>
          </div>

          <div className="mt-12 text-[#94969d]">
            <p className="text-sm">
              Need help? Contact us at{" "}
              <a href="mailto:helplftapp@gmail.com" className="text-[#32bbff] hover:underline">
                helplftapp@gmail.com
              </a>
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 py-6 border-t border-[#1a1a1a]">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center gap-8 text-[#94969d] text-sm">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/#features" className="hover:text-white transition-colors">
              Features
            </Link>
            <Link href="/#pricing" className="hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
