#!/bin/bash

IMAGE_NAME=auth-service-test:test
CONTAINER_NAME=auth-service-test
PORT_HOST=5001
PORT_APP=4001
ENDPOINT="http://localhost:${PORT_HOST}/auth/health"

# Setup koneksi ke Database Host (sesuai docker ps kamu sebelumnya)
# Auth DB kamu jalan di port 5431 di host
DB_HOST="host.docker.internal"
DB_PORT=5431
DB_USER="auth_user"     # Sesuaikan dengan .env kamu
DB_PASS="authpass"     # Sesuaikan dengan .env kamu
DB_NAME="auth_db"      # Sesuaikan dengan .env kamu

MAX_RETRIES=60 # 200 kebanyakan, 30 cukup
DELAY=2

set -e

echo "build image ..."
docker build -t $IMAGE_NAME ./services/auth-service

echo "remove container with same name ..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

echo "run container ..."
# PERUBAHAN PENTING ADA DISINI:
docker run -d \
  -p $PORT_HOST:$PORT_APP \
  --add-host=host.docker.internal:host-gateway \
  -e APP_PORT=$PORT_APP \
  -e DB_HOST=$DB_HOST \
  -e DB_PORT=$DB_PORT \
  -e DB_USER=$DB_USER \
  -e DB_PASSWORD=$DB_PASS \
  -e DB_NAME=$DB_NAME \
  --name $CONTAINER_NAME \
  $IMAGE_NAME

set +e

echo "Waiting for service to start..."
count=0
while [ $count -lt $MAX_RETRIES ]; do
    # Tambahkan -v biar kelihatan kalau ada error http
    if curl -sf $ENDPOINT > /dev/null; then
        echo "Service is UP!"
        break
    fi

    sleep $DELAY
    count=$((count+1))
    echo "Service not ready, hit counting: ${count}"
done

if [ $count -eq $MAX_RETRIES ]; then
    echo "Timeout! Service failed to start"
    echo "Container logs:"
    docker logs $CONTAINER_NAME
    echo "--------------------------------------"
    docker rm -f $CONTAINER_NAME
    exit 1
fi

echo "✅ Smoke test Passed for auth-service"
docker rm -f $CONTAINER_NAME
exit 0