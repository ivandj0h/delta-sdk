# Stage 1: Build the TypeScript SDK
FROM oven/bun:latest AS builder

WORKDIR /app

# Copy the package.json and bunfig.toml
COPY package*.json ./
COPY bunfig.toml ./

# Install dependencies
RUN bun install

# Copy the source code
COPY ./src ./src

# Build the TypeScript code
RUN bun run tsc

# Stage 2: Final image
FROM oven/bun:latest

WORKDIR /app

# Copy only the built files from the builder
COPY --from=builder /app/dist ./dist

# Set the command to run the SDK
CMD ["bun", "./dist/index.js"]
