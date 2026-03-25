# Vercel Deployment Configuration

This configuration enables one-click deployment to Vercel with automatic environment setup.

## Quick Deploy Button

Add this to your README.md:

```markdown
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fshyam1603%2Fportfolio-using-claude&env=VITE_SUPABASE_URL,VITE_SUPABASE_ANON_KEY,VITE_RESUME_URL,VITE_CONTACT_EMAIL,VITE_GITHUB_USERNAME&project-name=shyamsundar-portfolio&repository-name=portfolio-using-claude)
```

## Vercel Configuration File

Create `vercel.json` in root:

```json
{
  "version": 2,
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "env": {
    "VITE_SUPABASE_URL": "@supabase_url",
    "VITE_SUPABASE_ANON_KEY": "@supabase_anon_key",
    "VITE_RESUME_URL": "@resume_url",
    "VITE_CONTACT_EMAIL": "@contact_email",
    "VITE_GITHUB_USERNAME": "@github_username"
  },
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## Environment Variables Required

When deploying to Vercel, add these in Project Settings → Environment Variables:

| Variable                 | Description                     | Example                       |
| ------------------------ | ------------------------------- | ----------------------------- |
| `VITE_SUPABASE_URL`      | Your Supabase project URL       | `https://xxxxx.supabase.co`   |
| `VITE_SUPABASE_ANON_KEY` | Your Supabase anon key          | `eyJhbGci...`                 |
| `VITE_RESUME_URL`        | URL to your resume PDF          | `/resume.pdf` or external URL |
| `VITE_CONTACT_EMAIL`     | Your email for form submissions | `your@email.com`              |
| `VITE_GITHUB_USERNAME`   | Your GitHub username            | `shyam1603`                   |

## Deployment Steps

### Using Vercel CLI

```bash
npm i -g vercel
vercel
# Follow prompts to connect GitHub repo and configure environment variables
```

### Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New..." → "Project"
3. Select your GitHub repository
4. Add environment variables
5. Click "Deploy"

### Using GitHub Integration

1. Push code to GitHub
2. Go to Vercel Dashboard
3. Import project from GitHub
4. Configure environment variables
5. Automatic deployments on git push

## Custom Domain

1. Go to Vercel Project Settings → Domains
2. Add your domain
3. Update DNS records as shown in Vercel
4. Wait for SSL certificate to issue (up to 48 hours)

## Preview Deployments

- Every push to feature branch creates a preview deployment
- Automatic preview for pull requests
- Easy rollback to previous deployments

## Production Deployments

- Automatically triggered on merge to main branch
- Instant deployment (usually < 1 minute)
- Automatic HTTPS and CDN
- Automatic performance optimizations

## Monitoring & Logs

Access Vercel Dashboard to:

- View deployment history
- Check build logs
- Monitor runtime errors
- View analytics and performance metrics
- Set up notifications

## Rollback

To rollback to a previous deployment:

1. Go to Vercel Dashboard → Deployments
2. Find the desired deployment
3. Click the three dots
4. Select "Promote to Production"

## CI/CD Pipeline

Vercel automatically:

- Runs builds on every push
- Performs automatic tests
- Optimizes images
- Minifies code
- Compresses assets
- Caches dependencies

## Performance Tips

- Enable Vercel Analytics in Project Settings
- Use Vercel Edge Functions for API routes
- Enable automatic image optimization
- Use Web Vitals monitoring
- Configure custom cache headers

## Troubleshooting

### Build fails with "VITE_SUPABASE_URL is not defined"

- Check environment variables in Vercel → Settings
- Ensure variable names exactly match (case-sensitive)
- Redeploy after adding variables

### Sites shows 404

- Check `vercel.json` rewrites configuration
- Verify build output directory is `dist`
- Check build logs for errors

### Slow performance

- Check Vercel Analytics
- Optimize images
- Enable caching headers
- Consider Edge Functions

## Resources

- [Vercel Docs](https://vercel.com/docs)
- [Vite Deployment](https://vitejs.dev/guide/static-deploy.html#vercel)
- [Supabase + Vercel](https://supabase.com/docs/guides/hosting/vercel)
- [Web Vitals](https://web.dev/vitals/)
