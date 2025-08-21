import type React from "react"
import type { Metadata } from "next"
import { Plus_Jakarta_Sans } from "next/font/google"
import "./globals.css"
import Script from "next/script" // ⬅️ add

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "LFT — Fitness Tracking",
  description: "Train. Log. Win.",
    generator: 'v0.app'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className={plusJakartaSans.className}>
        {children}

        {/* Kill the “Built with v0” badge */}
        <Script id="kill-v0-badge" strategy="afterInteractive">
          {`(function(){function n(){document.querySelectorAll('[id^="v0-built-with-button"]').forEach(el=>el.remove())} n(); new MutationObserver(n).observe(document.body,{childList:true,subtree:true});})();`}
        </Script>
      </body>
    </html>
  )
}
