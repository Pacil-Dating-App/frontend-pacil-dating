#!/bin/bash

# Variables
USERNAME="mikasuryof"
REPOSITORY="frontend-pacil-dating"
IMAGE_NAME="${USERNAME}/${REPOSITORY}:latest"

# Check for Docker Hub username and password
if [ -z "$1" ] || [ -z "$2" ]; then
    echo "Usage: $0 <DOCKER_USERNAME> <DOCKER_PASSWORD>"
    exit 1
fi

DOCKER_USERNAME=$1
DOCKER_PASSWORD=$2

# Login to Docker Hub
echo "Logging into Docker Hub..."
echo $DOCKER_PASSWORD | docker login -u $DOCKER_USERNAME --password-stdin

# Build the Docker image
echo "Building Docker image..."
docker buildx build --platform linux/amd64 -t $IMAGE_NAME .

# Push the Docker image to Docker Hub
echo "Pushing Docker image to Docker Hub..."
docker push $IMAGE_NAME

echo "Docker image pushed successfully."
