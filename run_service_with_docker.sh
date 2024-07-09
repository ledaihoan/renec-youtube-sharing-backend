#!/usr/bin/env bash
IMAGE_NAME=renec-yt-sharing-backend
CONTAINER_NAME=renect-yt-sharing-backend
SERVICE_PORT=8000
MOUNT_PORT=8000
docker build -t $IMAGE_NAME .

# Check if the container already exists
if [ "$(docker ps -aq -f name=^/${CONTAINER_NAME}$)" ]; then
    echo "Found existing container. Stopping and removing it..."
    docker stop $CONTAINER_NAME
    docker rm $CONTAINER_NAME
fi

# local run with interactive stream
docker run --name $CONTAINER_NAME -dp $MOUNT_PORT:$SERVICE_PORT $IMAGE_NAME
