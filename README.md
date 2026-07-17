# Smart Resume Screen & Candidate Ranker 🚀

A professional, AI-powered candidate ranking and resume screening application. This tool leverages the Google Gemini API to analyze, evaluate, and rank resumes against custom job descriptions, providing instant feedback on strengths, weaknesses, and role alignment.

---

## 🔗 Quick Access & Live Links

Here are the live links for this application. You can use these to interact with the application:

| Environment | Link | Description |
| :--- | :--- | :--- |
| **🚀 Render Production App** | [👉 Launch Live App on Render](https://smart-resume-screen-candidate-ranker.onrender.com) | **The stable public production build.** Publicly accessible and hosted on Render. |
| **🛠️ Development Sandbox** | [👉 Launch Sandbox Environment](https://ais-dev-jbyabqnp3db43mu5yh2oam-424098399161.asia-southeast1.run.app) | **Your active playground.** Reflects live changes instantly during ongoing development. |

---

## ✨ Key Features

*   **📄 Intelligent Resume Parsing:** Drop or upload multiple candidate resumes (PDF, Word, TXT, or JSON format) to parse them securely.
*   **🎯 Interactive Job Editor:** Create, fine-tune, or select pre-configured job descriptions specifying core skills, minimum experience, and responsibilities.
*   **🧠 Gemini-Powered Screening:** Analyze candidates using server-side Gemini models (`gemini-2.5-flash`) to score suitability, identify key strengths/weaknesses, and extract relevant highlights.
*   **📊 Candidate Comparer & Ranker:** View candidates ranked dynamically based on match scores. Interactive cards allow you to drill down into structural comparisons and side-by-side matches.
*   **🏦 Resume Bank:** Manage, browse, and select from a repository of saved candidate profiles.
*   **🧪 AI/ML Lab Sandbox:** An interactive playground page to test and experiment with prompt templates and parameter weights for the underlying Gemini screening engine.

---

## 🛠️ Tech Stack

This is a modern full-stack web application constructed with the following primary tools:

*   **Frontend:** React 19, TypeScript, and Vite.
*   **Backend Server:** Express.js (Node.js) acting as a secure server-side API gateway.
*   **Styling:** Tailwind CSS v4 (with native imports and custom themes).
*   **Animations:** Smooth micro-interactions and sliding layouts using `motion/react`.
*   **AI Integration:** `@google/genai` TypeScript SDK executing secure, server-side Gemini calls.

---

## 📂 Project Structure

```text
├── src/
│   ├── components/            # Interactive UI modules
│   │   ├── AIMLLab.tsx          # Testing prompt prompts & settings
│   │   ├── CandidateComparer.tsx# Side-by-side comparison & ranking
│   │   ├── Header.tsx           # Navigation and visual headers
│   │   ├── JobEditor.tsx        # Job description editor
│   │   ├── ResumeBank.tsx       # Local list of resume submissions
│   │   └── ResumeViewer.tsx     # Rich analysis viewer for candidates
│   ├── App.tsx                # Main state controller & UI shell
│   ├── types.ts               # Shared TypeScript schemas & interfaces
│   ├── index.css              # Global styles (Tailwind CSS v4 config)
│   └── main.tsx               # Client entry point
├── server.ts                  # Secure Express.js backend (proxies Gemini API)
├── package.json               # Scripts, engines, and project dependencies
├── vite.config.ts             # Vite bundling rules
└── metadata.json              # Applet permission & capability profiles
```

---

## 🚀 How to Run Locally

### 1. Prerequisites
Ensure you have [Node.js](https://nodejs.org/) installed on your machine.

### 2. Install Dependencies
Run the following command in the project root:
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in the root directory (using `.env.example` as a reference):
```env
PORT=3000
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Run the Development Server
Launch both the backend API and the Vite frontend on a unified local server:
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

### 5. Build for Production
To bundle the frontend assets and compile the Express backend into a production-ready CJS file:
```bash
npm run build
```
This produces optimized statics and bundles the backend file inside `dist/server.cjs`.

### 6. Start Production Server
```bash
npm run start
```

---

## 🌐 Deployment on Render

This application runs beautifully on **Render** (using a Web Service instance). Here is the configuration utilized to deploy it:

1. **Service Type:** Web Service
2. **Environment:** Node
3. **Build Command:**
   ```bash
   npm run build
   ```
4. **Start Command:**
   ```bash
   npm run start
   ```
5. **Environment Variables Configured:**
   * `PORT`: `10000` (or leave it to Render's default dynamic port selection)
   * `NODE_ENV`: `production`
   * `GEMINI_API_KEY`: *(Your Google Gemini API Key)*

With this setup, Render compiles the frontend assets, bundles the Express backend server into the efficient single-file `dist/server.cjs`, and starts serving the unified production build on port `10000`.
