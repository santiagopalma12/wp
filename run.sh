#!/bin/bash

echo "🚀 Notes App - Setup and Run Script"
echo "===================================="

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install Node.js first."
    exit 1
fi

echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install

echo ""
echo "📦 Installing frontend dependencies..."
cd ../frontend
npm install

echo ""
echo "🗄️  Starting backend server..."
cd ../backend
npm run start:dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 5

echo ""
echo "🌐 Starting frontend server..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Application is running!"
echo "   - Backend:  http://localhost:3000"
echo "   - Frontend: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers."

# Handle graceful shutdown
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit" SIGINT SIGTERM

# Wait for both processes
wait
