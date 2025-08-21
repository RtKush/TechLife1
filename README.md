<img width="1853" height="927" alt="Screenshot (819)" src="https://github.com/user-attachments/assets/efaacb0b-cc4b-40a9-b809-d34bb8ba5ad8" />


<img width="1750" height="911" alt="Screenshot 2025-07-22 005820" src="https://github.com/user-attachments/assets/1ae86300-d88d-4ac0-8926-b2fc199014d2" />


<img width="1859" height="935" alt="Screenshot (787)" src="https://github.com/user-attachments/assets/d2d2a4de-fa4c-4811-a7c0-7ae1edf9572e" />


<img width="1855" height="922" alt="Screenshot (821)" src="https://github.com/user-attachments/assets/4082141d-bf48-4dae-9c9c-44a4ea338113" />


<img width="1853" height="925" alt="Screenshot (788)" src="https://github.com/user-attachments/assets/d93ab9d9-5da7-4e51-bc42-7a5dcb0182af" />


## 📦 Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, Tailwind CSS, Shadcn, Aceternity UI, Lucide Icons
- **State Management**: Redux Toolkit + RTK Query
- **Authentication**: NextAuth (Credential + Google OAuth-ready)
- **Database**: MongoDB (via Mongoose)
- **Editor**: TipTap (Rich Text Editor)
- **Media Upload**: ImageKit (image & video CDN)
- **Deployment**: Vercel

---

## 📊 Features

### 🌐 Core Architecture

- ✅ Next.js 15 with the new App Router
- ✅ TypeScript support across the entire codebase
- ✅ Modular project structure: app/, components/, features/, lib/, model/, etc.
- ✅ Tailwind CSS for modern utility-first UI styling
- ✅ Public asset management via /public
- ✅ Centralized middleware.ts with route protection logic

### 🔐 Authentication & Access Control

- ✅ NextAuth.js integration with credentials provider
- ✅ JWT-based route protection via middleware
- ✅ Public Routes:
  - /, /blog, /reels, /auth/login, /auth/register, /blog/[slug]
- ✅ Protected Routes (authentication required):
  - /create-blog, /add-reel, dashboard, user actions, etc.

### 📄 Blogging System

- ✅ Blog creation page: /create-blog
- ✅ Blog listing page: /blog
- ✅ Dynamic blog detail pages: /blog/[slug]
- ✅ Recent blog sidebar with latest posts
- ✅ Modular blog card components
- ✅ Comment section placeholder included
- ✅ Public read access for all blogs

### 📡 API & State Management

- ✅ RTK Query for efficient API communication
- ✅ Redux Toolkit for global state management
- ✅ Organized features/ folder: auth/, blogs/, comments/, reels/
- ✅ Modular API routes inside app/api/

### 📱 Responsive & Accessible UI

- ✅ Fully responsive navbar with mobile hamburger menu and auth-aware navigation
- ✅ Reusable, scalable UI components
- ✅ Consistent design system (spacing, color, typography)

### 🖼️ Image & Media Handling

- ✅ Static assets served from /public
- ✅ ImageKit for uploading and hosting reels

### 🚧 Planned / In Progress

- 🔄 Google OAuth

## 🛠️ Getting Started

Clone the project and install dependencies:

```bash
git clone https://github.com/thissidemayur/ContentBanao
cd ContentBanao
npm install
```

##⚙️ Environment Variables
Create a .env.local file in the root and add:

env
Copy code

```bash
MONGODB_URI=
NEXTAUTH_SECRET=
NEXTAUTH_URL=

IMAGEKIT_PRIVATE_KEY=
NEXT_AUTH_IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/[your_userName]"

NODE_ENV="development"
NEXT_PUBLIC_AUTH_BACKEND_BASE_URL=
NEXT_PUBLIC_NEXTAUTH_URL=
```

## 🧑‍💻Run Locally

```bash
npm run dev
# or
yarn dev
```

````bash

```bash Visit: http://localhost:3000 ```
````

## 📂 Folder Structure

```bash
├── app/
│   ├── add-reel/
│   ├── api/
│   │   ├── auth/
│   │   ├── comments/
│   │   ├── imagekit-auth/
│   │   ├── post/
│   │   ├── reel/
│   │   ├── search/
│   │   └── user/
│   ├── auth/
│   ├── blog/
│   ├── create-blog/
│   ├── dashboard/
│   ├── edit-blog/
│   ├── profile/
│   ├── providers/
│   ├── reels/
│   ├── ClientLayout.tsx
│   ├── StoreProvider.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── component/                 # 3rd-party UI components (e.g., TipTap)
│   ├── tiptap-extension/
│   ├── tiptap-icons/
│   ├── tiptap-node/
│   ├── tiptap-templates/
│   ├── tiptap-ui/
│   ├── tiptap-ui-primitive/
│   └── ui/
├── components/                # Custom reusable components
│   ├── blog/
│   ├── comment/
│   ├── reel/
│   ├── skelton/
│   ├── upload/
│   ├── user/
│   ├── About.tsx
│   ├── Carousel.tsx
│   ├── CTA.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   ├── HomeBlog.tsx
│   ├── LikeButton.tsx
│   ├── Navbar.tsx
│   ├── Provider.tsx
│   ├── SearchBar.tsx
│   ├── SigninForm.tsx
│   ├── SignOut.tsx
│   └── Singup.tsx
├── features/                 # RTK slices and RTK Query endpoints
│   ├── auth/
│   ├── blogs/
│   ├── comments/
│   └── reels/
├── hooks/                    # Custom React hooks
├── lib/                      # Utilities, DB, Auth, Store
│   ├── auth.lib.ts
│   ├── Backend-helperFn.ts
│   ├── db.lib.ts
│   ├── hooks.ts
│   ├── store.ts
│   ├── tiptap-utils.ts
│   └── utils.ts
├── model/                    # Mongoose schemas
│   ├── blog.model.ts
│   ├── comment.model.ts
│   ├── reels.model.ts
│   └── user.model.ts
├── public/                   # Static assets
├── styles/                   # Tailwind and custom styles
├── types/                    # TypeScript types
├── middleware.ts
├── next-env.d.ts
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
├── package-lock.json
├── eslint.config.mjs
├── components.json
└── README.md

