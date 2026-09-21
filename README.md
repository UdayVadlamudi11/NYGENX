# NYGENX — Operating System for Next-Gen Business

> Unified intelligence layer integrating custom AI agents, modular ERP systems, cloud architecture, and cinematic creative production.

---

## 🚀 Live Local Server

The NYGENX application is running locally at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 📁 Key Routes & Pages

- **Home Page**: [`/`](http://localhost:3000/) - Hero showcase, core statistics, architecture breakdown, services preview, and dynamic call to action.
- **Services**: [`/services`](http://localhost:3000/services) - Comprehensive overview of all 13 core disciplines (Website Dev, Mobile Apps, Cloud Solutions, Cyber Security, Blockchain, UI/UX, QA & Testing, DevOps, etc.).
- **Service Details**: [`/services/:slug`](http://localhost:3000/services/website-development) - In-depth breakdown with specifications, features, deliverables, and consultation booking.
- **AI Core**: [`/ai-core`](http://localhost:3000/ai-core) - Multi-agent workflows, autonomous business intelligence, real-time RAG systems, and AI copilot agents.
- **ERP Ecosystem**: [`/erp`](http://localhost:3000/erp) - Unified enterprise resource planning covering HR, finance, inventory, sales, projects, and analytics.
- **Creative Studio**: [`/studio`](http://localhost:3000/studio) - Cinematic visual design, 3D CGI product renders, brand identity, and multi-platform digital media.
- **About & Leadership**: [`/about`](http://localhost:3000/about) - Company vision, executive leadership team, and operational philosophy.
- **Contact & Consultation**: [`/contact`](http://localhost:3000/contact) - Interactive consultation booking form with automatic local persistence in `contacts.json`.

---

## 💻 Running the Application

### Start Development Server
```bash
npm start
# or
npm run dev
```

### Environment / Config
- **Port**: `3000` (configurable via `PORT` environment variable)
- **Local Database**: Messages submitted through the contact form are stored in `contacts.json`.
