#!/bin/bash

# Variables
ORGANIZATION="pacil-dating-app"
REPOSITORY="frontend-pacil-dating"
IMAGE_NAME="ghcr.io/${ORGANIZATION}/${REPOSITORY}:latest"

# Prompt for GitHub credentials
read -p "Enter your GitHub username: " GITHUB_USERNAME
read -sp "Enter your GitHub token: " GITHUB_TOKEN
echo # new line for clean output after hidden input

# Authenticate with GitHub Container Registry
echo "Logging into GitHub Container Registry..."
echo $GITHUB_TOKEN | docker login ghcr.io -u $GITHUB_USERNAME --password-stdin

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# # Tag the Docker image
# echo "Tagging Docker image..."
# docker tag $IMAGE_NAME ghcr.io/$IMAGE_NAME

# Push the Docker image to GitHub Container Registry
echo "Pushing Docker image to GitHub Container Registry..."
docker push $IMAGE_NAME

echo "Docker image pushed successfully."
