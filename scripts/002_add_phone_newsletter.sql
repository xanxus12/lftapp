-- Add phone number and newsletter subscription fields to waitlist table
ALTER TABLE waitlist 
ADD COLUMN phone_number TEXT,
ADD COLUMN newsletter_subscription BOOLEAN DEFAULT false;
