#!/bin/bash
set -e

# Test Configuration
IMAGE_NAME="auth-service-test:test"
CONTAINER_NAME="auth-service-test"
APP_PORT=4001
PORT_HOST=5001
ENDPOINT="http://localhost:${PORT_HOST}/auth/health"

# Adjust with your network
DOCKER_NETWORK=$DOCKER_NETWORK

# DB Configuration
DB_HOST="auth-postgres" # from service name in compose
DB_PORT=5432
DB_USER=$AUTH_USER
DB_PASS=$AUTH_PASSWORD
DB_NAME=$AUTH_DB

MAX_RETRIES=30
DELAY=2

# Clean old container
echo "Remove old container (if exists)..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

# Build image test
echo "Build auth-service image..."
docker build -t $IMAGE_NAME ../services/auth-service

# Run container (join with compose network)
echo "Run smoke test auth service container..."
docker run -d \
  --name $CONTAINER_NAME \
  --network $DOCKER_NETWORK \
  -p $PORT_HOST:$APP_PORT \
  -e APP_PORT=$APP_PORT \
  -e DB_HOST=$DB_HOST \
  -e DB_PORT=$DB_PORT \
  -e DB_USER=$DB_USER \
  -e DB_PASSWORD=$DB_PASS \
  -e DB_NAME=$DB_NAME \
  $IMAGE_NAME

echo "Waiting for service to be healthy..."
count=0
until curl -sf $ENDPOINT > /dev/null; do
  sleep $DELAY
  count=$((count + 1))
  echo "Attempt $count/$MAX_RETRIES"

  if [ $count -ge $MAX_RETRIES ]; then
    echo "Smoke test FAILED"
    echo "=========== Container logs: ==========="
    docker logs $CONTAINER_NAME
    docker rm -f $CONTAINER_NAME
    echo "======================================="
    exit 1
  fi
done

echo "Smoke test PASSED"
# Clean if passed
echo "Container logs:"
echo "=========== Container logs: ==========="
docker logs $CONTAINER_NAME
docker rm -f $CONTAINER_NAME
echo "======================================="
exit 0
