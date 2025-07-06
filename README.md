# SocialPlayr

SocialPlayr is a modern platform for sports cappers and subscribers. It emphasizes transparency, enabling cappers to grow their name and subscribers to track real performance.

## Features

- Capper dashboard with profile and picks management
- Leaderboard showcasing top performers
- Subscriber-friendly interface to view picks
- Responsive design with premium UI
- Testimonials carousel and animated hero section

## Tech Stack

- Next.js (App Router)
- Tailwind CSS
- Prisma ORM
- PostgreSQL (local development)
- Supabase (optional for production)
- Framer Motion for animations
- TypeScript

## Getting Started

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- PostgreSQL installed locally

### Clone the Repository

```bash
git clone https://github.com/cvhuynh1777/socialplayr.git
cd socialplayr

### Install Dependencies
npm install
# or
yarn install


### Set up .env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/socialplayr"

Replace password with you local PGSQL password
- if it doesn't exist, create it
CREATE DATABASE socialplayr;


### Run DB Migrations and Seed Data
npx prisma db push
node prisma/seed.js

### Run Dev Server
npm run dev
# or
yarn dev
