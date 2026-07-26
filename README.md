# ⚡ Enfinite Energy

**Smart, Reliable & Sustainable Solar Solutions for India**

Enfinite Energy is a full-stack web platform for India's leading solar energy solutions provider. We deliver rooftop solar installations, subsidy guidance (PM Surya Ghar Yojana), net metering support, and 24/7 AMC services for homes, businesses, industries and agriculture.

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 16, React 19, TypeScript, Tailwind CSS v4 |
| **Backend** | Node.js, Express 5, TypeScript, Prisma ORM |
| **Database** | PostgreSQL (via Prisma) |
| **Auth** | JWT + bcryptjs |

---

## 📁 Project Structure

```
SOLAR SMILE/
├── frontend/          # Next.js web app
│   └── src/
│       ├── app/       # Page routes (Next.js App Router)
│       ├── components/ # Reusable UI components
│       └── context/   # React context providers
├── backend/           # Express REST API
│   └── src/
│       ├── routes/    # API route handlers
│       ├── utils/     # Auth & helper utilities
│       └── server.ts  # Entry point
└── package.json       # Root monorepo scripts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### Install all dependencies
```bash
npm run install-all
```

### Start development servers (frontend + backend concurrently)
```bash
npm run dev
```

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🌐 Key Pages

| Page | Route |
|------|-------|
| Home | `/` |
| Solutions | `/solutions` |
| Company | `/company` |
| Careers | `/careers` |
| News | `/news` |
| Contact | `/contact` |
| Government Schemes | `/news` (tab) |
| FAQs | `/resources/faqs` |

---

## 📧 Contact

**Enfinite Energy Pvt. Ltd.**
- 📧 info@enfiniteenergy.com
- 📞 +91 98765 43210
- 🌐 Bhabua, Mohania, Varanasi, Noida

---

© 2024 Enfinite Energy Pvt. Ltd. All Rights Reserved.
