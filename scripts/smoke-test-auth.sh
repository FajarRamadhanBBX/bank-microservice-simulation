#!/bin/bash

IMAGE_NAME=auth-service-test:test
CONTAINER_NAME=auth-service-test
PORT_HOST=5001
PORT_APP=4001
ENDPOINT="http://localhost:${PORT_HOST}/health"

MAX_RETRIES=30
DELAY=2

# Stop if error exist
set -e

echo "buid image ..."
docker build -t $IMAGE_NAME ./services/auth-service

echo "remove container with same name ..."
docker rm -f $CONTAINER_NAME 2>/dev/null || true

echo "run container ..."
docker run -d -p $PORT_HOST:$PORT_APP --name $CONTAINER_NAME $IMAGE_NAME

set +e

count=0
while [ $count -lt $MAX_RETRIES ]; do
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
    echo "Container logs"
    docker logs $CONTAINER_NAME
    echo "--------------------------------------"
    docker rm -f $CONTAINER_NAME
    exit 1
fi

echo "✅ Smoke test Passed for auth-service"
docker rm -f $CONTAINER_NAME
exit 0