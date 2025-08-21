"use client"

import { useRouter } from "next/navigation"

export default function PrivacyPageClient() {
  const router = useRouter()

  const handleGoHome = () => {
    router.push("/")
  }

  const handleGoBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Header Spacer */}
      <div className="h-24"></div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-6xl font-bold mb-8">Privacy Policy</h1>
          <div className="text-[#94969d] text-xl space-y-2">
            <p>
              <strong>LFT Fitness App</strong>
            </p>
            <p>Email: helplftapp@gmail.com</p>
            <p>
              <strong>Last updated:</strong> 21 August 2025
            </p>
          </div>
        </div>

        <div className="space-y-12 text-xl leading-relaxed">
          <section>
            <h2 className="text-4xl font-bold mb-6">Introduction</h2>
            <p className="text-[#94969d] mb-4">
              Welcome to LFT ("we," "our," or "us"). We are committed to protecting your privacy and ensuring the
              security of your personal information. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our fitness tracking application and related services.
            </p>
            <p className="text-[#94969d]">
              By using our services, you agree to the collection and use of information in accordance with this policy.
            </p>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">Information We Collect</h2>

            <h3 className="text-2xl font-semibold mb-4">Personal Information</h3>
            <p className="text-[#94969d] mb-4">We may collect the following types of personal information:</p>
            <ul className="list-disc list-inside text-[#94969d] space-y-2 mb-6">
              <li>Name and contact information (email address, phone number)</li>
              <li>Account credentials (username, password)</li>
              <li>Profile information (age, gender, fitness goals, preferences)</li>
              <li>Workout data (exercises performed, weights, sets, reps, duration)</li>
              <li>Progress metrics (body measurements, photos, achievements)</li>
            </ul>

            <h3 className="text-2xl font-semibold mb-4">Usage Information</h3>
            <p className="text-[#94969d] mb-4">
              We automatically collect certain information about your use of our services:
            </p>
            <ul className="list-disc list-inside text-[#94969d] space-y-2">
              <li>Device information (device type, operating system, unique device identifiers)</li>
              <li>App usage data (features used, time spent, interaction patterns)</li>
              <li>Technical data (IP address, browser type, app version)</li>
              <li>Location data (if you enable location services)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">How We Use Your Information</h2>
            <p className="text-[#94969d] mb-4">We use your information for the following purposes:</p>
            <ul className="list-disc list-inside text-[#94969d] space-y-2">
              <li>Provide and maintain our fitness tracking services</li>
              <li>Personalize your workout experience and recommendations</li>
              <li>Track your fitness progress and generate insights</li>
              <li>Communicate with you about your account and our services</li>
              <li>Send you updates, newsletters, and promotional materials (with your consent)</li>
              <li>Improve our app functionality and user experience</li>
              <li>Ensure security and prevent fraud</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">Information Sharing and Disclosure</h2>
            <p className="text-[#94969d] mb-4">
              We do not sell, trade, or rent your personal information to third parties. We may share your information
              in the following circumstances:
            </p>
            <ul className="list-disc list-inside text-[#94969d] space-y-2">
              <li>
                <strong>With your consent:</strong> When you explicitly agree to share information
              </li>
              <li>
                <strong>Service providers:</strong> With trusted third-party vendors who assist in operating our
                services
              </li>
              <li>
                <strong>Legal requirements:</strong> When required by law or to protect our rights and safety
              </li>
              <li>
                <strong>Business transfers:</strong> In connection with mergers, acquisitions, or asset sales
              </li>
              <li>
                <strong>Aggregated data:</strong> Non-personally identifiable, aggregated data for research and
                analytics
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">Data Security</h2>
            <p className="text-[#94969d] mb-4">
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc list-inside text-[#94969d] space-y-2">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and updates</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection practices</li>
            </ul>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">Your Rights and Choices</h2>
            <p className="text-[#94969d] mb-4">You have the following rights regarding your personal information:</p>
            <ul className="list-disc list-inside text-[#94969d] space-y-2">
              <li>
                <strong>Access:</strong> Request access to your personal information
              </li>
              <li>
                <strong>Correction:</strong> Request correction of inaccurate or incomplete information
              </li>
              <li>
                <strong>Deletion:</strong> Request deletion of your personal information
              </li>
              <li>
                <strong>Portability:</strong> Request a copy of your data in a portable format
              </li>
              <li>
                <strong>Opt-out:</strong> Unsubscribe from marketing communications
              </li>
              <li>
                <strong>Account deactivation:</strong> Delete your account and associated data
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">Data Retention</h2>
            <p className="text-[#94969d]">
              We retain your personal information for as long as necessary to provide our services and fulfill the
              purposes outlined in this policy. When you delete your account, we will delete your personal information
              within 30 days, except where we are required to retain certain information for legal or regulatory
              purposes.
            </p>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">Children's Privacy</h2>
            <p className="text-[#94969d]">
              Our services are not intended for children under the age of 13. We do not knowingly collect personal
              information from children under 13. If we become aware that we have collected personal information from a
              child under 13, we will take steps to delete such information promptly.
            </p>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">International Data Transfers</h2>
            <p className="text-[#94969d]">
              Your information may be transferred to and processed in countries other than your country of residence. We
              ensure that such transfers comply with applicable data protection laws and implement appropriate
              safeguards to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">Changes to This Privacy Policy</h2>
            <p className="text-[#94969d]">
              We may update this Privacy Policy from time to time. We will notify you of any material changes by posting
              the new Privacy Policy on this page and updating the "Last updated" date. We encourage you to review this
              Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2 className="text-4xl font-bold mb-6">Contact Us</h2>
            <p className="text-[#94969d] mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us at:
            </p>
            <div className="text-[#94969d]">
              <p>
                <strong>Email:</strong> helplftapp@gmail.com
              </p>
              <p>
                <strong>Subject Line:</strong> Privacy Policy Inquiry
              </p>
            </div>
          </section>
        </div>

        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-3">
          <button
            onClick={handleGoBack}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-200 cursor-pointer backdrop-blur-sm border border-white/20 shadow-lg hover:shadow-xl"
            title="Go Back"
          >
            ← Back
          </button>
          
        </div>
      </div>
    </div>
  )
}
