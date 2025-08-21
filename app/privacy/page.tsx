import type { Metadata } from "next"
import PrivacyPageClient from "./PrivacyPageClient"

export const metadata: Metadata = {
  title: "Privacy Policy | LFT",
  description:
    "Learn how LFT collects, uses, and protects your personal information. Our commitment to your privacy and data security.",
}

export default function PrivacyPage() {
  return <PrivacyPageClient />
}
