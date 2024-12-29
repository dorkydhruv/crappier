FROM node:20 as builder

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

RUN npx prisma generate
RUN yarn build

FROM node:20-slim

RUN apt-get update -y && apt-get install -y openssl

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package.json ./package.json

EXPOSE 3001

CMD ["node", "dist/index.js"]
