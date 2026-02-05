#!/bin/bash

IMAGE_NAME=user-service-test:test
CONTAINER_NAME=user-service-test

# Stop if error exist
set -e

echo "buid image ..."
docker build -t $IMAGE_NAME ./services/user-service

echo "remove container with same name ..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

echo "run container ..."
docker run -d -p 5002:5002 --name $CONTAINER_NAME $IMAGE_NAME

echo "Waiting for service to be ready"
sleep 10

URL="http://localhost:5002/health"

set +e # Not exit if curl failed, but enter in else process
echo "Smoke test:"
if curl -sf $URL > /dev/null; then
    echo "Smoke test Passed for user-service"
    docker rm -f $CONTAINER_NAME
    exit 0
else
    echo "Smoke test failed for user-service"
    docker rm -f $CONTAINER_NAME
    exit 1
fi