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

# Hapus noEmit dari tsconfig.json selama proses build
RUN sed -i '/"noEmit": true,/d' tsconfig.json && bun run tsc

# Stage 2: Final image
FROM oven/bun:latest

WORKDIR /app

# Copy only the built files from the builder
COPY --from=builder /app/dist ./dist

# Set the command to run the SDK
CMD ["bun", "./dist/index.js"]
