# ⚡ Quick Start Guide

Get your portfolio up and running in 5 minutes!

## Prerequisites Check

```bash
node --version  # Should be 18+
npm --version   # Should be 8+
git --version   # Should be 2+
```

## Step 1: Initial Setup (1 minute)

```bash
# Clone the repository
git clone https://github.com/shyam1603/portfolio-using-claude.git
cd portfolio-using-claude

# Install dependencies
npm install
```

## Step 2: Configure Supabase (2 minutes)

```bash
# Copy environment template
cp .env.example .env.local

# Edit with your values (use any editor)
# You need Supabase Project URL and Anon Key
nano .env.local
```

**Get Supabase credentials:**

1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → API
4. Copy "Project URL" and "anon public key"
5. Paste into `.env.local`

## Step 3: Setup Supabase Database (1 minute)

1. In Supabase Dashboard, go to SQL Editor
2. Copy and paste the contents of the **contacts table creation SQL** from [SUPABASE_SETUP.md](SUPABASE_SETUP.md)
3. Run the SQL queries

## Step 4: Start Development (1 minute)

```bash
npm run dev
```

Your portfolio will open at `http://localhost:3000` 🎉

---

## Testing Checklist

✅ Can see the portfolio homepage
✅ Animations and scroll work smoothly
✅ Contact form submits successfully
✅ Can see submitted contact in Supabase
✅ Resume button downloads/opens file
✅ Social links work correctly

---

## Next Steps

### Customize Your Portfolio

1. Update personal info in `src/components/` files
2. Add your projects
3. Update your resume
4. Customize colors in `tailwind.config.js`

### Deploy to Production

```bash
npm run build          # Build for production
vercel                 # Deploy to Vercel
```

### Add More Features

- See [Roadmap](../README.md#-roadmap) for ideas
- Refer to [Implementation Guide](IMPLEMENTATION_GUIDE.md)
- Check [Figma Design](FIGMA_DESIGN_STRUCTURE.md)

---

## Common Issues

| Issue                        | Solution                                      |
| ---------------------------- | --------------------------------------------- |
| Port 3000 already in use     | Change port: `npm run dev -- --port 3001`     |
| Environment vars not loading | Restart dev server after editing `.env.local` |
| Supabase connection error    | Check URL and key in `.env.local`             |
| Build errors                 | Run `npm install` again, then `npm run dev`   |

---

## File Structure Summary

```
Key files to customize:
├── src/components/Hero.tsx      # Your name, intro
├── src/components/About.tsx     # Your story
├── src/components/Skills.tsx    # Your skills
├── src/components/Projects.tsx  # Your projects
├── src/components/Experience.tsx # Your experience
├── src/components/Contact.tsx   # Your email
├── public/resume.pdf            # Your resume
└── .env.local                   # Your API keys
```

---

## Performance Tips

- **Faster builds**: `npm ci` instead of `npm install`
- **Faster deployments**: Use Vercel for automatic deployments
- **Better experience**: Add your actual projects instead of defaults

---

## Support

- Full docs: See [README.md](../README.md)
- Setup guide: See [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md)
- Deployment: See [DEPLOYMENT.md](DEPLOYMENT.md)
- Design docs: See [FIGMA_DESIGN_STRUCTURE.md](FIGMA_DESIGN_STRUCTURE.md)

---

## Ready to Deploy?

1. Test locally with `npm run dev`
2. Build for production: `npm run build`
3. Deploy to Vercel: `vercel`
4. Add custom domain in Vercel settings

**That's it!** Your portfolio is live! 🚀

---

**Last Updated:** March 2026
