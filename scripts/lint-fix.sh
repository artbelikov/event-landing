#!/bin/bash

# ESLint auto-fix script for frontend
# This script automatically fixes ESLint issues including unused imports

set -e

echo "🔍 Running ESLint auto-fix on frontend..."
echo "📁 Current directory: $(pwd)"

# Check if we're in the frontend directory
if [ ! -f "package.json" ] || [ ! -f "eslint.config.js" ]; then
    echo "❌ Error: This script must be run from the frontend project root directory"
    exit 1
fi

# Run ESLint with auto-fix
echo "🧹 Fixing ESLint issues..."
bun run eslint:fix

# Check if there are any remaining issues
echo "🔍 Checking for remaining ESLint issues..."
if bun run eslint:check; then
    echo "✅ All ESLint issues have been resolved!"
else
    echo "⚠️  Some ESLint issues remain that require manual attention"
    echo "💡 Run 'bun run eslint' to see the remaining issues"
    exit 1
fi

echo "🎉 ESLint auto-fix completed successfully!"
