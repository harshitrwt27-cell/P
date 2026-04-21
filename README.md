# 🚍 Bus Route Optimizer Frontend

Static-first frontend for the Bus Route Optimization system.

It can run in two modes:
- Integrated mode: served directly by Flask app.py
- Static hosting mode: deployed on Vercel/Netlify/GitHub Pages

## 📦 Project Structure

```
pbl-daa-frontend/
├── index.html          # Home page - region selection
├── route.html          # Route finder page
├── network.html        # Network map visualization
├── public/
│   ├── style.css       # Styling
│   └── map.js          # Map functionality
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
└── README.md           # This file
```

## 🔗 Backend Integration

Backend URL is selected automatically through public/config.js.

Resolution priority:
1. URL query param: ?backend=https://your-api
2. Saved localStorage value
3. Local development fallback: http://localhost:5000
4. Same-origin API when served by Flask
5. Remote fallback for static hosts: https://pbl-daa-1-1.onrender.com

### API Endpoints Used:
- `POST /api/find-route` - Find optimal route
- `POST /api/get-nearest-stop` - Get nearest bus stop
- `POST /api/get-stops` - Get all stops for a region
- `POST /api/get-network` - Get network data

## 🚀 Deployment Steps

### Step 1: Create GitHub Repository
```bash
cd pbl-daa-frontend
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/pbl-daa-frontend.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Vercel
1. Go to https://vercel.com
2. Sign up/Login with GitHub
3. Click "New Project"
4. Select your `pbl-daa-frontend` repository
5. Click "Deploy"

Vercel will automatically deploy your static site!

## ✨ Features

- **Region Selection**: Choose between Uttarakhand and India-wide networks
- **Route Finding**: Uses Dijkstra or A* algorithms
- **Location Detection**: Auto-detect nearest bus stop using geolocation
- **Interactive Maps**: Leaflet-based visualization
- **Responsive Design**: Works on mobile and desktop

## 🌐 Local Development

### Run locally with Python:
```bash
python -m http.server 3000
```
Then open `http://localhost:3000`

### Run locally with Node (optional):
```bash
npm install -g http-server
http-server
```

## 🔒 Environment Variables

No environment variables are required for static deployment.

To override backend at runtime, open pages with:
- route.html?region=Uttarakhand&backend=https://your-api
- network.html?region=India&backend=https://your-api

The selection is persisted in localStorage for next visits.

## 📝 Notes

- All API calls include CORS headers for cross-origin requests
- Backend must have CORS enabled (already configured in `app.py`)
- Static files are served from the `public/` folder
- Vercel automatically handles SSL/HTTPS

## 🎯 Next Steps

1. Push this code to GitHub
2. Connect to Vercel
3. Share the deployed URL (e.g., `https://pbl-daa-frontend.vercel.app`)
4. Monitor deployments in Vercel dashboard

---

**Backend**: Dynamic (auto-detected)
**Status**: Ready for integrated Flask serving and static deployment ✅
