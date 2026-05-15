# JS Frameworks 2025 - Butta

## Project Documentation: Butta Online Shop

<p align="center">
  <img src="src/assets/Butta-logo-transparent.png" alt="Butta logo" width="420" />
</p>

## See project repo on GitHub

https://github.com/NoroffFEU/jsfw-2025-v1-larstp-jsf

### Contents:

<details>
  <summary>Table of Contents</summary>

[1. Project Overview](#1-project-overview)

- [Project Links](#project-links)

  [2. Setup and Installation](#2-setup-and-installation)

  [3. Scripts](#3-scripts)

  [4. Technologies Used](#4-technologies-used)

  [5. Folder Structure](#5-folder-structure)

  [6. Features](#6-features)

  [7. API Usage](#7-api-usage)

  [8. Deployment (Vercel)](#8-deployment-vercel)

  [9. Accessibility and UX](#9-accessibility-and-ux)

  [10. Known Issues and Limitations](#10-known-issues-and-limitations)

  [11. AI Assistant Log](#11-ai-assistant-log)

  [12. Credits](#12-credits)

  [13. Contact](#13-contact)

</details>

---

## 1. Project Overview

"Butta"" is a responsive e-commerce front-end built with React, TypeScript, and Vite. It fetches products from the Noroff Online Shop API and lets users browse products, search and sort items, view product details, manage a cart, and complete a mock checkout flow.

The design is nothing to write home about, but its my first React app so I think its allowed!

### Project Links

- GitHub Repo: https://github.com/NoroffFEU/jsfw-2025-v1-larstp-jsf
- Live Site (Vercel): ILL ADD THIS WHEN I HAVE IT

## 2. Setup and Installation

### Prerequisites

- Node.js version: >=20.19.0 and <21
- npm

### Install and run locally

```bash
git clone https://github.com/NoroffFEU/jsfw-2025-v1-larstp-jsf.git
cd jsfw-2025-v1-larstp-jsf
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## 3. Scripts

- npm run dev: Start development server
- npm run build: Type-check and build production bundle
- npm run preview: Preview production build locally
- npm run lint: Run ESLint

## 4. Technologies Used

- React 19
- TypeScript
- Vite
- React Router DOM
- OGL (WebGL rendering for Grainient background)
- Tailwind CSS (utility classes)
- ESLint

### Third-party components

- Grainient background borrowed from ReactBits: https://reactbits.dev/backgrounds/grainient
- Install/reference command used for Grainient:

  npx jsrepo@latest add https://reactbits.dev/r/Grainient-JS-CSS

## 5. Folder Structure

- /src
  - /assets: Icons and brand assets
  - /components
    - /layout: Header and footer
    - /ui: Product cards, toast UI, shared pieces
  - /context: Cart and toast providers
  - /hooks: Custom hooks for context access
  - /pages: Route pages (Home, Product, Cart, Checkout, Contact)
  - /services: API request layer and product service
  - /types: Shared TypeScript types
- /public: Static files
- /docs: Project notes and docs

## 6. Features

- Product listing from Noroff Online Shop API
- Search products by title, description, or tag
- Product sorting:
  - Sale items first
  - Price high to low
  - Price low to high
- Product detail page with:
  - Discount handling and percentage-off ribbon
  - Reviews list
  - Add to cart action
- Cart functionality:
  - Add and remove products
  - Increase and decrease quantity
  - Live subtotal and total calculation
  - Persisted cart in localStorage
- Checkout success flow (mock checkout)
- Toast notifications for cart actions
- Global animated Grainient WebGL background (borrowed from ReactBits: https://reactbits.dev/backgrounds/grainient)
- Responsive layout for mobile and desktop

## 7. API Usage

This project uses the Noroff v2 API:

- Base URL: https://v2.api.noroff.dev
- Endpoints used:
  - GET /online-shop
  - GET /online-shop/:id

Products are fetched through a typed service layer in /src/services.

## 8. Deployment (Vercel)

This project is deployed through Vercel

SPA routing rewrite is included in vercel.json so direct route access works:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

## 9. Accessibility and UX

- Semantic HTML structure across pages
- Labeled interactive controls and ARIA labels on icon buttons
- Keyboard-focusable controls and visible button states
- High-contrast text and UI components on dark surfaces
- Toast feedback for key cart interactions

## 10. Known Issues and Limitations

- Checkout is a mock flow (no real payment integration)
- Product data depends on external API availability
- Cart persistence is local to the browser (localStorage)

## 11. AI Assistant Log

<details>
  <summary>Show AI Assistant Log Entries</summary>

**I had to use it quite a bit as I didn't want to spend eternity troubleshooting when we had 2 less days on the project (ascension and constitution day). I also haven't been able to complete all the lesson tasks as there were SO many, so things like React Router and toasts were very hard to remember. Think i got the hang of it though**

Tool Used: GitHub Copilot (Claude Haiku 4.5)

First: I created a "Project workflow" doc that outlined all the things i needed for the project (pages, hooks, ui elements, etc.) and had Claude create a large To-Do list for me that i have been following baed on the order it suggested i should do things in. That was super helpful! Especially since React is SO MUCh when you're not used to it. And all the files, folders and packages can get overwhelming fast. Having a plan like this helped. I also did as Shabana suggested and set Claude to **"Explain this to me like I’m learning to code"**, which helped A LOT in how it laid out and explained concepts when i was having a hard time with them.

- **Date:** May 8
  **Purpose:** Started the project and needed help setting up React with TypeScript and Vite
  **Outcome:** Guided me through installing dependencies and configuring vite.config.ts. Had to fix ESLint plugin type issues. I had a lot of problems with not getting errors when installing ts but got there in the end. All set up and working!

- **Date:** May 8
  **Purpose:** Had problems fetching products from the Noroff API because structuring in React/TS was different
  **Outcome:** Helped me understand generic API client (api.ts) with error handling and separate product services. Made it so I can reuse the API layer for other endpoints. Based it on a course i have been doing in Scrimba

- **Date:** May 10
  **Purpose:** Needed help with homepage search/filtering
  **Outcome:** Explained live filtering on product title in, description, and tags in React. Shows loading state, error handling, and result count. Working great!

- **Date:** May 11
  **Purpose:** Needed React Router help as i COULD NOT get it working
  **Outcome:** Explained React Router and helped me get ProductDetailPage up and running with route parameter. Navigation works smoothly now.

- **Date:** May 11
  **Purpose:** Needed to persist cart items when the page refreshes. Localstorage is different in enough that i could not get it working
  **Outcome:** Showed me how to change CartContext to use localStorage persistence. Every time cart changes, it saves to localStorage. When page loads, it restores from storage. Cart survives refreshes now!

- **Date:** May 12
  **Purpose:** Helped me with the first hook to show how to implement in project. I feel its different from learning material but could be misremembering
  **Outcome:** Added useCart hook

- **Date:** May 13
  **Purpose:** Toast!
  **Outcome:** I needed a LOT of help with this, as I couldn't wrap my head around the different files. I ended up creating 4 files to get it to work; toast.ts, useToast.ts, ToastProvider.tsx, toast-context.ts. I tried SO much getting it proper but i feel its a mess. Its working (ish) now, so i don't want to touch it, even though it is in many files for such a little thing

- **Date:** May 14
  **Purpose:** I screwed up some css root variables without noticing, so i needed help putting them back :p
  **Outcome:** Helped me re-make the :root styles quickly

- **Date:** May 14
  **Purpose:** Updated windows and had a full on "HEY CLAUDE WHY CANT I SEE ANYTHING THE LIVE SERVER IS BLANK BUT I HAVE NO ERRORS"
  **Outcome:** was missing context providers for useNavigate so route hooks didn't work. now they do. Not sure why none of it showed up as errors or anything seeing its TS and eslint

- **Date:** May 14
  **Purpose:** Routing help again
  **Outcome:** I have created the cart and checkout page, but it didnt move there correctly. I had placed stuff n the wrong order. quick fix

- **Date:** 14
  **Purpose:** I was struggling with background, so i figured it was a golden opportunity to learn how to implement 3rd party

- **Date:** 15 May
  **Purpose:** I screwed up a lot when moving the Header and Footer from the main to their own files. needed help troubleshooting how to fix
  **Outcome:** im an idiot and used JS instead of TS becaus thats what im used to so it helped me do it correctly

- **Date:** 15 May
  **Purpose:** Needed help explaining all the "?" question marks when sorting using the sorting menu. Its all so confusing when theres so many of them and i have a hard time with repeating numbers so it just muddles together
  **Outcome:** separated the lines for me so i could more easily understand, and helped me finish it so it actually works now

- **Date:** May 15
  **Purpose:** Look at the sorting on the home page. I have struggled with this for hours and i could not get it to work. There are so many !== etc etc and ifs and thens. I needed help making sure that it could actually sort
  **Outcome:** helped me move some things around. it still looks completely balls but now it works at least!

- **Date:** May 15
  **Purpose:** Needed help figuring out how to deploy to vercel from a github-school account, as ive never done that before
  **Outcome:** gave me the vercel.json fix

</details>

## 12. Credits

- API: Noroff Online Shop API
- WebGL background: Grainient template borrowed from ReactBits (https://reactbits.dev/backgrounds/grainient), created by David Haz
- Icons: Project asset files and icon sets used in source assets
- Built with support from GitHub Copilot for coding assistance

## 13. Contact

- Author: Lars (larstp)
- GitHub: https://github.com/larstp
