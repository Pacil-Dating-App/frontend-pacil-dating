# Base image
FROM node:20-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json ./
RUN ls -l /app  # Debug step to check if package.json is copied
RUN npm install
EXPOSE 3000

# Development stage
FROM base as dev
ENV NODE_ENV=development
COPY . .
RUN ls -l /app  # Debug step to check if all files are copied
CMD ["npm", "run", "start"]

# Builder stage
FROM base as builder
WORKDIR /app
COPY . .
RUN ls -l /app  # Debug step to check if all files are copied
RUN npm run build
RUN ls -l /app/build  # Debug step to check if build directory is created

# Production stage
FROM nginx:stable-alpine as production
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
