# Makefile for delta-sdk

# Variables
DOCKER_IMAGE_NAME = delta-sdk
TSC = bun run tsc
TEST = bun run jest --config jest.config.json
DOCKERFILE = Dockerfile

# Commands
.PHONY: all build clean test docker-build

# Default command: compile TypeScript
all: clean build

# Compile TypeScript files
build:
	$(TSC)

# Clean output folder (dist)
clean:
	rm -rf dist

# Run unit tests
test:
	$(TEST)

# Build Docker image
docker-build:
	docker build -t $(DOCKER_IMAGE_NAME) -f $(DOCKERFILE) .

# Shortcut: run test + build in Docker
ci: test docker-build
