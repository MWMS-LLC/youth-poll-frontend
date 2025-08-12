# Railway Deployment Guide for Youth Poll Frontend

## Problem
The current Railway deployment has a routing issue where refreshing pages like `/blocks/7` shows a "Not Found" error instead of the React app. This happens because Railway doesn't know how to handle client-side routing for SPAs.

## Solution
We've added multiple configuration files to handle SPA routing properly. Railway will use one of these approaches:

### 1. railway.toml (Primary - Newer Railway format)
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npx serve -s dist -l $PORT"
restartPolicyType = "ON_FAILURE"
restartPolicyMaxRetries = 10

[[redirects]]
source = "/(.*)"
destination = "/index.html"
status = 200
```

### 2. static.json (Alternative)
```json
{
  "root": "dist",
  "clean_urls": true,
  "routes": {
    "/**": "index.html"
  }
}
```

### 3. _redirects (Netlify-style)
```
/*    /index.html   200
```

## Deployment Steps

1. **Install serve package locally:**
   ```bash
   cd youth-poll-frontend
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

3. **Deploy to Railway:**
   - Push these changes to your Railway-connected repository
   - Railway will automatically detect the configuration files
   - The `serve` package will handle serving the built files
   - All routes will now serve `index.html` and let React Router handle routing

## What This Fixes

- ✅ Page refreshes at `/blocks/7` will work
- ✅ Direct navigation to any route will work
- ✅ Browser back/forward buttons will work properly
- ✅ All React Router routes will function correctly

## Testing

After deployment, test these scenarios:
1. Navigate to `/blocks/7` and refresh the page
2. Navigate to `/questions/7/1` and refresh the page
3. Use browser back/forward buttons
4. Bookmark and directly access any route

## Troubleshooting

If routing still doesn't work:
1. Check Railway logs for any build errors
2. Verify the `serve` package is installed
3. Ensure the `dist` folder is being built correctly
4. Check that Railway is using the `start` script from package.json

## Alternative Railway Commands

If the above doesn't work, you can also try setting these in Railway's dashboard:
- **Build Command:** `npm run build`
- **Start Command:** `npx serve -s dist -l $PORT`
- **Output Directory:** `dist`
