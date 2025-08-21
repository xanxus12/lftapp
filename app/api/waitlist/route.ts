import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, firstName, lastName, phoneNumber, newsletterSubscription } = await request.json()

    // Validate required fields
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    if (phoneNumber && phoneNumber.trim()) {
      const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
      if (!phoneRegex.test(phoneNumber.replace(/[\s\-$$$$]/g, ""))) {
        return NextResponse.json({ error: "Invalid phone number format" }, { status: 400 })
      }
    }

    const supabase = await createClient()

    const { data, error } = await supabase
      .from("waitlist")
      .insert({
        email: email.toLowerCase().trim(),
        first_name: firstName?.trim() || null,
        last_name: lastName?.trim() || null,
        phone_number: phoneNumber?.trim() || null,
        newsletter_subscription: Boolean(newsletterSubscription),
      })
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error)

      // Handle duplicate email
      if (error.code === "23505") {
        return NextResponse.json({ error: "Email already registered" }, { status: 409 })
      }

      return NextResponse.json({ error: "Failed to save signup data" }, { status: 500 })
    }

    console.log("Successfully added to waitlist:", data)

    return NextResponse.json(
      {
        message: "Successfully added to waitlist!",
        id: data.id,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
