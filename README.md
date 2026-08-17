# Prabodh Badimi — MERN Stack Portfolio Website

A premium, modern, highly interactive full-stack personal portfolio website for **Prabodh Badimi** built from scratch using the **MERN Stack** (MongoDB, Express.js, React.js, Node.js).

---

## 🌟 Key Features

* **Interactive Full-Stack Architecture**: Clean separation between React client and Express backend API.
* **Persistent Dark / Light Mode**: Seamless theme switching with smooth transitions and `localStorage` state persistence.
* **Working MERN Contact Form**: Full API integration connected to Express (`POST /api/contact`) with server-side validation (`express-validator`), rate limiting, and MongoDB persistence.
* **Custom Interactive Cursor**: Smooth desktop cursor with outer trailing ring, inner glowing dot, and hover scaling on interactive elements.
* **Framer Motion Animations**: Sophisticated text reveals, timeline progression, 3D card tilts, micro-animations, and `prefers-reduced-motion` accessibility support.
* **Interactive Timelines**: Scroll-revealed academic timeline (ITM Skills University) and work experience cards (Hatsoff Accessories & CODEVERSEBYSAIKUBER).
* **Featured Projects Showcase**: Detailed project cards for **Paisa Pakad** (Fintech theme) and **Cars24 Clone** (Practice / Clone Project) with contributions, technology tags, and direct GitHub links.
* **Responsive Mobile Navigation**: Glassmorphic sticky navbar with active section scrollspy indicator and smooth animated mobile menu drawer.
* **Downloadable Resume**: Embedded printable resume document asset (`resume.html`).

---

## 🛠️ Technology Stack

### Frontend
* **React.js** (Component-based architecture with Hooks)
* **Vite** (Next-generation lightning-fast frontend tooling)
* **Framer Motion** (Production-ready animation system)
* **Lucide React** (Modern clean icon library)
* **Axios** (Promise-based HTTP client)
* **Vanilla CSS Design System** (CSS custom properties, glassmorphism, glowing blue accents)

### Backend
* **Node.js** (JavaScript runtime environment)
* **Express.js** (Fast, unopinionated web framework)
* **MongoDB & Mongoose** (NoSQL Database & Object Data Modeling)
* **Express Validator** (Server-side input validation middleware)
* **Express Rate Limit** (API security rate limiting)
* **Google Sheets API (`googleapis`)** (Reliable MongoDB Atlas → Google Sheets reporting copy sync)

---

## 📁 Project Architecture

```text
PPPPP/
│
├── client/                     # Frontend Application (React + Vite)
│   ├── public/                 # Static assets (favicon, resume.html)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, CustomCursor, ProfileImage, ThemeToggle
│   │   ├── sections/           # Hero, About, Education, Experience, Skills, Projects, Languages, Contact
│   │   ├── services/           # Axios API client layer
│   │   ├── utils/              # Framer Motion animation variants & helpers
│   │   ├── styles/             # Modular CSS design system & tokens
│   │   ├── App.jsx             # Root layout orchestrator
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Backend API Server (Node + Express + MongoDB)
│   ├── config/                 # MongoDB Mongoose connection
│   ├── controllers/            # Contact & Portfolio controllers
│   ├── models/                 # Mongoose Data Models (Contact, Project, Skill, Experience, Education)
│   ├── routes/                 # Express API Routes (/api/contact, /api/portfolio/*)
│   ├── services/               # Google Sheets Service (JWT service account auth & sync)
│   ├── seed.js                 # Initial MongoDB data population script
│   ├── server.js               # Main Express entry point
│   └── package.json
│
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules (protects credentials & secrets)
├── package.json                # Monorepo root manager scripts
└── README.md                   # Complete documentation
```

---

## 🚀 Getting Started Locally

### 1. Clone the Repository
```bash
git clone https://github.com/prabodh2/portfolio.git
cd PPPPP
```

### 2. Install Dependencies
Install dependencies for both client and server:
```bash
npm run install:all
```

Or install separately:
```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

---

## 🔑 Environment Variables Setup

Create a `.env` file in the `server` directory (or root) based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/prabodh_portfolio
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 💾 Seeding MongoDB Database (Optional)

To seed initial portfolio projects, work experience, education, and skills into your local MongoDB instance:

```bash
npm run seed
```

---

## 🏃 Running the Application

### Option A: Run Server & Client Simultaneously

In Terminal 1 (Backend Server):
```bash
npm run dev:server
```
*Backend API will run on:* `http://localhost:5000`

In Terminal 2 (React Client):
```bash
npm run dev:client
```
*Frontend Web App will run on:* `http://localhost:5173`

---

## 📄 License & Ownership

Created with ❤️ by **Prabodh Badimi** — Full Stack Developer.
All rights reserved © 2026.
