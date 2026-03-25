# 🏗️ Technical Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     USER'S BROWSER                          │
│  ┌───────────────────────────────────────────────────────┐  │
│  │            React Application (SPA)                     │  │
│  │  ┌─────────────────────────────────────────────────┐  │  │
│  │  │          UI Components                          │  │  │
│  │  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────────┐      │  │  │
│  │  │  │Navbar│ │Hero  │ │About │ │Skills    │      │  │  │
│  │  │  └──────┘ └──────┘ └──────┘ └──────────┘      │  │  │
│  │  │  ┌──────────────┐ ┌──────────┐               │  │  │
│  │  │  │Projects      │ │ Experience              │  │  │
│  │  │  └──────────────┘ └──────────┘               │  │  │
│  │  │  ┌──────────────────┐ ┌──────┐            │  │  │
│  │  │  │Contact Form      │ │Footer│            │  │  │
│  │  │  └──────────────────┘ └──────┘            │  │  │
│  │  └─────────────────────────────────────────────┘  │  │
│  │                   ▲                                 │  │
│  │  State Management │ (Zustand Theme Store)          │  │
│  │                   ▼                                 │  │
│  │  ┌─────────────────────────────────────────────┐   │  │
│  │  │  Supabase Client (@supabase/supabase-js)   │   │  │
│  │  │  - Authentication                          │   │  │
│  │  │  - Database (REST API)                     │   │  │
│  │  │  - Real-time Subscriptions                 │   │  │
│  │  └─────────────────────────────────────────────┘   │  │
│  └───────────────────────────────────────────────────┘  │
│                        │                                │
└────────────────────────┼────────────────────────────────┘
                         │ HTTPS
                         ▼
        ┌────────────────────────────────┐
        │   Supabase Cloud Backend       │
        │                                │
        │  ┌────────────────────────┐    │
        │  │   PostgreSQL Database   │    │
        │  │  ┌──────────┐           │    │
        │  │  │Contacts  │           │    │
        │  │  ├──────────┤           │    │
        │  │  │Projects  │           │    │
        │  │  ├──────────┤           │    │
        │  │  │Auth User │           │    │
        │  │  └──────────┘           │    │
        │  └────────────────────────┘    │
        │                                │
        │  ┌────────────────────────┐    │
        │  │  Row Level Security    │    │
        │  │  (RLS Policies)        │    │
        │  └────────────────────────┘    │
        │                                │
        │  ┌────────────────────────┐    │
        │  │  Vector Databases      │    │
        │  │  (Optional AI)         │    │
        │  └────────────────────────┘    │
        │                                │
        │  ┌────────────────────────┐    │
        │  │  Storage Buckets       │    │
        │  │  (Resume, Images)      │    │
        │  └────────────────────────┘    │
        └────────────────────────────────┘


       ┌─────────────────────────────────┐
       │    Vercel CDN & Hosting         │
       │                                 │
       │  ┌───────────────────────────┐  │
       │  │  Next.js / React Build    │  │
       │  │  (dist/ folder)           │  │
       │  └───────────────────────────┘  │
       │                                 │
       │  ┌───────────────────────────┐  │
       │  │  Edge Functions (optional)│  │
       │  │  API Routes               │  │
       │  └───────────────────────────┘  │
       │                                 │
       │  ┌───────────────────────────┐  │
       │  │  CDN & Caching            │  │
       │  │  (Global Distribution)    │  │
       │  └───────────────────────────┘  │
       │                                 │
       │  ┌───────────────────────────┐  │
       │  │  HTTPS & Security         │  │
       │  │  (SSL Certificates)       │  │
       │  └───────────────────────────┘  │
       └─────────────────────────────────┘
```

---

## Data Flow Diagram

### Form Submission Flow

```
User Input (Contact Form)
        │
        ▼
┌───────────────────┐
│ Form Validation   │  (Client-side)
│ - Empty check     │
│ - Email format    │
│ - Min length      │
└───────────────────┘
        │
        ├─ Validation Failed ──▶ Show Error Message
        │
        ▼
┌───────────────────────────┐
│ Submit to Supabase API    │  (via HTTP POST)
│ - collectIP & userAgent   │
│ - Generate UUID           │
└───────────────────────────┘
        │
        ├─ Connection Error ──▶ Show Error
        │
        ▼
┌───────────────────────────┐
│ Supabase RLS Policy Check │
│ - Verify insert allowed   │
└───────────────────────────┘
        │
        ├─ Policy Denied ──▶ Show Error
        │
        ▼
┌───────────────────────────┐
│ Insert into Database      │
│ - Save contact record     │
│ - Set created_at          │
│ - Set status = 'new'      │
└───────────────────────────┘
        │
        ├─ Insert Failed ──▶ Show Error
        │
        ▼
┌───────────────────────────┐
│ Trigger Success Flow      │
│ - Clear form              │
│ - Show success message    │
│ - Send notification (opt) │
└───────────────────────────┘
        │
        ▼
Done! Contact saved ✅
```

---

## Component Hierarchy

```
┌─ App.tsx
│
├─ Navbar
│  ├─ Logo (Home link)
│  ├─ Nav Links (Home, About, Skills, Projects, Experience, Contact)
│  ├─ Theme Toggle (Dark/Light)
│  ├─ Resume Button
│  └─ Mobile Menu
│
├─ Hero
│  ├─ Welcome Message
│  ├─ Typing Animation (Hero Title)
│  ├─ Subheading
│  ├─ Description
│  ├─ CTA Buttons (Explore Work, Get In Touch)
│  ├─ Social Links (GitHub, LinkedIn, Email)
│  └─ Scroll Indicator
│
├─ About
│  ├─ Section Title
│  ├─ About Text (Left Column)
│  │  ├─ Paragraph 1: Background
│  │  ├─ Paragraph 2: Learning Journey
│  │  └─ Paragraph 3: Personal Note
│  └─ Stats Cards (Right Column)
│     ├─ Projects Count
│     ├─ Skills Count
│     └─ Quote Box
│
├─ Skills
│  ├─ Section Title
│  └─ Skill Category Cards (Grid)
│     ├─ Programming Languages
│     ├─ Web Technologies
│     ├─ Database
│     ├─ Tools & Version Control
│     ├─ Operating Systems
│     └─ DevOps & Cloud (Learning)
│
├─ Projects
│  ├─ Section Title
│  ├─ Projects Grid
│  │  ├─ Project Card 1 (QR Cafe Menu)
│  │  ├─ Project Card 2 (LMS)
│  │  ├─ Project Card 3 (Portfolio)
│  │  ├─ Tech Badges
│  │  └─ Action Links (GitHub, Live)
│  └─ CTA: View All on GitHub
│
├─ Experience
│  ├─ Section Title
│  ├─ Timeline
│  │  ├─ Experience Item 1 (Current)
│  │  └─ Future Goal (Upcoming)
│  └─ CTA: Get In Touch
│
├─ Contact
│  ├─ Section Title
│  ├─ Left Column: Contact Info
│  │  ├─ Email
│  │  ├─ LinkedIn
│  │  ├─ Location
│  │  └─ Social Links
│  └─ Right Column: Contact Form
│     ├─ Name Input
│     ├─ Email Input
│     ├─ Message Textarea
│     ├─ Submit Button
│     └─ Status Messages (Error/Success)
│
└─ Footer
   ├─ Brand Info
   ├─ Quick Links
   ├─ Social Links
   ├─ Copyright
   └─ Back to Top Button
```

---

## State Management Flow

```
┌─────────────────────────────────────┐
│      Zustand Store (theme.ts)       │
│                                     │
│  useThemeStore                      │
│  ├─ State                           │
│  │  ├─ isDark: boolean             │
│  │  └─ (persisted in localStorage) │
│  │                                 │
│  └─ Actions                        │
│     ├─ toggleTheme()               │
│     └─ setTheme(isDark)            │
│                                     │
└─────────────────────────────────────┘
          ▲
          │
    Used in:
    - Navbar (display toggle button & update theme)
    - App (apply theme context)
    - All components (inherit theme)

┌─────────────────────────────────────────────────┐
│     Supabase Client (utils/supabase.ts)         │
│                                                 │
│  Functions:                                     │
│  ├─ submitContact()                            │
│  │  └─ Inserts to 'contacts' table            │
│  ├─ fetchProjects()                           │
│  │  └─ Fetches from 'projects' table          │
│  └─ getContactCount()                         │
│     └─ Gets count of contacts (auth only)     │
│                                                 │
└─────────────────────────────────────────────────┘
          ▲
          │
    Used in:
    - Contact.tsx (form submission)
    - Projects.tsx (fetching projects)
```

---

## File Import Map

```
App.tsx
├─ import Navbar from '@/components/Navbar'
├─ import Hero from '@/components/Hero'
├─ import About from '@/components/About'
├─ import Skills from '@/components/Skills'
├─ import Projects from '@/components/Projects'
├─ import Experience from '@/components/Experience'
├─ import Contact from '@/components/Contact'
├─ import Footer from '@/components/Footer'
└─ import { useThemeStore } from '@/store/theme'

Each Component imports:
├─ React & hooks
├─ motion from 'framer-motion' (animations)
├─ Icons from 'react-icons/fi' (UI icons)
├─ Utility functions from '@/utils/supabase'
└─ Type definitions (TypeScript)

styles/globals.css
├─ Tailwind CSS directives
├─ Common utility classes
├─ Animation keyframes
├─ Custom component classes
├─ Responsive utility media queries
└─ CSS variables / custom properties
```

---

## Build & Deployment Pipeline

```
┌──────────────────────────────────────────┐
│  Developer (Local)                       │
│  - npm install                           │
│  - npm run dev (hot reload)              │
│  - Edit components                       │
│  - Test locally                          │
└─────────────┬──────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────┐
│  Git Commit & Push                       │
│  - git add .                             │
│  - git commit -m "message"               │
│  - git push origin main                  │
└─────────────┬──────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────┐
│  GitHub Repository                       │
│  - Receives push                         │
│  - Triggers webhook                      │
└─────────────┬──────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────┐
│  Vercel CI/CD Pipeline                   │
│  - Receive build trigger                 │
│  - Install dependencies (npm install)    │
│  - Run build (npm run build)             │
│  - Generate dist/ folder                 │
│  - Run tests (if configured)             │
│  - Optimize & minify                     │
└─────────────┬──────────────────────────┘
              │
              ├─ Build Fails? ──▶ Show error logs
              │
              ▼
┌──────────────────────────────────────────┐
│  Vercel Deployment                       │
│  - Upload dist/ files                    │
│  - Deploy to CDN                         │
│  - Generate preview URL                  │
│  - Configure environment vars            │
│  - Enable HTTPS                          │
│  - Set cache headers                     │
└─────────────┬──────────────────────────┘
              │
              ▼
┌──────────────────────────────────────────┐
│  Live Site                               │
│  - Accessible via custom domain          │
│  - Auto-scaling enabled                  │
│  - Analytics enabled                     │
│  - Edge caching active                   │
│  - Global CDN distribution               │
└──────────────────────────────────────────┘
```

---

## Authentication Flow (Future)

```
[Not yet implemented, but ready for:]

User Login Request
        │
        ▼
┌──────────────────────────┐
│ Supabase Auth Provider   │
│ (Email/Password/OAuth)   │
└──────────────────────────┘
        │
        ├─ Email Provider
        │  └─ Send confirmation email
        │
        ├─ Password Provider
        │  └─ Hash & store password
        │
        └─ OAuth Providers
           ├─ Google
           ├─ GitHub
           └─ Others
```

---

## Performance Optimization

```
Frontend Optimizations:
├─ Code Splitting (Vite)
├─ Tree Shaking (unused code removal)
├─ Minification (HTML, CSS, JS)
├─ Compression (gzip, brotli)
├─ Image Optimization
├─ Lazy Loading
├─ Async Component Loading
└─ CSS Module Extraction

Vercel CDN:
├─ Edge Caching
├─ Global Distribution
├─ Geo-routing
├─ Auto-scaling
├─ DDoS Protection
└─ Performance Monitoring

Supabase Optimization:
├─ Database Indexes
├─ Query Optimization
├─ Connection Pooling
├─ Replication
├─ Backup & Recovery
└─ Monitoring
```

---

## Error Handling Strategy

```
Frontend Errors:
├─ Form Validation Errors
│  └─ Display inline messages
│
├─ API Connection Errors
│  └─ Show user-friendly message + retry button
│
├─ Supabase Errors
│  └─ Catch & display appropriate message
│
└─ Runtime Errors
   └─ Console logs + user notification

Supabase Errors:
├─ RLS Policy Violations
│  └─ Return 403 Forbidden
│
├─ Database Errors
│  └─ Return 500 Internal Server Error
│
├─ Validation Errors
│  └─ Return 400 Bad Request
│
└─ Authentication Errors
   └─ Return 401 Unauthorized
```

---

## Security Architecture

```
Client Side:
├─ Secure Environment Variables (@env.local)
├─ Input Validation
├─ XSS Protection (React automatic escaping)
├─ CSRF Protection (built into Supabase)
└─ No sensitive data in localStorage (except theme)

Server Side (Supabase):
├─ Row Level Security (RLS) Policies
├─ Password Hashing
├─ JWT Token Management
├─ Encrypted Connections (HTTPS/TLS)
├─ Rate Limiting
├─ SQL Injection Prevention
└─ Audit Logging

Infrastructure (Vercel):
├─ HTTPS Enforcement
├─ DDoS Protection
├─ WAF (Web Application Firewall)
├─ Automatic Security Updates
├─ Regular Security Audits
└─ Compliance (SOC 2, GDPR)
```

---

This architecture ensures:

- ✅ Scalability
- ✅ Performance
- ✅ Security
- ✅ Maintainability
- ✅ Developer Experience
