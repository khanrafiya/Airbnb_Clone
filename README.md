# 🏡 Airbnb Homepage Clone

A pixel-close, fully responsive clone of the [Airbnb](https://www.airbnb.co.in) homepage, built as part of a **Frontend Development internship project** at Skillfied Mentor. This project focuses on translating a real-world, production-grade UI into clean, component-based, responsive code using modern frontend tooling.

🔗 **Live Demo:** [airbnb-clone-bice-three.vercel.app](https://airbnb-clone-bice-three.vercel.app)
---

## 📋 Project Overview

This project recreates the Airbnb homepage experience — from the search bar and category filters to the listings grid and footer — using **React**, **TypeScript**, **Tailwind CSS**, and **ShadCN UI**. Beyond replicating the original design, it includes creative additions like a login/signup flow, image carousels, and dynamic wishlist and booking functionality.

### Objectives
- Understand and implement component-based architecture using React
- Apply responsive design techniques with Tailwind CSS for seamless cross-device compatibility
- Explore and integrate third-party libraries like ShadCN for UI enhancements
- Add creative, original features beyond the base Airbnb homepage design

---

## ✨ Features

- **Sticky Navbar** — Airbnb logo, expandable search bar (location, dates, guests), profile dropdown menu
- **Working Search** — search by destination, filters listings in real time by location/title
- **Category Filter Bar** — horizontally scrollable icons (Beachfront, Cabins, Amazing pools, Trending, etc.) that dynamically filter the listings grid
- **Responsive Listings Grid** — 20 property cards with:
  - Swipeable image carousels with dot indicators
  - Wishlist heart icon (persisted via localStorage)
  - Guest favourite / Superhost badges
  - Ratings, pricing, and discounted price display
- **Login / Signup Modal** — Airbnb-style auth UI (phone number + Google/Apple), fully interactive with animated success toast (frontend-simulated, no backend)
- **Working Filters** — price range slider, property type, and bedroom/bed/bathroom counters that actively filter listings
- **Listing Detail Modal** — image gallery, amenities, host info, and a working Reserve flow with date selection, guest counter, and live price calculation
- **Skeleton Loading States** — smooth loading experience on initial render
- **Fully Responsive** — optimized for mobile, tablet, and desktop breakpoints

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| UI Components | ShadCN UI |
| Icons | Lucide React |
| Routing | TanStack Router |
| State Management | React State + Context + localStorage |
| Deployment | Vercel |

---

## 📂 Project Structure
