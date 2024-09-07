# Stage 1: Build the TypeScript SDK
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy package.json dan file lock untuk menginstal dependencies
COPY package*.json ./

# Install dependencies
RUN bun install

# Copy source code dan tsconfig.json
COPY ./src ./src
COPY tsconfig.json .

# Build TypeScript code, override noEmit to force emitting JS files
RUN bun run tsc --noEmit false

# Stage 2: Final image
FROM oven/bun:latest

WORKDIR /app

# Copy hanya file yang sudah dibuild dari tahap build
COPY --from=builder /app/dist ./dist

# Set the command to run the SDK
CMD ["bun", "./dist/index.js"]
