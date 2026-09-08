# AfterTaste — Food Tasting 2.0 Feedback Form

An editorial, responsive web survey built for **CookWithTife Food Tasting 2.0**. Designed to capture candid culinary feedback from event guests with a high-touch editorial aesthetic, accessible controls, and seamless validation.

---

## Features

- **Editorial Typography & Palette:** Pairs *Cormorant Garamond* titles with *Inter* body and *IBM Plex Mono* metadata on an alabaster canvas with muted sage-teal accents (`oklch(0.52 0.08 176)`).
- **Accessible Selection Inputs:** Fully accessible radio options built using semantic HTML buttons, eliminating native hidden-input event-bubbling bugs across desktop and mobile devices.
- **Client-Side Schema Validation:** Powered by Zod to validate required dish selections and enforce character limits on qualitative feedback fields.
- **Smart Scroll-to-Error Navigation:** Smoothly guides users directly to the first unanswered course if submission is attempted prematurely.
- **Social Sharing & SEO Ready:** Configured Open Graph metadata, favicon assets, and Twitter Card specifications for link distribution across WhatsApp, Twitter/X, and Instagram.

---

## Tech Stack

- **Framework:** [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (using OKLCH color spaces)
- **Validation:** [Zod](https://zod.dev/)
- **Routing:** React Router DOM

---

## Project Structure

```text
├── public/
│   ├── favicon.png
│   ├── favicon.svg
│   └── og-preview.png
├── src/
│   ├── components/
│   │   └── QuestionBlock.tsx     # Reusable, accessible course review block
│   ├── lib/
│   │   └── survey-data.ts        # Dish data, questions, and TypeScript schemas
│   ├── pages/
│   │   └── SurveyPage.tsx        # Main survey flow and submission handling
│   ├── App.tsx                   # Route declarations and 404 fallback
│   ├── index.css                 # OKLCH design tokens and Tailwind configuration
│   └── main.tsx                  # Application entry point
├── index.html
├── package.json
└── vite.config.ts
```


## Getting Started

### Prerequisites
Ensure you have Node.js (v18+) and npm installed on your machine.

### Installation

1. **Clone the repository:**
   ```bash
  git clone [https://github.com/Destiny27052005/AfterTaste-CookWithTife-Food-Tasting-2.0.git](https://github.com/Destiny27052005/AfterTaste-CookWithTife-Food-Tasting-2.0.git) aftertaste-survey
  cd aftertaste-survey
  ```

2. **Install dependencies:**

  ```Bash
  npm install
  ```

3. **Start the development server:**
  ```Bash
  npm run dev
  ```

4. **Build for production:**
  ```Bash
  npm run build
  ```

## Brand & Design Tokens
- **Accent / Spice:** oklch(0.52 0.08 176) **(Muted Sage-Teal)**

- **Foreground / Text:** oklch(0.24 0.015 220) **(Slate-Blue Ink)**

- **Background:** oklch(0.98 0.006 70) **(Alabaster Off-White)**

- **Display Typeface: Cormorant Garamond**

- **Body Typeface: Inter / Karla**

- **Mono Typeface: IBM Plex Mono**

## License
**MIT © CookWithTife**