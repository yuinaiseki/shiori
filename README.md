# Shiori

Shiori is a React Native app that makes book discovery easy and visual!<br />
It tags each book with aesthetic color profiles and lets users filter, explore, and save book covers based on aesthetic, color, and genre :)<br />
This app retrieves book metadata using the Apple iTunes Search API.
<p align="center">
  <img src="demo/IMG_4359.jpg" height=400 />
  <img src="demo/IMG_4362.jpg" height=400 />
  <img src="demo/IMG_4361.jpg" height=400 />
</p>

*WIP - currently, the color filters don't work well, and the app has not been tested beyond the Expo Go app on an iPhone.

## Set up
##1. Clone repo
git clone https://github.com/yuinaiseki/shiori.git
cd shiori

##2. Install Dependencies
```bash
npm install
```
or
```bash
yarn install
```

##3. Create a Supabase Project
Go to: https://supabase.com/dashboard
Click New Project
Copy your:
- SUPABASE_URL
- SUPABASE_ANON_KEY

##4. 
Create Database Tables

Open Table Editor → SQL Editor, paste 👇:

users
```bash
create table users (
  id uuid primary key,
  email text,
  created_at timestamp default now()
);
```

liked_books
```bash
create table liked_books (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references users(id) on delete cascade,
  book_id text,
  title text,
  author text,
  uri text,
  color text,
  created_at timestamp default now()
);
```
Enable RLS Policies
alter table liked_books enable row level security;

```bash
create policy "Users manage their own books"
  on liked_books
  for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
```

##5. Create a .env File

Create a .env in the project root:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

##6. Finally, Start the App!

Run:
```bash
npx expo start
```
