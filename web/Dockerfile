FROM oven/bun:1-alpine AS builder
WORKDIR /app

COPY package.json bun.lockb ./
COPY web/package.json ./web/
COPY api/package.json ./api/

RUN bun install --frozen-lockfile

COPY web/ ./web/
COPY api/ ./api/

ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL
WORKDIR /app/web
RUN bun run build

FROM nginx:alpine
COPY --from=builder /app/web/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]