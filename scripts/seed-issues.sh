#!/usr/bin/env bash
# Seed 3 sample factory-ready issues on the test target GH repo.
# Run after scaffold-github.sh. Reads owner/name from `git remote get-url origin`.

set -euo pipefail

# Resolve owner/name from origin
remote_url="$(git remote get-url origin)"
case "$remote_url" in
  git@github.com:*)  ownerrepo="${remote_url#git@github.com:}" ; ownerrepo="${ownerrepo%.git}" ;;
  https://github.com/*) ownerrepo="${remote_url#https://github.com/}" ; ownerrepo="${ownerrepo%.git}" ;;
  *) echo "FAIL: cannot parse owner/repo from $remote_url"; exit 1 ;;
esac

echo "Seeding issues on $ownerrepo"

# Ensure the 10 factory labels exist on the target. The factory plugin's seed
# script lives in the plugin repo; this is a standalone duplicate so the test
# workspace doesn't depend on the plugin being installed yet.
declare -a labels=(
  "factory-ready|2da44e|Groomed and ready for the factory to pick up."
  "factory-in-flight|1f6feb|Worker has been dispatched."
  "factory-hold|fbca04|Auto-merge paused for human review."
  "factory-needs-rubric|d93f0b|Not verifiable; AC needed."
  "factory-escalated|d4c5f9|Worker or dispatcher blocked; human input needed."
  "factory-filed|cccccc|Self-filed follow-up from a worker."
  "priority:p0|b60205|Critical."
  "priority:p1|d93f0b|High."
  "priority:p2|fbca04|Normal."
  "priority:p3|0e8a16|Low."
)

for entry in "${labels[@]}"; do
  IFS='|' read -r name color desc <<<"$entry"
  if ! gh -R "$ownerrepo" label list --json name --jq '.[].name' 2>/dev/null | grep -Fxq "$name"; then
    gh -R "$ownerrepo" label create "$name" --color "$color" --description "$desc" >/dev/null
    echo "  + label: $name"
  fi
done

# Create the three sample issues
for f in sample-issues/01-power-function.md \
         sample-issues/02-modulo-function.md \
         sample-issues/03-input-validation.md; do
  title=$(head -1 "$f" | sed 's/^## //')
  body=$(tail -n +3 "$f")
  url=$(gh -R "$ownerrepo" issue create \
    --title "$title" \
    --body "$body" \
    --label factory-ready \
    --label priority:p2)
  echo "  + issue: $url"
done

echo
echo "Done. View the backlog:"
echo "  https://github.com/$ownerrepo/issues?q=is%3Aissue+is%3Aopen+label%3Afactory-ready"
