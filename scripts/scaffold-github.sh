#!/usr/bin/env bash
# Initialize this directory as a git repo, create a GitHub repo under the user's
# personal account (or telus org with --org), and push.
# Usage: ./scripts/scaffold-github.sh [--org telus] [--name factory-test-target]

set -euo pipefail

org=""
name="factory-test-target"

while [[ $# -gt 0 ]]; do
  case "$1" in
    --org) org="$2"; shift 2 ;;
    --name) name="$2"; shift 2 ;;
    *) echo "Unknown flag: $1"; exit 2 ;;
  esac
done

# Resolve owner
if [[ -n "$org" ]]; then
  owner="$org"
  api_path="/orgs/$org/repos"
else
  owner="$(gh api user --jq '.login')"
  api_path="/user/repos"
fi
echo "Target: $owner/$name"

# Check we're in the right dir
test -f package.json || { echo "ERROR: run from the factory-test-target dir (where package.json lives)"; exit 1; }

# Check repo doesn't already exist
if gh api "repos/$owner/$name" >/dev/null 2>&1; then
  echo "ERROR: repo $owner/$name already exists. Either delete it or pass --name <other>."
  exit 1
fi

# Initialize git if needed
if [[ ! -d .git ]]; then
  git init -b main
fi

# Commit if there are changes
git add -A
if ! git diff --staged --quiet 2>/dev/null; then
  git -c user.email="$(git config user.email)" \
      -c user.name="$(git config user.name)" \
      commit -m "Initial commit: factory-test-target scaffold"
fi

# Create the repo via REST (avoids GraphQL rate limits)
echo "Creating $owner/$name (private)..."
gh api -X POST "$api_path" \
  -f name="$name" \
  -f description="Sandbox for smoke-testing telus-claude-code-factory" \
  -F private=true \
  -F has_issues=true \
  -F auto_init=false \
  -F allow_auto_merge=true \
  -F delete_branch_on_merge=true \
  --jq '.full_name' >/dev/null

# Add remote + push
git remote remove origin 2>/dev/null || true
git remote add origin "https://github.com/$owner/$name.git"
git push -u origin main

echo
echo "Repo created and pushed: https://github.com/$owner/$name"
echo
echo "NOTE: branch protection with required status checks must be set manually:"
echo "  https://github.com/$owner/$name/settings/branches"
echo "  Add a rule for 'main' requiring at least one status check (e.g., a GitHub Action that runs npm test)."
echo "  Without this, /night-shift will refuse to launch."
echo
echo "Next steps:"
echo "  1. (Optional) Add a CI workflow that runs npm test on PRs — see .github/workflows/ci.yml template below"
echo "  2. bash scripts/seed-issues.sh    # creates 3 factory-ready issues"
echo "  3. cd to this dir and run /night-shift --dry-run from Claude Code"
