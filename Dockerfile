FROM node:20.11.0-slim as builder

ENV NODE_ENV=production

RUN apt-get update && \
    apt-get install -y --no-install-recommends git && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY package*.json .
COPY scripts ./scripts
RUN npm ci && npm cache clean --force

COPY . .
RUN npm run build:prod

###

FROM nginx:1.25.4-alpine

COPY --from=builder /app/dist/har-viewer/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
