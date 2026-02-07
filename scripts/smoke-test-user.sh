#!/bin/bash
set -e

# Load Environment Variables
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
else
  echo "⚠️  Warning: .env file not found. Using default env."
fi

# Configuration
IMAGE_NAME="user-service-test:test"
CONTAINER_NAME="user-service-test"
APP_PORT=4002
PORT_HOST=5002 
DOCKER_NETWORK="backend-network"

# DB Config
DB_HOST="users_db" 
DB_PORT=5432
DB_USER=$USERS_USER
DB_PASS=$USERS_PASSWORD
DB_NAME=$USERS_DB

MAX_RETRIES=10
DELAY=2

# Cleanup Old Container
echo "Cleaning up old container..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

# Build Image
echo "Building user-service image..."
docker build -t $IMAGE_NAME ../services/user-service

# Run Container
echo "Running user-service container..."
docker run -d \
  --name $CONTAINER_NAME \
  --network $DOCKER_NETWORK \
  -p $PORT_HOST:$APP_PORT \
  -e APP_PORT=$APP_PORT \
  -e DB_HOST=$DB_HOST \
  -e DB_PORT=$DB_PORT \
  -e DB_USER=$DB_USER \
  -e DB_PASSWORD="userspass" \
  -e DB_NAME=$DB_NAME \
  $IMAGE_NAME

echo "Waiting for service to be healthy..."

# Health Check Loop
INTERNAL_ENDPOINT="http://$CONTAINER_NAME:$APP_PORT/users/health"
count=0

until docker run --rm --network $DOCKER_NETWORK curlimages/curl -sf $INTERNAL_ENDPOINT > /dev/null; do
  sleep $DELAY
  count=$((count + 1))
  echo "   Attempt $count/$MAX_RETRIES..."

  if ! docker ps | grep -q $CONTAINER_NAME; then
    echo "Container died unexpectedly."
    echo "=========== Container logs: ==========="
    docker logs $CONTAINER_NAME
    echo "======================================="
    docker rm -f $CONTAINER_NAME
    exit 1
  fi

  if [ $count -ge $MAX_RETRIES ]; then
    echo "Timeout waiting for health check."
    echo "=========== Container logs: ==========="
    docker logs $CONTAINER_NAME
    echo "======================================="
    docker rm -f $CONTAINER_NAME
    exit 1
  fi
done

echo "+=+= Smoke test PASSED! Service is healthy. =+=+"
# Cleanup
echo "Cleaning up test container..."
echo "=========== Container logs: ==========="
docker logs $CONTAINER_NAME
echo "======================================="
docker rm -f $CONTAINER_NAME
exit 0