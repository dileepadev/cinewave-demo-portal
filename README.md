# CineWave Portal

The **CineWave Portal** is a modern, AI-powered web application built with **Next.js** that lets users browse movie listings, interact with the CineAgent, and book tickets — all through a seamless, responsive UI. It connects to the [`cinewave-core-api`](../cinewave-core-api/) and [`cinewave-agent-api`](../cinewave-agent-api/) to deliver real-time data and intelligent assistance.

## ✨ Features

* Discover and explore the latest **movie listings** and trailers
* Search and filter showtimes by **movie, hall, and date**
* **Book tickets** via an interactive, mobile-friendly seat selection interface
* Chat with the **CineAgent** AI assistant for help, recommendations, and support
* Responsive and accessible UI for both desktop and mobile devices
* Fully integrated with the CineWave backend APIs

## 📁 Folder Structure

```text
cinewave-portal/
├── public/               # Static assets (images, icons, fonts)
├── src/
│   ├── app/              # Next.js app directory (routes, pages, layouts)
│   ├── components/       # Reusable UI components (Navbar, Footer, etc.)
│   ├── lib/              # API clients and helper functions
│   ├── data/             # Static and mock data for development
│   ├── types/            # TypeScript interfaces and types
│   └── utils/            # Utility functions and constants
├── .env.example          # Example environment variables
├── next.config.ts        # Next.js configuration
├── package.json          # Project metadata and scripts
└── README.md             # Project documentation
```

## 🚀 Getting Started

### 1. Prerequisites

Ensure you have the following installed:

* [Node.js](https://nodejs.org/) `v18+`
* `npm` (v9+) or `yarn`

### 2. Install Dependencies

```bash
cd cinewave-portal
npm install         # or: yarn install
```

### 3. Configure Environment Variables

Copy the example environment file and update the values as needed:

```bash
cp .env.example .env   # On Windows: use copy .env.example .env
```

> [!NOTE]
> Ensure URLs for the `cinewave-core-api` and `cinewave-agent-api` are correctly set.

### 4. Start Backend Services

Make sure the following services are running:

* [`cinewave-core-api`](../cinewave-core-api/)
* [`cinewave-agent-api`](../cinewave-agent-api/)

These provide the data and AI functionality required by the portal.

### 5. Start the Development Server

```bash
npm run dev         # or: yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to access the portal.

### 6. Production Build

To build and run the portal in production mode:

```bash
npm run build
npm run start       # or: yarn build && yarn start
```

> [!IMPORTANT]
> Restart the dev server after updating environment variables.

## ⚙️ Technologies Used

* **Next.js** 15 – Full-stack React framework
* **React** 19 – Modern UI library
* **TypeScript** – Static typing for safer code
* **Tailwind CSS** – Utility-first styling
* **ESLint** – Code quality and linting

## 📝 License

This project is licensed under the [MIT License](https://github.com/dileepadev/cinewave-demo/blob/main/LICENSE)
