#!/bin/bash

# Function to start the Django server
start_django() {
  echo "Starting Django server..."
  python manage.py runserver &
  DJANGO_PID=$!
}

# Function to start the Next.js server
start_nextjs() {
  echo "Starting Next.js server..."
  cd calendar-frontend
  npm run dev &
  NEXTJS_PID=$!
  cd ..
}

# Function to stop both servers
stop_servers() {
  echo "Stopping servers..."
  kill $DJANGO_PID
  kill $NEXTJS_PID
  exit 0
}

# Trap script termination to stop servers
trap stop_servers SIGINT SIGTERM

# Start both servers
start_django
start_nextjs

# Wait indefinitely to keep script running
while true
do
  sleep 1
done
