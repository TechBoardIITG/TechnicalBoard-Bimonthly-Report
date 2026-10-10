# Stage 1: Build the React client app
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Build arguments for Vite
ARG VITE_BASE=/
ARG VITE_BACKEND_URL=/api
ARG VITE_API_URL=/api

ENV VITE_BASE=$VITE_BASE
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve using Nginx
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 3000
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
