#!/usr/bin/env bash
set -e

SERVICE_NAME=$1
IMAGE_TAG=$2
PORT=$3

if [ -z "$SERVICE_NAME" ] || [ -z "$IMAGE_TAG" ] || [ -z "$PORT" ]; then
  echo "Usage: smoke-test.sh <service-name> <image-tag> <port>"
  exit 1
fi

echo "▶️ Starting smoke test for $SERVICE_NAME"

CONTAINER_NAME="smoke-${SERVICE_NAME}"

# Jalankan container sementara
docker run -d \
  --name $CONTAINER_NAME \
  -p $PORT:3000 \
  $IMAGE_TAG

# Tunggu service naik
echo "⏳ Waiting for service to be ready..."
sleep 5

# Hit health endpoint
HEALTH_URL="http://localhost:${PORT}/health"

if curl -sf $HEALTH_URL > /dev/null; then
  echo "✅ Smoke test PASSED for $SERVICE_NAME"
  docker rm -f $CONTAINER_NAME
  exit 0
else
  echo "❌ Smoke test FAILED for $SERVICE_NAME"
  docker logs $CONTAINER_NAME
  docker rm -f $CONTAINER_NAME
  exit 1
fi
