FROM oven/bun:alpine AS builder
WORKDIR /app

COPY package.json bun.lockb ./
COPY web/package.json ./web/
COPY api/package.json ./api/

RUN bun install --frozen-lockfile

COPY web ./web
COPY api ./api

RUN bun run --filter web build

# Production static server
FROM nginx:alpine
COPY --from=builder /app/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]