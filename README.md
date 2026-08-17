# 🚀 Prabodh Badimi — Personal MERN Stack Portfolio

[![React](https://img.shields.io/badge/React-18.x-blue.svg?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg?logo=nodedotjs)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-4.x-lightgrey.svg?logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-brightgreen.svg?logo=mongodb)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-purple.svg?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-ISC-orange.svg)](#-license)

A premium, modern, highly interactive full-stack personal portfolio website for **Prabodh Badimi** built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js) and Vite.

---

## 🌟 Key Features

* **Interactive Full-Stack Architecture**: Modern split architecture separating React frontend (Vite) and Node/Express backend API.
* **Persistent Dark / Light Mode**: Smooth theme toggling with CSS variables and `localStorage` state persistence.
* **MERN Contact Form + Google Sheets Sync**:
  * Connected Express API (`POST /api/contact`) with server-side validation (`express-validator`), rate limiting, and MongoDB Atlas persistence.
  * Automatic background synchronization to Google Sheets using Google Service Account JWT auth.
* **Custom Interactive Cursor**: Smooth desktop cursor with outer trailing ring, glowing dot, and hover scaling on interactive elements.
* **Framer Motion Animations**: Sophisticated text reveals, timeline progression, 3D card tilt effects, micro-animations, and full `prefers-reduced-motion` support.
* **Interactive Timelines**: Scroll-revealed academic timeline (ITM Skills University) and work experience cards (*Hatsoff Accessories* & *CODEVERSEBYSAIKUBER*).
* **Featured Projects Showcase**: Detailed project cards including **Paisa Pakad** (Fintech platform) and **Cars24 Clone** with key contributions, tech tags, and direct GitHub links.
* **Glassmorphic Navigation**: Sticky header with active section scrollspy tracking and smooth animated mobile drawer.

---

## 🛠️ Technology Stack

### Frontend (`/client`)
* **React 18** — Component-driven UI development
* **Vite** — Next-generation fast build tooling & HMR
* **Framer Motion** — Production-ready animation engine
* **Lucide React** — Crisp vector icons
* **Axios** — Promise-based HTTP client layer
* **Vanilla CSS Design System** — Custom CSS variables, glassmorphism, fluid typography, dark mode tokens

### Backend (`/server`)
* **Node.js** — Asynchronous JavaScript runtime
* **Express.js** — Fast web framework for REST APIs
* **MongoDB & Mongoose** — NoSQL database & object modeling
* **Express Validator** — Server-side request sanitization & validation
* **Express Rate Limit** — Security rate limiting middleware
* **Google APIs (`googleapis`)** — Google Sheets API integration for contact submission sync

---

## 📁 Repository Structure

```text
MYPERSONAL_PORTFOLIO/
├── client/                     # React Frontend Application (Vite)
│   ├── public/                 # Static assets (favicons, profile photo, resume.html)
│   ├── src/
│   │   ├── components/         # Navbar, Footer, CustomCursor, ProfileImage, ThemeToggle
│   │   ├── sections/           # Hero, About, Education, Experience, Skills, Projects, Languages, Contact
│   │   ├── services/           # Axios API service client
│   │   ├── utils/              # Framer Motion animation variants & helpers
│   │   ├── styles/             # Modular CSS design system & design tokens
│   │   ├── App.jsx             # Main app container & scroll layout
│   │   └── main.jsx            # React root entry point
│   ├── package.json
│   └── vite.config.js
│
├── server/                     # Express Backend Server (Node + Express + MongoDB)
│   ├── config/                 # Database connection setup (Mongoose)
│   ├── controllers/            # Contact & Portfolio controller handlers
│   ├── models/                 # Mongoose Data Models (Contact, Project, Skill, Experience, Education)
│   ├── routes/                 # Express API routes (/api/contact, /api/portfolio/*)
│   ├── services/               # Google Sheets Service (JWT auth & sheet append)
│   ├── seed.js                 # Database seed script for initial portfolio content
│   ├── server.js               # Main Express app server setup
│   └── package.json
│
├── .env.example                # Environment variable configuration template
├── .gitignore                  # Git exclusion rules
├── package.json                # Root monorepo scripts runner
└── README.md                   # Documentation
```

---

## 🚀 Quick Start & Local Setup

### 1. Clone the Repository

```bash
git clone https://github.com/prabodh2/MYPERSONAL_PORTFOLIO.git
cd MYPERSONAL_PORTFOLIO
```

### 2. Install Dependencies

Install dependencies for root, client, and server in one command:

```bash
npm run install:all
```

Or install them individually:

```bash
# Install root packages
npm install

# Install server packages
cd server && npm install

# Install client packages
cd ../client && npm install
```

---

## 🔑 Environment Configuration

Create a `.env` file in the `server` directory based on `.env.example`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/prabodh_portfolio
CLIENT_URL=http://localhost:5173
NODE_ENV=development

# Optional: Google Sheets Sync Setup
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id
```

---

## 💾 Database Setup & Seeding

To populate your local MongoDB database with Prabodh's projects, experience, education, and skill items:

```bash
npm run seed
```

---

## 🏃 Running the Application

### Launch Client & Server (Concurrent Development)

Terminal 1 (Backend Server):
```bash
npm run dev:server
```
> Server running at: `http://localhost:5000`

Terminal 2 (Frontend Client):
```bash
npm run dev:client
```
> Web Client running at: `http://localhost:5173`

---

## 📡 API Endpoints Overview

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/contact` | Submits contact form message & triggers Google Sheets sync |
| `GET` | `/api/portfolio/projects` | Retrieves list of featured portfolio projects |
| `GET` | `/api/portfolio/skills` | Retrieves technical skills grouped by category |
| `GET` | `/api/portfolio/experience` | Retrieves work experience timeline data |
| `GET` | `/api/portfolio/education` | Retrieves education background timeline data |
| `GET` | `/api/health` | Backend API health check |

---

## 👨‍💻 Author & Contact

**Prabodh Badimi** — Full Stack MERN Developer  
* 🐙 GitHub: [@prabodh2](https://github.com/prabodh2)
* 💼 LinkedIn: [Prabodh Badimi](https://www.linkedin.com/in/badimiprabodh)
* ✉️ Email: `badimiprabodh@gmail.com`

---

## 📄 License

This project is licensed under the ISC License. © 2026 Prabodh Badimi.
