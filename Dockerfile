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
CMD ["npm", "run", "dev"]

# Builder stage
FROM base as builder
WORKDIR /app
COPY . .
RUN ls -l /app  # Debug step to check if all files are copied
RUN npm run build

# Production stage
FROM base as production
ENV NODE_ENV=production
RUN npm ci
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public
RUN ls -l /app  # Debug step to check if all files are copied
CMD ["npm", "start"]