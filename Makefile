
# usage:
#   make install
#   make ci
#   make dev
#   make build
#   make start
#   make clean
#   make rebuild

# == VARIABLES ==

PKG_MANAGER = npm
BUILD_DIR = .next

# == COMMANDS ==

install:
	@echo "Installing dependencies..."
	$(PKG_MANAGER) install

ci:
	@echo "Installing dependencies from lock file..."
	$(PKG_MANAGER) ci

dev:
	@echo "Starting development server..."
	$(PKG_MANAGER) run dev

build:
	@echo "Building BadGroceries project..."
	$(PKG_MANAGER) run build

start:
	@echo "Starting production server..."
	$(PKG_MANAGER) run start

clean:
	@echo "Cleaning build artifacts..."
	rm -rf $(BUILD_DIR)
	rm -rf node_modules
	rm -rf .turbo
	rm -rf .vercel

rebuild: clean ci build

help:
	@echo ""
	@echo "Available targets:"
	@echo "  install     Install dependencies from package.json"
	@echo "  ci          Install dependencies from lock file (recommended)"
	@echo "  dev         Run local development server"
	@echo "  build       Build for production"
	@echo "  start       Start production server"
	@echo "  clean       Remove build artifacts"
	@echo "  rebuild     Clean, install from lock, and rebuild project"
	@echo ""

.PHONY: install ci dev build start clean rebuild help
