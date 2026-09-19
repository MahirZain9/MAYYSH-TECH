# MAYYSH TECH — Global Product Company Website

Official scalable multi-page website for **MAYYSH TECH** — a software product company building practical software products for real-world problems.

Positioning: **REAL PROBLEMS. REAL SOFTWARE.**
Founder & CEO: **Mahir Zain**

---

## Architecture & Features

- **Scalable Multi-Page Structure**:
  - `/` (Homepage — Positioning, Product showcase, Ask Era live simulation, Founder quote)
  - `/products/` (Suite overview & pipeline)
  - `/products/era-campus/` (Flagship School Management ERP)
  - `/products/mayysh-care/` (Hospital Management System)
  - `/industries/` (Industries overview)
  - `/industries/education/` (School operational workflows)
  - `/industries/healthcare/` (Clinical & hospital workflows)
  - `/solutions/` (Solutions index)
  - `/solutions/school-management-software/` (School fee, attendance & paperwork solutions)
  - `/solutions/hospital-management-software/` (OPD, queuing, billing & pharmacy solutions)
  - `/solutions/offline-business-software/` (Local-first resilience architecture)
  - `/solutions/custom-software/` (Bespoke operational engineering)
  - `/case-studies/` (Product Demonstrations — transparent walkthroughs with zero fake reviews)
  - `/resources/` (Knowledge base & operational guides)
  - `/about/` (Company story, Mahir Zain, philosophy, and Patan to global reach)
  - `/contact/` (Interactive inquiry & demo booking with direct WhatsApp routing)

- **Instant Bilingual Language Switcher (`ENGLISH | HINGLISH`)**:
  - Toggle in navigation bar and footer.
  - Zero reload, preserves active route and state.
  - Remembers user preference in `localStorage`.
  - Natural professional Hinglish (Roman Hindi mixed with English), no machine translation or Devanagari Hindi.

- **Differentiator: Ask Era**:
  - Natural-language offline SQL query module for school administrators.

- **Zero Fabricated Proof**:
  - Transparent product demonstrations instead of invented metrics, awards, or fake testimonials.

---

## Configuration

Site configuration is managed centrally in **`js/main.js`**:

```javascript
const CONFIG = {
  WHATSAPP_NUMBER: "918487083803",
  DEFAULT_MESSAGE: "Hi MAYYSH TECH, I would like to schedule a product demonstration.",
  ERA_CAMPUS_MESSAGE: "Hi MAYYSH TECH, I would like to schedule an Era Campus demonstration.",
  MAYYSH_CARE_MESSAGE: "Hi MAYYSH TECH, I would like to schedule a Mayysh Care demonstration.",
};
```

Translations for both **English** and **Hinglish** are maintained cleanly in **`js/translations.js`**.

---

## Deploying to Vercel

The site is built with static HTML, CSS, and Vanilla JavaScript with clean directory routing (`<folder>/index.html`), meaning it deploys with **zero build step**:

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com), click **Add New → Project** and select the repository.
3. Root Directory: `site` (or root if deploying directly).
4. Framework Preset: **Other** / None.
5. Click **Deploy**. Vercel will automatically serve all routes cleanly.
