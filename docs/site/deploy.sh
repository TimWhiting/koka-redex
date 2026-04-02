#!/bin/sh
# Deploy doc site to gh-pages branch of koka-redex
#
# Usage: ./deploy.sh
#
# Builds the site, then force-pushes out/ to the gh-pages branch.
# Requires: git remote 'origin' pointing to the koka-redex repo.

set -e
cd "$(dirname "$0")"

# Build if needed
if [ ! -d out ]; then
  echo "Building site first..."
  ./build.sh
fi

# Get repo root
REPO_ROOT="$(cd ../.. && pwd)"
REMOTE=$(cd "$REPO_ROOT" && git remote get-url origin 2>/dev/null || echo "")

if [ -z "$REMOTE" ]; then
  echo "Error: no git remote 'origin' found in $REPO_ROOT"
  exit 1
fi

echo "Deploying to gh-pages..."
echo "  Remote: $REMOTE"

# Use a temp directory for the gh-pages commit
TMPDIR=$(mktemp -d)
cp -r out/* "$TMPDIR/"

# Add .nojekyll to prevent GitHub Pages from processing with Jekyll
touch "$TMPDIR/.nojekyll"

cd "$TMPDIR"
git init
git checkout -b gh-pages
git add -A
git commit -m "Deploy koka-redex docs"
git remote add origin "$REMOTE"
git push -f origin gh-pages

echo "Deployed to gh-pages branch."
echo "Site will be available at: https://timwhiting.github.io/koka-redex/"

# Clean up
rm -rf "$TMPDIR"
