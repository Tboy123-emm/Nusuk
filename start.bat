@echo off
echo Starting Backend (FastAPI on port 8000)...
cd backend
start cmd /k python -m uvicorn app:app --reload --port 8000
timeout /t 3

cd ..
echo Starting Frontend (Vite on port 5174)...
start cmd /k npm run dev

echo.
echo Backend: http://localhost:8000
echo Frontend: http://localhost:5174
echo.
echo Close either terminal window to stop that server.
