# Supabase Backend Setup Guide

## 📊 Database Schema

### Table 1: contacts

```sql
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

-- Create index for faster queries
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_contacts_status ON contacts(status);

-- Enable RLS (Row Level Security)
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert
CREATE POLICY "Enable insert for all users" ON contacts
  FOR INSERT WITH CHECK (true);

-- Policy: Only authenticated users (admin) can read
CREATE POLICY "Enable read only for authenticated users" ON contacts
  FOR SELECT USING (auth.role() = 'authenticated');
```

### Table 2: projects (Optional - for dynamic content)

```sql
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

-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can read
CREATE POLICY "Enable read for all users" ON projects
  FOR SELECT USING (true);

-- Policy: Only authenticated admin can insert/update/delete
CREATE POLICY "Enable insert/update/delete for authenticated users" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');
```

### Table 3: admin_users (for authentication)

```sql
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy
CREATE POLICY "Enable read only for own user" ON admin_users
  FOR SELECT USING (auth.uid() = id);
```

### Table 4: email_logs (optional - for analytics)

```sql
CREATE TABLE email_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  contact_id UUID REFERENCES contacts(id) ON DELETE CASCADE,
  recipient_email VARCHAR(255),
  subject VARCHAR(255),
  sent_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  status VARCHAR(50) DEFAULT 'pending'
);
```

---

## 🔐 Authentication Setup

### 1. Enable Email Authentication

- Go to Supabase Dashboard → Authentication → Providers
- Enable Email Provider
- Configure SMTP settings if needed
- Set redirect URLs for your app

### 2. Create Admin User

```sql
-- Create admin user via Supabase Auth Dashboard
-- Then insert into admin_users table
INSERT INTO admin_users (id, email, name) VALUES (
  '<user_id_from_auth>',
  'admin@example.com',
  'Shyamsundar'
);
```

### 3. Environment Variables

Create `.env.local`:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (keep secret!)
```

---

## 📨 Database Functions & Triggers

### Function: Send Email Notification (optional)

```sql
CREATE OR REPLACE FUNCTION send_contact_email()
RETURNS TRIGGER AS $$
BEGIN
  -- This will be called when a new contact is inserted
  -- You can use a third-party service like SendGrid or Mailgun
  -- Or use Supabase's Email Templates feature

  INSERT INTO email_logs (contact_id, recipient_email, subject, status)
  VALUES (NEW.id, 'your-email@example.com',
    'New Contact Form Submission from ' || NEW.name, 'pending');

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER contact_email_trigger
AFTER INSERT ON contacts
FOR EACH ROW
EXECUTE FUNCTION send_contact_email();
```

### Function: Auto-update updated_at for projects

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
```

---

## 🛡️ Security Best Practices

1. **Row Level Security (RLS): ✅ Enabled**
   - Only authenticated users (admin) can read contacts
   - Only anonymous users can insert contacts
   - Public can read projects only

2. **API Keys:**
   - Keep Anon Key public (used in frontend)
   - Keep Service Role Key secret (server-side only)
   - Rotate keys regularly

3. **Data Validation:**
   - Frontend validation for form inputs
   - Backend validation with Supabase policies
   - Max message length: 5000 characters
   - Email validation with regex

4. **Rate Limiting:**
   - Implement rate limiting on contact form (1 per minute per IP)
   - Use Supabase's built-in rate limiting

5. **CORS Configuration:**
   ```
   Allowed Origins:
   - http://localhost:3000
   - http://localhost:5173
   - https://your-domain.com
   ```

---

## 📊 Initial Data (if needed)

### Sample Projects

```sql
INSERT INTO projects (title, description, image_url, github_url, live_url, category, technologies, featured) VALUES
(
  'QR Cafe Menu System',
  'Dynamic menu system using QR codes for restaurant management. Allows real-time menu updates and customer browsing.',
  'https://via.placeholder.com/600x400?text=QR+Cafe+Menu',
  'https://github.com/shyam1603/qr-cafe-menu',
  'https://qr-cafe-demo.vercel.app',
  'Web Application',
  ARRAY['HTML', 'CSS', 'JavaScript', 'QR Code API', 'Node.js'],
  true
),
(
  'Learning Management System',
  'Full-featured LMS platform for educational institutions with user management, course creation, and progress tracking.',
  'https://via.placeholder.com/600x400?text=LMS+Platform',
  'https://github.com/shyam1603/lms-platform',
  '',
  'Web Application',
  ARRAY['Java', 'DBMS', 'Spring Boot', 'MySQL'],
  true
),
(
  'Personal Portfolio',
  'Modern responsive portfolio website showcasing projects, skills, and DevOps learning journey.',
  'https://via.placeholder.com/600x400?text=Portfolio',
  'https://github.com/shyam1603/portfolio-using-claude',
  'https://shyamsundar.dev',
  'Web Design',
  ARRAY['React', 'Supabase', 'Tailwind CSS', 'Vercel'],
  true
);
```

---

## 🔧 Setup Instructions

### Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Sign up/Login
3. Create a new project
4. Choose region (closest to your users)
5. Set password
6. Wait for project initialization

### Step 2: Create Tables

1. Go to SQL Editor in Supabase Dashboard
2. Run the SQL code above for each table
3. Verify tables in Table Editor

### Step 3: Configure Policies

1. Go to Authentication → Policies
2. Review and enable Row Level Security
3. Test policies with different users

### Step 4: Set Environment Variables

1. Go to Project Settings → API
2. Copy `Project URL` and `Anon Public Key`
3. Add to `.env.local` in frontend

### Step 5: Test Connection

1. Run frontend dev server
2. Submit test contact form
3. Check Supabase database for new record

---

## 📚 API Endpoints (via Supabase)

### Insert Contact

```js
// Method: POST
// No authorization needed
const response = await supabase
  .from("contacts")
  .insert([{ name, email, message, ip_address, user_agent }]);
```

### Get Contacts (Admin Only)

```js
// Method: GET
// Requires admin authentication
const response = await supabase
  .from("contacts")
  .select("*")
  .order("created_at", { ascending: false });
```

### Get Projects (Public)

```js
// Method: GET
// No authorization needed
const response = await supabase
  .from("projects")
  .select("*")
  .eq("featured", true);
```

---

## 🚀 Deployment Checklist

- [ ] Update CORS allowed origins in Supabase
- [ ] Enable production HTTPS only
- [ ] Set up automatic backups
- [ ] Create admin user account
- [ ] Test contact form submission
- [ ] Set up email notifications (optional)
- [ ] Monitor database performance
- [ ] Set up analytics
- [ ] Review security policies
- [ ] Document API endpoints

---

## 📞 Support & Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript)
- [Row Level Security Guide](https://supabase.com/docs/guidance/security/server-signed-urls)
- [Database Triggers](https://supabase.com/docs/guides/database/functions)
