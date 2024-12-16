FROM node:22-alpine3.20

# Install build tools
RUN apk add --no-cache python3 make g++

COPY . /app
WORKDIR /app

# Clean npm cache and install dependencies
RUN npm cache clean --force
RUN npm install --legacy-peer-deps

EXPOSE 3000
RUN npm run build