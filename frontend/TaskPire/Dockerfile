# Build the application
FROM node:24-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npm run build

# Serve the built application with a lightweight web server
FROM nginx:alpine AS production

COPY --from=build /app/dist /usr/share/nginx/html
