-- Enable extensions (if not already)
 create extension if not exists pgcrypto;-- Waitlist table
 create table if not exists public.waitlist (
 id uuid primary key default gen_random_uuid(),
 email text not null check (position('@' in email) > 1),
 name text,
 source text default 'site',
 created_at timestamptz not null default now()
 );-- Enable RLS
 alter table public.waitlist enable row level security;-- Policies: deny all by default; we will insert via service role from API route
 create policy "waitlist_select_none" on public.waitlist
 for select using (false);
 create policy "waitlist_insert_none" on public.waitlist
 for insert with check (false);