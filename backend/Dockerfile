FROM node:24-alpine AS base

# Install dependencies
FROM base AS deps

WORKDIR /app

COPY package.json package-lock.json .
RUN npm ci

# Production image, copy all the files and run
FROM base AS runner

WORKDIR /app

COPY --from=deps /app/node_modules /app/node_modules
COPY . /app

ENV PORT=5000
EXPOSE 5000

CMD ["node", "server.js"]
