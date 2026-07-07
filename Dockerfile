FROM node:18-alpine AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine
WORKDIR /app

RUN apk add --no-cache dumb-init

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENTRYPOINT ["dumb-init", "--"]
CMD ["npm", "start"]

EXPOSE 3000