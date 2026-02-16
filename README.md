# Flavor Match 🌶️🍯

> **The "Digital Alchemist" for Tamil Nadu Cuisine.**
> A Programmatic SEO engine that scientifically analyzes ingredient compatibility using a custom "Flavor Harmony Algorithm."

![Next.js](https://img.shields.io/badge/Next.js-14-black) ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-blue) ![Status](https://img.shields.io/badge/Status-Production_Ready-green)

**[View Live Demo](https://culinary-alchemist-two.vercel.app/)**

---

## 📖 The Story
Flavor Match isn't just a recipe app. It's an attempt to teach code how to understand **Culture**.

Focusing exclusively on **Tamil Nadu cuisine**, the system decodes the complex wisdom behind age-old pairings—like why the sharp acidity of *Tamarind* demands the deep, earthy sweetness of *Jaggery*. By quantifying flavor profiles (Sweet, Sour, Salty, Bitter, Umami, Spicy) and texture, Flavor Match generates a compatibility score and "molecular breakdown" for any two ingredients.

## 🚀 Key Features

### 1. 🧪 Flavor Harmony Algorithm
A custom logic engine (`src/utils/alchemy.js`) that calculates a **0-100 Harmony Index** based on:
-   **Balance:** (e.g., Sweetness masking Bitterness)
-   **Contrast:** (e.g., Creamy Curd vs. Crunchy Pickle)
-   **Affinity:** Hardcoded cultural pairings (e.g., Curry Leaves + Mustard Seeds)

### 2. ⚡ Programmatic SEO Engine
Built with **Next.js Server-Side Rendering (SSR)** to dominate search results for long-tail queries.
-   **Dynamic Routing:** `/pairing/[slug]` generates unique pages on demand (e.g., `/pairing/tamarind-and-ghee`).
-   **Dynamic JSON-LD:** Automatically injects `Recipe` schema for rich snippets.
-   **Automated Sitemap:** A script generates URLs for thousands of ingredient combinations instantly.

### 3. 🎨 "Modern Editorial" Design
Moving away from generic "AI" interfaces, Flavor Match uses a design system inspired by high-end culinary magazines.
-   **Typography:** *Playfair Display* (Editorial) + *Inter* (UI).
-   **Texture:** Subtle noise and paper grain for a tactile feel.
-   **Data Vis:** Radar charts and "Molecular Breakdown" lists.

---

## 🛠️ Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (SSR)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **Deployment:** [Vercel](https://vercel.com/)
-   **Data:** JSON-based persistent store (NoSQL ready)

---

## 🏃‍♂️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/AVINASH-U-WEB/FlavorMatch.git
cd FlavorMatch
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🔍 SEO Strategy
This project implements a **"Long-Tail Programmatic"** strategy. Instead of competing for broad terms like "Indian Food", it targets specific, high-intent queries:
-   *"What pairs well with Drumstick?"*
-   *"Tamarind and Sambar Onions compatibility"*

Each generated page features unique **Titles**, **Meta Descriptions**, and **OpenGraph Images** to maximize CTR.

---

## 📂 Project Structure

```
├── public/             # Static assets (favicons, robots.txt)
├── src/
│   ├── components/     # Reusable UI (IngredientSelector, HarmonyResults)
│   ├── data/           # The Ingredient DNA (ingredients.json)
│   ├── pages/          # Next.js Routes
│   │   ├── index.js    # Search & Discovery
│   │   ├── pairing/    # Dynamic SSR Route ([slug].js)
│   │   └── sitemap.xml.js # SEO Generator
│   ├── styles/         # Global styles & Tailwind config
│   └── utils/          # The Algorithm (alchemy.js)
```

---

## 📜 License
MIT © 2025 Flavor Match
