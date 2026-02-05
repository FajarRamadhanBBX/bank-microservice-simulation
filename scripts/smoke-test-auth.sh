#!/bin/bash

IMAGE_NAME=auth-service-test:test
CONTAINER_NAME=auth-service-test

# Stop if error exist
set -e

echo "buid image ..."
docker build -t $IMAGE_NAME ./services/auth-service

echo "remove container with same name ..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

echo "run container ..."
docker run -d -p 5001:5001 --name $CONTAINER_NAME $IMAGE_NAME

echo "Waiting for service to be ready"
sleep 10

URL="http://localhost:5001/health"

set +e # Not exit if curl failed, but enter in else process
echo "Smoke test:"
if curl -sf $URL > /dev/null; then
    echo "Smoke test Passed for auth-service"
    docker rm -f $CONTAINER_NAME
    exit 0
else
    echo "Smoke test failed for auth-service"
    docker rm -f $CONTAINER_NAME
    exit 1
fi