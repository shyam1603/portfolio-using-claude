# Figma Design Structure - Portfolio for Shyamsundar Dandapat

## 📐 Design System

### Color Palette

```
Primary Black: #0F0F1E
Secondary Black: #1A1A2E
Accent Blue: #00D9FF
Accent Purple: #8B5CF6
Text Light: #FFFFFF
Text Secondary: #A0AEC0
Border Color: #2D3748
Success: #10B981
Warning: #F59E0B
Error: #EF4444
Background Hover: #2A2A3E
```

### Typography

- **Heading 1 (Hero)**: Poppins Bold, 64px, Letter Spacing: -0.02em
- **Heading 2**: Poppins SemiBold, 48px
- **Heading 3**: Poppins SemiBold, 32px
- **Body**: Inter Regular, 16px, Line Height: 1.6
- **Small**: Inter Regular, 14px
- **Caption**: Inter Regular, 12px, Opacity: 0.7

### Shadows & Effects

- **Soft Shadow (Level 1)**: 0 2px 8px rgba(0,217,255,0.1)
- **Medium Shadow (Level 2)**: 0 8px 24px rgba(139,92,246,0.15)
- **Glass Shadow**: 0 8px 32px rgba(0,0,0,0.3)
- **Glow Effect**: blur(20px) opacity(0.3)

### Glassmorphism Style

- Background: rgba(10,10,30,0.8)
- Border: 1px solid rgba(255,255,255,0.1)
- Backdrop Filter: blur(10px)
- Border Radius: 12px

---

## 🖼️ Page Structure

### 1. Landing Page / Hero Section

**Frame: Hero (1920x1080)**

Components:

- Navigation Bar (sticky, floating)
- Hero Content Container
  - Main Heading: "Shyamsundar Dandapat" (animated typing)
  - Subheading: "Aspiring DevOps Engineer | BCA Student"
  - Description: Brief tagline
  - CTA Buttons: "Explore Work" (Primary), "Download Resume" (Outline)
  - Scroll Indicator Animation
- Background: Animated gradient with subtle particles effect
- Right side: Animated illustration or gradient blob

**Typography:**

- Main Heading: 64px Bold, Text: Accent Blue
- Subheading: 28px SemiBold, Text: Text Secondary
- Description: 18px Regular, Color: Text Light with opacity
- Buttons: 16px SemiBold

---

### 2. Navigation Bar

**Component: Navbar (floating/glassmorphic)**

- Left: Logo/Name (Shyam)
- Center: Nav Links (Home, About, Skills, Projects, Experience, Contact)
- Right:
  - Dark/Light Mode Toggle
  - Resume Download Button
  - Mobile Menu Icon

**States:**

- Hover: Underline animation (accent color)
- Active: Link color changes to accent blue
- Mobile: Hamburger menu with slide-in animation

---

### 3. About Section

**Frame: About (1920x800)**

Layout: Two-column

- **Left Column:**
  - Heading: "About Me"
  - 2-3 paragraphs describing background
  - Highlight stats: "2+ years coding", "3+ projects", "Learning DevOps"
- **Right Column:**
  - Quote box (glassmorphic)
  - Key highlights with icons
  - Timeline-style career path preview

**Components:**

- Section title with underline animation
- Text blocks with varying opacity
- Stat cards (with icons)
- Animated counter for stats (on scroll)

---

### 4. Skills Section

**Frame: Skills (1920x1000)**

- Section Title
- **Skill Categories** (cards in grid):

1. **Programming Languages**
   - C, Java, Python
   - Icon + Level bar

2. **Web Technologies**
   - HTML, CSS, JavaScript
   - Icon + Level bar

3. **Database**
   - DBMS (SQL fundamentals)

4. **Tools & Version Control**
   - Git, GitHub

5. **Operating Systems**
   - Linux (Bash, command line)

6. **DevOps & Cloud (Learning)**
   - CI/CD, Docker, Kubernetes, Cloud platforms

**Skill Card Component:**

- Glassmorphic card (12px border-radius)
- Icon (48x48)
- Skill name
- Proficiency bar (animated on scroll)
- Hover effect: Slight lift, glow

**Grid Layout:**

- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column
- Gap: 24px

---

### 5. Projects Section

**Frame: Projects (1920x1200)**

- Section Title: "Featured Projects"
- Project Cards Grid (2 columns on desktop)

**Project Card Component:**

```
[Project Image / Placeholder]
├─ Category Tag (purple badge)
├─ Project Title (24px bold)
├─ Description (4 lines max)
├─ Tech Stack (small chips)
├─ Links Section
│  ├─ Live Demo Button
│  ├─ GitHub Button
│  └─ Details Button
└─ Hover Effect:
   - Scale 1.02
   - Shadow increase
   - Overlay with info
```

**Projects:**

1. **QR Cafe Menu System**
   - Tech: HTML, CSS, JavaScript, QR Code API
   - Description: Dynamic menu system using QR codes for restaurant management
   - Status: Completed

2. **Learning Management System (LMS)**
   - Tech: Java, DBMS
   - Description: Full-featured LMS for educational institutions
   - Status: Completed

3. **Personal Portfolio Website** (This one)
   - Tech: React, Supabase, Vercel
   - Description: Modern portfolio showcasing DevOps learning journey
   - Status: In Progress

**Additional Empty Slots for Future Projects**

---

### 6. Experience Section

**Frame: Experience (1920x800)**

- Section Title: "Experience"
- Timeline Component

**Timeline Item:**

```
[Year/Timeline Marker]
├─ Job Title
├─ Company
├─ Period
├─ Description (2-3 lines)
└─ Key Skills
```

**Experience Entry:**

- **Python Intern** | GNSS Data Processing
  - Company: [Institution/Company Name]
  - Duration: [Dates]
  - Responsibilities: Data analysis, Python scripting, processing
  - Technologies: Python, DBMS

**Future Experience Placeholder:** "Open to DevOps internships"

---

### 7. Contact Section

**Frame: Contact (1920x900)**

**Left Column:**

- Section Title: "Get In Touch"
- Subheading: "Let's build something great together"
- Contact Information:
  - Email (interactive)
  - LinkedIn (interactive)
  - GitHub (interactive)
  - Twitter (optional)

**Right Column:**

- **Contact Form (Glassmorphic):**
  ```
  ┌─────────────────────┐
  │   Contact Me        │
  │                     │
  │ Name [___________]  │
  │ Email [__________]  │
  │ Message            │
  │ [_________________] │
  │ [_________________] │
  │                     │
  │   [Submit Button]   │
  └─────────────────────┘
  ```

  - Input fields (glassmorphic)
  - Focus state: Accent blue border, glow
  - Submit button: Primary blue gradient
  - Success message: Green checkmark animation

---

### 8. Footer

**Frame: Footer (1920x300)**

- Copyright text
- Quick links
- Social links (GitHub, LinkedIn, Twitter, Email)
- "Back to Top" button
- Theme: Dark, minimal text

---

## 🎬 Animations & Micro-interactions

### Global Animations

1. **Page Transitions**: Fade in + slide up (300ms ease-out)
2. **Scroll Animations**: Fade in + translate Y (on scroll trigger)
3. **Stagger Animation**: Delay between multiple elements (100ms)

### Component-Specific Animations

1. **Hero Section**
   - Typing animation on headline (3s)
   - Fade-in for subtext (1s delay)
   - Button hover: Scale 1.05, color shift

2. **Navbar**
   - Stick animation when scrolling
   - Link hover: Underline animation (left to right)
   - Mobile menu: Slide-in from left (300ms)

3. **Skill Cards**
   - On hover: Lift (transform: translateY(-8px))
   - Proficiency bars: Fill animation on scroll
   - Glow effect on hover

4. **Project Cards**
   - Hover: Scale 1.02, shadow increase
   - Image overlay on hover (smooth fade)
   - CTA buttons reveal: Slide up from bottom

5. **Contact Form**
   - Label float animation on focus
   - Input border: Blue glow on focus
   - Submit: Loading spinner, success checkmark

6. **Scroll Effects**
   - Parallax background
   - Counter animation for stats
   - Section headings: Underline animation

---

## 📱 Responsive Breakpoints

- **Desktop**: 1920px (main design)
- **Laptop**: 1366px
- **Tablet**: 768px
- **Mobile**: 375px

### Layout Adjustments

- Navigation: Hamburger menu on <768px
- Skills Grid: 1 column on mobile, 2 on tablet
- Projects Grid: 1 column on mobile, 2 on desktop
- Hero Section: Stack vertically on mobile
- Contact: Stack left/right on mobile

---

## 🎨 Component Library (in Figma)

Reusable components to create:

1. Button (Primary, Secondary, Disabled states)
2. Input Field (with label, error, success states)
3. Card (base with variations)
4. Badge (skill badge, project tag)
5. Section Title (with underline)
6. Navbar Item (with hover state)
7. Project Card
8. Skill Card
9. Timeline Item
10. Social Icon Button

---

## 📊 Design Tokens (CSS Variables)

```css
/* Colors */
--primary-black: #0f0f1e;
--secondary-black: #1a1a2e;
--accent-blue: #00d9ff;
--accent-purple: #8b5cf6;
--text-light: #ffffff;
--text-secondary: #a0aec0;

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;
--spacing-lg: 24px;
--spacing-xl: 32px;
--spacing-2xl: 48px;

/* Border Radius */
--radius-sm: 4px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 2px 8px rgba(0, 217, 255, 0.1);
--shadow-md: 0 8px 24px rgba(139, 92, 246, 0.15);
--shadow-lg: 0 8px 32px rgba(0, 0, 0, 0.3);
```

---

## 🚀 Next Steps

1. Create all frames in Figma
2. Build component library with variants
3. Add interactions and prototypes
4. Export design specs for developers
5. Implement responsive breakpoints
