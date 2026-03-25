# 🚀 Implementation & Setup Guide

## Table of Contents

1. [Pre-Setup Requirements](#pre-setup-requirements)
2. [Project Setup](#project-setup)
3. [Supabase Configuration](#supabase-configuration)
4. [Frontend Setup](#frontend-setup)
5. [Development](#development)
6. [Deployment](#deployment)
7. [Troubleshooting](#troubleshooting)

---

## Pre-Setup Requirements

### Prerequisites

- Node.js 18+ ([Download](https://nodejs.org/))
- npm or yarn (comes with Node.js)
- Git ([Download](https://git-scm.com/))
- Supabase Account ([Sign up](https://supabase.com))
- Vercel Account ([Sign up](https://vercel.com))
- GitHub Account ([Sign up](https://github.com))

### Project Structure

```
portfolio-using-claude/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Page components
│   ├── store/              # Zustand stores
│   ├── styles/             # Global CSS
│   ├── utils/              # Utility functions
│   ├── App.tsx             # Main App component
│   └── main.tsx            # Entry point
├── public/                 # Static assets
├── docs/                   # Documentation
├── index.html              # HTML template
├── vite.config.js          # Vite configuration
├── tailwind.config.js      # Tailwind CSS config
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies
└── .env.example            # Environment variables template
```

---

## Project Setup

### Step 1: Clone and Initialize

```bash
# Clone the repository (if using git)
git clone https://github.com/shyam1603/portfolio-using-claude.git
cd portfolio-using-claude

# Install dependencies
npm install
# or
yarn install
```

### Step 2: Environment Setup

```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local with your values
nano .env.local
# or use your preferred editor
```

**Required Environment Variables:**

```env
VITE_SUPABASE_URL=<your-supabase-project-url>
VITE_SUPABASE_ANON_KEY=<your-supabase-anon-key>
VITE_RESUME_URL=<url-to-your-resume>
VITE_CONTACT_EMAIL=<your-email>
VITE_GITHUB_USERNAME=shyam1603
```

---

## Supabase Configuration

### Step 1: Create Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Enter project details:
   - Name: `portfolio`
   - Database Password: (secure password)
   - Region: (closest to you)
4. Wait for project initialization
5. Copy `Project URL` and `Anon Key` from Settings → API

### Step 2: Create Database Tables

Navigate to **SQL Editor** in Supabase and run the following SQL:

```sql
-- Create contacts table
CREATE TABLE contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  ip_address INET,
  user_agent TEXT
);

-- Create indexes
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert
CREATE POLICY "Enable insert for all users" ON contacts
  FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated users can read
CREATE POLICY "Enable read only for authenticated users" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create projects table (optional)
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image_url VARCHAR(500),
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  category VARCHAR(100),
  technologies TEXT[] NOT NULL,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read for all users" ON projects
  FOR SELECT USING (true);
```

### Step 3: Insert Sample Data (Optional)

```sql
INSERT INTO projects (title, description, image_url, github_url, live_url, category, technologies, featured) VALUES
(
  'QR Cafe Menu System',
  'Dynamic menu system using QR codes for restaurant management. Allows real-time menu updates and seamless customer browsing.',
  'https://via.placeholder.com/600x400?text=QR+Cafe',
  'https://github.com/shyam1603/qr-cafe-menu',
  'https://qr-cafe-demo.vercel.app',
  'Web Application',
  ARRAY['HTML', 'CSS', 'JavaScript', 'QR API'],
  true
),
(
  'Learning Management System',
  'Full-featured LMS for educational institutions with course creation and progress tracking.',
  'https://via.placeholder.com/600x400?text=LMS',
  'https://github.com/shyam1603/lms-platform',
  '',
  'Web Application',
  ARRAY['Java', 'DBMS', 'Spring Boot'],
  true
);
```

### Step 4: Configure Authentication (Optional)

1. Go to **Authentication → Providers**
2. Enable **Email** provider
3. Configure SMTP if you want email notifications
4. Set redirect URLs under **URL Configuration**

---

## Frontend Setup

### Step 1: Install Dependencies

```bash
npm install
```

**Key Dependencies:**

- `react`: UI library
- `react-dom`: DOM rendering
- `@supabase/supabase-js`: Supabase client
- `framer-motion`: Animations
- `zustand`: State management
- `tailwindcss`: Styling
- `react-icons`: Icon library

### Step 2: Configure Environment

Edit `.env.local`:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_RESUME_URL=/resume.pdf
VITE_CONTACT_EMAIL=your-email@example.com
VITE_GITHUB_USERNAME=shyam1603
```

### Step 3: Custom Branding

Update these files with your information:

**Hero Section** [src/components/Hero.tsx](src/components/Hero.tsx):

- Change typing animation text
- Update social links
- Modify description

**About Section** [src/components/About.tsx](src/components/About.tsx):

- Update about text
- Customize stats

**Contact Section** [src/components/Contact.tsx](src/components/Contact.tsx):

- Update email and social links
- Customize contact information

**Navbar** [src/components/Navbar.tsx](src/components/Navbar.tsx):

- Update navigation links if needed

### Step 4: Add Resume File

1. Add your resume as `public/resume.pdf`
2. Or set `VITE_RESUME_URL` to external link

---

## Development

### Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:3000` (or next available port)

### Development Features

- ✅ Hot Module Replacement (HMR)
- ✅ Live reload on file changes
- ✅ Tailwind CSS compilation
- ✅ TypeScript type checking

### Verify Features

**1. Test Contact Form**

- Fill out the form in the Contact section
- Check Supabase database for the new record
- Verify validation messages

**2. Test Animations**

- Check typing animation in Hero section
- Verify smooth scrolling between sections
- Test hover effects on buttons and cards

**3. Test Dark Mode Toggle**

- Click theme toggle in navbar
- Verify theme persists on reload

**4. Test Responsiveness**

- Open DevTools (F12)
- Toggle device toolbar
- Test on mobile, tablet, desktop

---

## Deployment

### Deploy to Vercel (Recommended)

#### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts to connect your GitHub repo
```

#### Option 2: GitHub Integration

1. Push code to GitHub
2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "New Project"
4. Select your GitHub repository
5. Configure environment variables:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_RESUME_URL`
   - `VITE_CONTACT_EMAIL`
6. Click "Deploy"

### Configure Custom Domain

1. Go to Vercel Project Settings → Domains
2. Add your custom domain (e.g., shyamsundar.dev)
3. Update DNS records as instructed by Vercel

### Environment Variables on Vercel

1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.local`:
   ```
   VITE_SUPABASE_URL=...
   VITE_SUPABASE_ANON_KEY=...
   VITE_RESUME_URL=...
   VITE_CONTACT_EMAIL=...
   ```
3. Redeploy for changes to take effect

### Deploy to Netlify (Alternative)

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

---

## Troubleshooting

### Issues & Solutions

#### 1. "VITE_SUPABASE_URL is not defined"

**Solution:**

- Ensure `.env.local` file exists
- Check variable names (must start with `VITE_`)
- Restart dev server
- Verify file is not in `.gitignore`

#### 2. Contact form not submitting

**Solution:**

```bash
# Check browser console for errors
# Verify Supabase connection:
# 1. Check Supabase URL and key
# 2. Verify RLS policies allow inserts
# 3. Check network tab in DevTools
```

#### 3. Animations not working

**Solution:**

```bash
# Ensure framer-motion is installed
npm install framer-motion

# Check browser compatibility (modern browsers only)
# Verify no CSS conflicts
```

#### 4. Tailwind classes not applying

**Solution:**

```bash
# Rebuild Tailwind
npm run build

# Clear cache
rm -rf .next
npm cache clean --force

# Restart dev server
npm run dev
```

#### 5. TypeScript errors

**Solution:**

```bash
# Install missing types
npm install --save-dev @types/react @types/react-dom

# Run type check
npm run type-check

# Fix any errors shown
```

### Common Git Issues

```bash
# Remove node_modules from git tracking
git rm -r --cached node_modules/
git add .gitignore
git commit -m "Remove node_modules from tracking"

# Update remote URL
git remote set-url origin https://github.com/shyam1603/portfolio-using-claude.git

# Sync with remote
git pull origin main
git push origin main
```

---

## Performance Optimization

### Images

- Optimize all images with TinyPNG
- Use WebP format where possible
- Lazy load images below the fold

### Code Splitting

- Components are already optimized with code splitting
- Check bundle size with `npm run build`

### Caching

- Vercel automatically handles caching
- Static assets cached for 31 days
- Dynamic content cached based on headers

### Database

- Add indexes for frequent queries
- Use pagination for large datasets
- Cache API responses when possible

---

## Security Checklist

- [ ] Never commit `.env` files
- [ ] Keep Supabase keys secret
- [ ] Enable HTTPS on custom domain
- [ ] Use strong passwords
- [ ] Implement rate limiting on forms
- [ ] Validate all user inputs
- [ ] Use CORS restrictions
- [ ] Keep dependencies updated
- [ ] Monitor Supabase logs
- [ ] Use Row Level Security policies

---

## Next Steps

1. **Customize Content**
   - Update personal information
   - Add real projects
   - Link to your resume

2. **Enhance Features**
   - GitHub API integration
   - Blog section
   - Newsletter signup
   - Analytics

3. **Improve SEO**
   - Add meta tags
   - Create sitemap
   - Submit to search engines
   - Add schema markup

4. **Monitoring**
   - Set up analytics
   - Monitor error logs
   - Track user interactions
   - Performance monitoring

---

## Resources

- [React Docs](https://react.dev)
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [Vercel Docs](https://vercel.com/docs)
- [Vite Guide](https://vitejs.dev/guide/)

---

## Support

For issues or questions:

1. Check documentation
2. Search existing issues
3. Create new issue with details
4. Provide error messages and steps to reproduce

---

**Last Updated:** March 2026
**Maintained by:** Shyamsundar Dandapat
