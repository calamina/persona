FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lock ./

COPY api/package.json ./api/
COPY web/package.json ./web/

RUN bun install --frozen-lockfile

COPY api/ ./api/

WORKDIR /app/api

RUN mkdir -p /app/api/data

EXPOSE 3000

CMD ["sh", "-c", "bun drizzle-kit migrate && bun src/index.ts"]