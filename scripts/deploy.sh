#!/bin/bash
# Define variabel in github secrets, call in github workflows
PROJECT_DIR=$1

if [ -z "$PROJECT_DIR" ]; then
  echo "Error: Path project belum didefinisikan!"
  exit 1
fi

echo "Deploying to: $PROJECT_DIR"
cd "$PROJECT_DIR" || { echo "Directory not found"; exit 1; }

echo "Update configuration..."
git pull origin main

echo "Pulling latest images..."
docker-compose pull

echo "Restart containers..."
docker-compose up -d

echo "Cleaning"
docker image prune -f

echo "Deployment Successfully!"