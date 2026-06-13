FROM oven/bun:1-alpine

WORKDIR /app

COPY package.json bun.lockb ./
COPY api/package.json ./api/

RUN bun install --frozen-lockfile

COPY api/ ./api/

WORKDIR /app/api

RUN mkdir -p /app/api/data

EXPOSE 3000

CMD ["sh", "-c", "bun drizzle-kit push && bun src/index.ts"]