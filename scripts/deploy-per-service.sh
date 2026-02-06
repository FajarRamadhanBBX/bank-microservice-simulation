#!/bin/bash
set -e

PROJECT_DIR=$1
SERVICE_NAME=$2

if [ -z "$PROJECT_DIR" ]; then
  echo "Error: Path not define!"
  exit 1
fi

echo "Deploying to: $PROJECT_DIR"
cd "$PROJECT_DIR" || { echo "Directory not found"; exit 1; }

if [ -z "$SERVICE_NAME" ]; then
    echo "Service doesnt exist"
    exit 1
fi

echo "pull image for service"
docker-compose pull "$SERVICE_NAME"

echo "run container $SERVICE_NAME"
docker-compose up -d --no-deps "$SERVICE_NAME"

echo "Deploy $SERVICE_NAME success"