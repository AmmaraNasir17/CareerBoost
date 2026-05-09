#!/bin/bash

echo "🚀 Starting full project..."

# Move to project root (where this script is located)
cd "$(dirname "$0")" || exit

# Start backend server
echo "🖥️ Starting server..."
(
    cd server || exit
    node src/app.js
) &
SERVER_PID=$!

# Give server a moment to initialize
sleep 3

# Start frontend client
echo "🌐 Starting client..."
(
    cd client || exit
    npm run dev
) &
CLIENT_PID=$!

echo "✅ Client and Server are running!"
echo "Server PID: $SERVER_PID"
echo "Client PID: $CLIENT_PID"
echo ""
echo "Press Ctrl+C to stop both."

# Keep script alive and stop both on exit
trap "echo '🛑 Stopping project...'; kill $SERVER_PID $CLIENT_PID" EXIT

wait