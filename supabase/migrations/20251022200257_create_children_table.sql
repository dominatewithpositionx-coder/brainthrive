-- Create children table for PlayPass
create table public.children (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  age int not null,
  screen_time_limit int not null,
  points int default 0,
  created_at timestamp with time zone default now()
);
