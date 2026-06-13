# 🌟 Ganesh Agarwal - Portfolio Website

Welcome to the official repository for the portfolio website of **Ganesh Agarwal**—a **GenAI & LLM Engineer**, **AI Automation Developer**, **Machine Learning Engineer**, and **Data Science Student**.

This website is a premium, interactive, and fully responsive single-page application built with modern web technologies to showcase his skills, projects, certifications, and professional journey.

---

## 🚀 Key Features

- **Dynamic Visuals**: Immersive experience featuring a particle background, geometric grid overlay, and elegant HSL-based dark mode aesthetics.
- **Scroll & Reveal Effects**: Powered by Framer Motion and React In-view animations.
- **Interactive Counters**: Dynamic statistics and numbers that animate upon scrolling to the skills section.
- **Direct Messaging via WhatsApp**: Integrates contact forms with direct API linking to WhatsApp for instant connection.
- **Certificate Previews**: View or download credentials instantly.

---

## 🛠️ Tech Stack & Libraries

- **Framework**: [Vite](https://vitejs.dev/) + [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) for fluid styling & spacing
- **Animations**: [Framer Motion](https://www.framer.com/motion/) for micro-interactions and page entrance animations
- **Icons**: [Lucide React](https://lucide.dev/) for crisp, modern icons
- **UI Components**: Built using [shadcn/ui](https://ui.shadcn.com/) components on top of Radix primitives

---

## 📁 Project Structure

The project code is organized as follows. Feel free to explore the main application entry points:

- [package.json](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/package.json) — Scripts, dependencies, and project configuration.
- [src/main.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/main.tsx) — Main React execution mount point.
- [src/App.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/App.tsx) — Layout, router configuration, and styling roots.
- [src/pages/Index.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/pages/Index.tsx) — Main page assembly hosting all section components.

### 🧩 Core Components
All sections are modularized within the `src/components/` directory:
- [Navbar.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Navbar.tsx) — Interactive floating header with scroll-spy navigation.
- [Hero.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Hero.tsx) — Landing banner with typing role animations and direct CTAs.
- [About.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/About.tsx) — Biography and key facts.
- [Experience.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Experience.tsx) — Professional timeline covering web development and GenAI/LLM internships.
- [Education.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Education.tsx) — Timeline of academic pathways (IIT Madras BS DS, PW IOI, B.Sc. Mathematics).
- [Projects.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Projects.tsx) — Showcase of machine learning, web engineering, and AI tool applications.
- [Skills.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Skills.tsx) — Animated visualization of expertise and active learning tracks.
- [Achievements.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Achievements.tsx) — Recognitions (e.g., Rajya Puraskar Award, Hackathons, streaks).
- [Certifications.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Certifications.tsx) — Credentials from Chegg Skills, IIT Madras, IBM, etc.
- [Contact.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/Contact.tsx) — Contact information and messaging form integration.
- [ParticleBackground.tsx](file:///C:/Users/ganes/OneDrive/Pictures/Documents/Desktop/MAC_PRO%20Project/portfolio/src/components/ParticleBackground.tsx) — HTML5 Canvas particle system for fluid dynamics.

---

## ⚡ Local Development

To run the project locally, make sure you have [Node.js](https://nodejs.org/) installed, and then run the following commands:

### 1. Install Dependencies
```sh
npm install
```

### 2. Run the Development Server
```sh
npm run dev
```
Once started, open [http://localhost:8080](http://localhost:8080) in your browser.

### 3. Build for Production
To build the optimized static asset bundle:
```sh
npm run build
```
This output is saved to the `/dist` folder, which can be deployed to static hosting platforms like Vercel, Netlify, or GitHub Pages.

---

## 🤝 Connect with Ganesh

- **LinkedIn**: [Ganesh Agarwal on LinkedIn](https://www.linkedin.com/in/ganesh-agarwal-a20917308)
- **GitHub**: [@agarwalganesh](https://github.com/agarwalganesh)
- **Email**: [ganeshagarwal0895@gmail.com](mailto:ganeshagarwal0895@gmail.com)
