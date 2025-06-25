# Artistly: Talent Management Platform

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)

## 📋 Overview

Artistly is a comprehensive talent management platform connecting event organizers with performers, entertainers, and public figures. Our marketplace facilitates talent booking across multiple categories while providing a streamlined onboarding process for artists.

## 🛠️ Technical Architecture

- **Framework**: Next.js with App Router architecture
- **UI Rendering**: React with client-side components
- **Styling**: Tailwind CSS for responsive design
- **Animations**: Framer Motion for smooth transitions
- **Typography**: Optimized Geist and Geist Mono fonts
- **Data**: Static data with hooks for state management

## ✨ Core Features

### 🏠 Home Page

- **Hero Section**: Bold typography highlighting "ENGAGE TALENT WITH PURPOSE"
- **Core Offerings**: Talent management for events, brand endorsements, and digital campaigns
- **Talent Categories**: Responsive grid of 12 talent categories
- **CTAs**: Artist exploration and collaboration sections

### 👥 Artist Directory (`/artists`)

- **Filtering System**: Filter by category, location, and price range
- **Dynamic URL Parameters**: Category-specific filtering
- **Responsive Grid**: Clean layout with visual artist cards
- **UX Elements**: Loading states and empty state handling

### 📝 Artist Onboarding (`/onboard`)

- **Multi-field Form**: Comprehensive artist information collection
- **Validation**: Required fields with error messaging
- **Multiple Selections**: Categories and languages
- **Image Upload**: Profile image with preview
- **Data Storage**: localStorage (API-ready for production)

### 📊 Artist Dashboard (`/dashboard`)

- **Visual Cards**: Stylized artist information display
- **Categorized Views**: Visual category differentiation
- **Animation Effects**: Smooth Framer Motion transitions
- **Empty State Handling**: Appropriate user feedback

## 🎨 Design System

- **Colors**: Black and white base with yellow-300 accents
- **Typography**: Clean hierarchy and readability
- **Components**: Consistent card patterns and CTAs
- **Responsive**: Fully adaptive from mobile to desktop

## ⚙️ Installation Guide

### Prerequisites

- Node.js 18.x or later
- npm or yarn package manager
- Git

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/artistly.git
   cd artistly
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory with the following variables:

   ```
   NEXT_PUBLIC_API_URL=your_api_url_here
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

### Additional Configuration

- Update the `next.config.js` file for advanced configurations
- Customize `tailwind.config.js` for theme adjustments

---

⭐ **Artistly** connects talent with opportunities in the entertainment industry through a modern, scalable platform designed for exceptional user experience.
