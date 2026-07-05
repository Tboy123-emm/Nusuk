#!/usr/bin/env bash
echo "Starting Backend (FastAPI on port 8000)..."
cd backend
python -m uvicorn app:app --reload --port 8000 &
BACKEND_PID=$!

echo "Waiting for backend to start..."
sleep 3

echo "Starting Frontend (Vite on port 5174)..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "Backend PID: $BACKEND_PID"
echo "Frontend PID: $FRONTEND_PID"
echo ""
echo "Backend: http://localhost:8000"
echo "Frontend: http://localhost:5174"
echo ""
echo "Press Ctrl+C to stop both servers."
wait
