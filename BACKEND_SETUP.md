
# Backend + Frontend Setup

## What's Included

- **Frontend**: React + Vite (port 5174)
- **Backend**: FastAPI (port 8000)
- **Admin Panel**: Secure JSON editor for packages with password protection
- **Persistence**: Package changes saved to `backend/packages.json`

## Quick Start

### Option 1: Windows (Easiest)
```bash
start.bat
```
This opens two terminals: one for backend, one for frontend.

### Option 2: macOS / Linux
```bash
chmod +x start.sh
./start.sh
```

### Option 3: Manual (All Platforms)

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app:app --reload --port 8000
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

## Environment Setup

### Frontend (.env)
Copy `.env.example` to `.env` in the root:
```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_ADMIN_PASSWORD=your_admin_password
```

### Backend
Edit `backend/app.py` to change the admin password (line 8):
```python
ADMIN_PASSWORD = 'nusuk-admin'  # Change this
```

Also update `CORS allow_origins` if running on different URLs (line 15-16).

## Admin Panel Usage

1. Open frontend at `http://localhost:5174`
2. Scroll to "Featured Experiences"
3. Click **Admin** button
4. Enter password (default: `nusuk-admin`)
5. Edit package JSON and click **Save to backend**
6. Changes persist to `backend/packages.json` and reload on all page refreshes

## API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/packages` | GET | Fetch all packages |
| `/packages` | PUT | Update packages (requires `admin_password`) |
| `/packages/reset` | POST | Reset to defaults (requires `admin_password`) |

## File Structure

```
luxury-travel-agency/
├── backend/
│   ├── app.py                 # FastAPI app
│   ├── packages.json          # Package data (auto-updated)
│   └── requirements.txt       # Python dependencies
├── src/
│   ├── components/
│   │   ├── FeaturedPackages.jsx  # Fetches from API
│   │   ├── AdminPanel.jsx        # JSON editor
│   │   └── ...
│   └── ...
├── .env.example
├── start.bat                  # Windows launcher
├── start.sh                   # Unix launcher
└── package.json
```

## Troubleshooting

### Backend won't start
```bash
pip install -r backend/requirements.txt
python -m uvicorn backend.app:app --port 8000
```

### Frontend can't connect to backend
- Verify backend is running on `http://localhost:8000`
- Check CORS settings in `backend/app.py` if running on different host
- Check browser console for fetch errors

### Changes not saving
- Verify admin password is correct
- Check backend terminal for error messages
- Ensure `backend/packages.json` is writable

## Deployment

When deploying to production:
1. Set `VITE_ADMIN_PASSWORD` as environment variable
2. Update `CORS allow_origins` in `backend/app.py`
3. Update backend API URL in `FeaturedPackages.jsx` from `http://localhost:8000` to your production URL
4. Run backend with `uvicorn app:app --host 0.0.0.0 --port 8000`
5. Build frontend: `npm run build`
