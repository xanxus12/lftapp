-- Create waitlist table for storing signup form data
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  first_name text,
  last_name text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS for security
alter table public.waitlist enable row level security;

-- Create policy to allow anyone to insert (public signup form)
create policy "Allow public signup" on public.waitlist
  for insert with check (true);

-- Create policy to allow reading own data (if needed later)
create policy "Allow read own data" on public.waitlist
  for select using (true);

-- Create index on email for faster lookups
create index if not exists waitlist_email_idx on public.waitlist (email);
