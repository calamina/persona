FROM oven/bun:alpine
WORKDIR /app

# Copy lockfiles and package shapes to abuse Docker caching
COPY package.json bun.lockb ./
COPY api/package.json ./api/
COPY web/package.json ./web/

RUN bun install --frozen-lockfile

# Copy API source code
COPY api ./api

EXPOSE 3000
CMD [ "bun", "run", "--filter", "api", "src/index.ts" ]