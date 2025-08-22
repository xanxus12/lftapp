"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  XIcon,
  CheckCircleIcon,
  Check,
  ChevronDownIcon,
  ChevronUpIcon,
  User2Icon,
  StarsIcon,
  Globe,
  SmileIcon,
} from "lucide-react"
import Image from "next/image"
import { useScrollAnimation } from "@/hooks/use-scroll-animation"
import { getAllCountryCodes, getUserLocation, getCountryCodeByISO, type CountryCode } from "@/lib/country-codes"

// Animated Card Component
function AnimatedCard({ 
  children, 
  className, 
  delay = 0 
}: { 
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const { ref, isVisible } = useScrollAnimation({
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay * 100}ms` }}
    >
      {children}
    </div>
  )
}

export default function LFTFitnessApp() {
  const [isYearly, setIsYearly] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [email, setEmail] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [selectedCountryCode, setSelectedCountryCode] = useState("+1")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [phoneConsent, setPhoneConsent] = useState(false)
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [newsletterSubscription, setNewsletterSubscription] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submitError, setSubmitError] = useState("")

  // Dynamic country codes loaded from libphonenumber-js
  const [countryCodes, setCountryCodes] = useState<CountryCode[]>([])

  // Load country codes and detect user location on component mount
  useEffect(() => {
    // Load all country codes
    setCountryCodes(getAllCountryCodes())
    
    // Detect user location and set appropriate country code
    const detectLocation = async () => {
      try {
        const userCountry = await getUserLocation()
        if (userCountry) {
          const countryCode = getCountryCodeByISO(userCountry)
          if (countryCode) {
            setSelectedCountryCode(countryCode.code)
          }
        }
      } catch (error) {
        console.log('Location detection failed:', error)
        // Fallback to Spain as default
        setSelectedCountryCode("+34")
      }
    }
    
    detectLocation()
  }, [])

  // Close dropdown when clicking outside or pressing ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isCountryDropdownOpen) {
        const target = event.target as Element
        if (!target.closest('.country-dropdown')) {
          setIsCountryDropdownOpen(false)
        }
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isCountryDropdownOpen) {
        setIsCountryDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isCountryDropdownOpen])

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  const scrollToEarlyAccess = () => {
    const earlyAccessSection = document.getElementById("early-access")
    if (earlyAccessSection) {
      earlyAccessSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")
    setSubmitMessage("")

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          firstName,
          lastName,
          phoneNumber: phoneConsent ? selectedCountryCode + phoneNumber : "",
          newsletterSubscription,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit")
      }

      setSubmitMessage("Successfully added to waitlist! We'll notify you when we launch.")
      setEmail("")
      setFirstName("")
      setLastName("")
      setSelectedCountryCode("+34")
      setPhoneNumber("")
      setPhoneConsent(false)
      setNewsletterSubscription(false)
    } catch (error) {
      console.error("Submission error:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to submit. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const faqs = [
    "What platform is LFT available on?",
    "How do I log a new workout?",
    "Can I add my own custom exercises?",
    "How does progress tracking work?",
    "How do I cancel/refund features work?",
    "Can I export or back up my data?",
    "Is my data secure and private?",
  ]

  return (
    <div className="min-h-screen bg-[#000000] text-white">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 backdrop-blur-md bg-black/80 border-b border-white/10 py-7">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center py-0">
            <Image src="/images/lft-logo.png" alt="LFT Logo" width={80} height={32} className="h-12 w-auto" />
          </div>

          <nav className="hidden md:flex items-center gap-8 tracking-tight text-center mx-0 px-0 font-medium">
            <a href="#features" className="text-[#94969d] hover:text-white transition-colors text-xl">
              Features
            </a>
            <a href="#pricing" className="text-[#94969d] hover:text-white transition-colors text-xl">
              Pricing
            </a>
            <a href="#faq" className="text-[#94969d] hover:text-white transition-colors text-xl">
              FAQs
            </a>
          </nav>

          <Button
            onClick={scrollToEarlyAccess}
            className="text-black hover:text-white transition-colors text-xl px-6 rounded-lg py-6 bg-[rgba(255,255,255,0.9)] font-bold text-lg tracking-tight cursor-pointer"
          >
            Join Waitlist
          </Button>
        </div>
      </header>

     {/* Hero Section */}
<section className="px-4 py-20 pt-32">
  <div className="max-w-7xl text-center mx-auto my-20 hero-animate">
    <h1 className="text-6xl font-bold mb-6 md:text-6xl">Train. Log. Win.</h1>
    <p className="text-[#94969d] mb-4 max-w-2xl mx-auto text-xl">
      Take control of your progress with the LFT fitness app. The all-in one solution for fitness tracking.
    </p>

    <Button
      onClick={scrollToEarlyAccess}
      className="text-black hover:text-white transition-colors text-xl px-8 rounded-lg font-bold text-lg mt-3.5 mb-12 py-7 leading-7 tracking-tight bg-[rgba(255,255,255,0.9)] cursor-pointer"
    >
      {"Join Waitlist\n"}
    </Button>

    {/* Phone Mockups */}
    <div className="relative flex justify-center items-start">
      {/* Left Phone — hidden on mobile, not downloaded */}
      <div
        className="hidden md:block absolute left-1/7 transform -translate-x-1/2 z-10 mr-0 text-center px-0 ml-0 mt-0"
        aria-hidden="true"
      >
        <Image
          src="/images/mockup_hero_left.png"
          alt=""
          width={220}
          height={442}
          className="w-68 h-124 object-contain"
          quality={100}
          sizes="(max-width: 767px) 0vw, 220px"
          loading="lazy"
        />
      </div>

      {/* Center Phone — visible on all screens */}
      <div className="z-20 mr-0 ml-0 px-0 opacity-100 mt-24">
        <Image
          src="/images/mockup_hero_middle.png"
          alt="Dashboard Screen"
          width={294}
          height={589}
          className="w-72 h-179 object-contain"
          priority
          quality={100}
          sizes="(max-width: 767px) 100vw, 294px"
        />
      </div>

      {/* Right Phone — hidden on mobile, not downloaded */}
      <div
        className="hidden md:block absolute right-1/7 transform translate-x-1/2 z-10 ml-0 mr-0 mt-[-32px]"
        aria-hidden="true"
      >
        <Image
          src="/images/mockup_hero_right.png"
          alt=""
          width={220}
          height={442}
          className="w-68 h-144 object-contain"
          quality={100}
          sizes="(max-width: 767px) 0vw, 220px"
          loading="lazy"
        />
      </div>
    </div>
  </div>
</section>

      {/* What does LFT do Section */}
      <section id="features" className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-bold mb-8 text-6xl">What does LFT do?</h2>
              <p className="text-[#94969d] mb-8 text-xl">
                LFT is a comprehensive fitness tracking app designed to help you log workouts, track progress, and
                achieve your fitness goals with precision and ease.
              </p>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#29cc5e]" />
                  <span className="text-sm font-bold">Exercise library</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#29cc5e]" />
                  <span className="text-sm font-extrabold">Custom workouts</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#29cc5e]" />
                  <span className="text-sm font-extrabold">Progress tracking</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="w-5 h-5 text-[#29cc5e]" />
                  <span className="text-sm font-extrabold">Workout templates</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <Image
                src="/images/mockup-progress-screen.png"
                alt="LFT App Progress Screen"
                width={256}
                height={512}
                className="w-82 h-[38rem] object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Data Control Section */}
      <section className="px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-bold mb-16 text-5xl">
            Giving you all the data you need to control and measure real progress
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AnimatedCard 
              className="bg-[#1a1a1a] backdrop-blur-sm text-white p-8 rounded-2xl shadow-[0_0_5px_rgba(255,255,255,0.1)] py-3 px-3 border border-[rgba(255,255,255,0.05)]"
              delay={0}
            >
              <div className="w-12 h-12 bg-[#0D0D0D] rounded-xl flex items-center justify-center mb-0">
                <User2Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-left mb-0">Customize your Profile</h3>
              <p className="text-[#94969d] leading-relaxed text-left">
                Input your data and choose your preferred weight unit to track your lifts and see your progress.
              </p>
            </AnimatedCard>

            <AnimatedCard 
              className="bg-[#1a1a1a] backdrop-blur-sm text-white p-8 rounded-2xl shadow-[0_0_5px_rgba(255,255,255,0.1)] py-3 px-3 border border-[rgba(255,255,255,0.05)]"
              delay={1}
            >
              <div className="w-12 h-12 bg-[#0D0D0D] rounded-xl flex items-center justify-center mb-0">
                <StarsIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-left mb-0">Personalized Experience</h3>
              <p className="text-[#94969d] leading-relaxed text-left">
                Customize your workouts and splits to your liking and track everything that matters to you.
              </p>
            </AnimatedCard>

            <AnimatedCard 
              className="bg-[#1a1a1a] backdrop-blur-sm text-white p-8 rounded-2xl shadow-[0_0_5px_rgba(255,255,255,0.1)] py-3 px-3 border border-[rgba(255,255,255,0.05)]"
              delay={2}
            >
              <div className="w-12 h-12 bg-[#0D0D0D] rounded-xl flex items-center justify-center mb-0">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-left mb-0">Global Reach</h3>
              <p className="text-[#94969d] leading-relaxed text-left">
                Lifters across the world will contribute to building the best fitness tracking app out there.
              </p>
            </AnimatedCard>

            <AnimatedCard 
              className="bg-[#1a1a1a] backdrop-blur-sm text-white p-8 rounded-2xl shadow-[0_0_5px_rgba(255,255,255,0.1)] py-3 px-3 border border-[rgba(255,255,255,0.05)]"
              delay={3}
            >
              <div className="w-12 h-12 bg-[#0D0D0D] rounded-xl flex items-center justify-center mb-0">
                <SmileIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-left mb-">Give us Feedback</h3>
              <p className="text-[#94969d] leading-relaxed text-left">
                We are building this app every day so feel free to tell us where to improve and what features to add
                next.
              </p>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-bold mb-8 text-6xl">Flexible Pricing Plans</h2>
            <p className="text-[#94969d] mb-12 text-xl">
              Use LFT for free with essential features or upgrade to premium for the complete experience.
            </p>

            {/* Monthly/Yearly Toggle */}
            <div className="flex justify-center mb-12">
              <div className="flex bg-[#1a1a1a] p-1 rounded-xl">
                <button
                  className={`px-6 py-3 transition-colors cursor-pointer rounded-lg font-bold text-lg ${
                    !isYearly ? "bg-black/80 text-white" : "text-[#94969d]"
                  }`}
                  onClick={() => setIsYearly(false)}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-3 transition-colors cursor-pointer rounded-lg font-bold text-lg ${
                    isYearly ? "bg-black/80 text-white" : "text-[#94969d]"
                  }`}
                  onClick={() => setIsYearly(true)}
                >
                  Yearly
                </button>
              </div>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Basic Plan */}
            <AnimatedCard 
              className="bg-[#1a1a1a] backdrop-blur-sm text-white p-8 rounded-2xl shadow-[0_0_5px_rgba(255,255,255,0.1)] text-white p-8 rounded-2xl border-0"
              delay={0}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Basic Plan</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-5xl font-bold">0€</span>
                  <span className="text-[#94969d]">{isYearly ? "per year" : "per month"}</span>
                </div>
                <p className="text-[#94969d]">Essential features to get you started</p>
              </div>

              <Button className="w-full bg-white text-black hover:bg-[#f5f5f5] py-4 mb-8 cursor-pointer rounded-lg font-black text-xl">
                Get Started for Free
              </Button>

              <div>
                <h4 className="font-semibold mb-6 text-xl">WHAT'S INCLUDED?</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-base">Create and customize profile</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Choose from the exercise library</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Access to basic features</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Receive notifications and updates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <XIcon className="w-5 h-5 text-[#29cc5e] text-red-600" />
                    <span className="text-sm line-through">Create your own workout templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <XIcon className="w-5 h-5 text-[#29cc5e] text-red-600" />
                    <span className="text-sm line-through">Share workouts with friends</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>

            {/* Premium Plan */}
            <AnimatedCard 
              className="bg-[#1a1a1a] backdrop-blur-sm text-white p-8 rounded-2xl shadow-[0_0_5px_rgba(255,255,255,0.1)] text-white p-8 rounded-2xl border-0 relative"
              delay={1}
            >
              <div className="absolute -top-3 right-6 bg-[#29cc5e] text-black px-4 py-2 rounded-full text-sm border border-[rgba(255,255,255,0.5489130434782609)] font-black bg-[rgba(85,210,78,1)]">
                Save 20% on Yearly
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">Premium Plan</h3>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-5xl font-bold">{isYearly ? "59€" : "7.99€"}</span>
                  <span className="text-[#94969d]">{isYearly ? "per year" : "per month"}</span>
                </div>
                <p className="text-[#94969d]">Advanced features for serious lifters</p>
              </div>

              <Button className="w-full bg-white text-black hover:bg-[#f5f5f5] py-4 mb-8 cursor-pointer rounded-lg font-black text-xl">
                Get Started for Free
              </Button>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h4 className="font-semibold text-xl">WHAT'S INCLUDED?</h4>
                  <span className="text-[#29cc5e] font-medium text-xl">14 Day Free Trial</span>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Everything in Basic Plan</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Advanced progress analytics</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Unlimited workout templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Export data and backup</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Priority customer support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-[#29cc5e]" />
                    <span className="text-sm">Early access to new features</span>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-bold text-center mb-16 text-6xl">Frequently Asked Questions</h2>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <AnimatedCard 
                key={index} 
                className="bg-[#1a1a1a] rounded-xl overflow-hidden"
                delay={index * 0.1}
              >
                <button
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-[#1a1a1a] transition-colors cursor-pointer"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-lg">{faq}</span>
                  {openFaq === index ? (
                    <ChevronUpIcon className="w-5 h-5 text-[#94969d]" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-[#94969d]" />
                  )}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-[#94969d] leading-relaxed">
                      This is where the answer to "{faq}" would be displayed. Each FAQ would have its own detailed
                      response explaining the feature or process.
                    </p>
                  </div>
                )}
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Early Access Section */}
      <section id="early-access" className="px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-bold mb-4 text-6xl">
            Get <span className="text-[#29cc5e] text-[rgba(85,210,78,1)]">early</span> access
          </h2>
          <p className="text-[#94969d] mb-12 text-xl">
            Be among the first to experience a revolution in fitness tracking. Sign up to be notified when we launch!
          </p>

          <AnimatedCard 
            className="bg-[#1a1a1a] backdrop-blur-sm text-white p-8 rounded-2xl shadow-[0_0_10px_rgba(255,255,255,0.1)] py-3 px-3 border border-[rgba(255,255,255,0.05)] rounded-2xl p-8 mb-8"
            delay={0}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full bg-[#2a2a2a] text-white placeholder-[#94969d] px-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#32bbff] disabled:opacity-50"
              />
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full bg-[#2a2a2a] text-white placeholder-[#94969d] px-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#32bbff] disabled:opacity-50"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                disabled={isSubmitting}
                className="w-full bg-[#2a2a2a] text-white placeholder-[#94969d] px-4 py-4 rounded-xl border-0 focus:outline-none focus:ring-2 focus:ring-[#32bbff] disabled:opacity-50"
              />
              {/* Phone Number with Country Code Selector */}
              <div className="space-y-3">
                <label className="block text-sm text-[#94969d]">
                  Phone Number (optional) - For international communications
                </label>
                <div className="flex flex-col sm:flex-row w-full">
                  {/* Country Code Dropdown */}
                  <div className="relative country-dropdown w-fit">
                    <button
                      type="button"
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      disabled={isSubmitting}
                      className="bg-[#2a2a2a] text-white px-3 py-4 border-0 focus:outline-none focus:ring-2 focus:ring-[#32bbff] disabled:opacity-50 w-fit flex items-center justify-between cursor-pointer rounded-xl sm:rounded-l-xl sm:rounded-r-none"
                    >
                      {(() => {
                        const selectedCountry = countryCodes.find(c => c.code === selectedCountryCode)
                        return selectedCountry ? (
                          <span className="text-white font-medium">
                            {selectedCountry.flag} {selectedCountry.code}
                          </span>
                        ) : (
                          <span className="text-[#94969d]">Select</span>
                        )
                      })()}
                      <ChevronDownIcon className="w-4 h-4 text-[#94969d] ml-2" />
                    </button>
                    {/* Custom Dropdown */}
                    {isCountryDropdownOpen && (
                      <div className="absolute top-full left-0 min-w-[220px] w-max mt-1 bg-[#2a2a2a] rounded-xl border border-[rgba(255,255,255,0.1)] max-h-60 overflow-y-auto z-50 shadow-lg">
                        {countryCodes.map(country => (
                          <button
                            key={country.iso}
                            type="button"
                            onClick={() => {
                              setSelectedCountryCode(country.code)
                              setIsCountryDropdownOpen(false)
                            }}
                            className="w-full text-left px-4 py-3 hover:bg-[#1a1a1a] transition-colors cursor-pointer flex items-center gap-3 border-b border-[rgba(255,255,255,0.05)] last:border-b-0 group"
                          >
                            <span className="text-xl flex-shrink-0 group-hover:scale-110 transition-transform">{country.flag}</span>
                            <div className="flex-1 min-w-0 overflow-hidden">
                              <div className="flex items-center gap-2">
                                <span className="text-white font-medium text-sm">{country.code}</span>
                                <span className="text-[#94969d] text-sm truncate">{country.country}</span>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {/* Phone Number Input */}
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isSubmitting}
                    className="bg-[#2a2a2a] text-white placeholder-[#94969d] px-4 py-4 border-0 focus:outline-none focus:ring-2 focus:ring-[#32bbff] disabled:opacity-50 flex-1 rounded-xl sm:rounded-l-none sm:rounded-r-xl mt-2 sm:mt-0"
                  />
                </div>
                <p className="text-xs text-[#94969d]">
                  Providing a phone number is optional and helps us contact you internationally.
                </p>
                {/* GDPR-Compliant Phone Consent */}
                {phoneNumber && (
                  <div className="flex items-start gap-3 p-3 bg-[#1a1a1a] rounded-lg border border-[rgba(255,255,255,0.1)]">
                    <input
                      type="checkbox"
                      id="phone-consent"
                      checked={phoneConsent}
                      onChange={(e) => setPhoneConsent(e.target.checked)}
                      disabled={isSubmitting}
                      className="mt-1 w-4 h-4 bg-[#2a2a2a] border-2 border-[#94969d] rounded focus:ring-2 focus:ring-[#32bbff] text-[#29cc5e] disabled:opacity-50"
                    />
                    <label htmlFor="phone-consent" className="text-sm text-[#94969d] leading-relaxed">
                      I consent to providing my phone number for international communications. 
                      This data will be processed in accordance with our{' '}
                      <a href="/privacy" className="text-[#32bbff] hover:underline">
                        Privacy Policy
                      </a>
                      . You can withdraw consent at any time.
                    </label>
                  </div>
                )}
              </div>
            <div className="flex items-center gap-3 p-2">
              <input
                type="checkbox"
                id="newsletter"
                checked={newsletterSubscription}
                onChange={(e) => setNewsletterSubscription(e.target.checked)}
                disabled={isSubmitting}
                className="w-5 h-5 bg-[#2a2a2a] border-2 border-[#94969d] rounded focus:ring-2 focus:ring-[#32bbff] text-[#29cc5e] disabled:opacity-50"
              />
              <label htmlFor="newsletter" className="text-[#94969d] text-sm cursor-pointer">
                I want to receive weekly newsletters with fitness tips and app updates
              </label>
            </div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#29cc5e] text-black hover:bg-[#22b84c] py-4 rounded-xl cursor-pointer bg-[rgba(85,210,78,1)] font-black text-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </Button>

            {submitMessage && <p className="text-[#29cc5e] text-sm mt-4">{submitMessage}</p>}
            {submitError && <p className="text-red-500 text-sm mt-4">{submitError}</p>}
          </form>
        </AnimatedCard>

        <p className="text-[#94969d] text-sm">By signing up, you agree to our Terms of Service and Privacy Policy.</p>
      </div>
    </section>

      {/* Footer */}
      <footer className="px-4 border-[#1a1a1a] py-6 border-t overflow-x-clip">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-8"></div>
    <div className="text-center mb-8"></div>

    {/* Stacks vertically on mobile; wraps nicely on desktop */}
    <div className="flex flex-col md:flex-row md:flex-wrap items-center text-center justify-center md:justify-between gap-4 md:gap-6 min-w-0">
      {/* Email (first on mobile) */}
      <a
        href="mailto:helplftapp@gmail.com"
        className="text-[#32bbff] hover:underline w-full md:w-auto"
      >
        helplftapp@gmail.com
      </a>

      {/* Nav links (center on desktop, wraps on small screens) */}
      <nav
        aria-label="Footer"
        className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 w-full md:w-auto"
      >
        <a href="#features" className="hover:text-white transition-colors min-w-0">
          Features
        </a>
        <a href="#pricing" className="hover:text-white transition-colors min-w-0">
          Pricing
        </a>
        <a href="#faq" className="hover:text-white transition-colors min-w-0">
          FAQs
        </a>
        <a href="/privacy" className="hover:text-white transition-colors min-w-0">
          Privacy
        </a>
        <a href="#" className="hover:text-white transition-colors min-w-0">
          Contact
        </a>
      </nav>

      {/* Logo (last on mobile, right on desktop) */}
      <div className="w-full md:w-auto flex justify-center md:justify-end">
        <Image
          src="/images/lft-logo.png"
          alt="LFT Logo"
          width={80}
          height={32}
          className="h-12 w-auto max-w-full"
        />
      </div>
    </div>

    <div className="flex justify-center gap-8 text-[#94969d] text-sm my-0 mt-6"></div>
  </div>
</footer>
    </div>
  )
}
