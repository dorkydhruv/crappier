# Stage 1: Builder
FROM node:20 as builder

# Install OpenSSL using apt-get
RUN apt-get update -y && apt-get install -y openssl

# Set the working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package.json yarn.lock ./
RUN yarn install

# Copy the rest of the application files
COPY . .

# Generate Prisma client and build the application
RUN npx prisma generate
RUN yarn build

# Stage 2: Production
FROM node:20-slim

# Install OpenSSL using apt-get
RUN apt-get update -y && apt-get install -y openssl

# Set the working directory
WORKDIR /app

# Environment variables for runtime (injected via Docker Compose)
ENV DATABASE_URL=""
ENV COMMUNICATION_SERVICES_CONNECTION_STRING=""
ENV ANCHOR_WALLET=""

# Copy files from the builder stage
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

# Expose the application port
EXPOSE 3001

# Command to run the app
CMD ["node", "dist/index.js"]
