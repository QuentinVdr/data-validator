#!/bin/bash
# Local CI Script - Simulates GitHub Actions pipeline

echo "🚀 Starting Local CI Pipeline..."
echo "=================================="

# Step 1: Clean workspace
echo "🧹 Cleaning workspace..."
rm -rf node_modules dist coverage 2>/dev/null || true

# Step 2: Install dependencies (using pnpm like the CI)
echo "📦 Installing dependencies with pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm not found. Installing pnpm..."
    npm install -g pnpm
fi

pnpm install --frozen-lockfile

# Step 3: Build the project
echo "🔨 Building TypeScript..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Step 4: Run tests
echo "🧪 Running tests..."
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed!"
    exit 1
fi

echo "✅ All CI steps completed successfully!"
echo "🎉 Your code is ready for deployment!"
