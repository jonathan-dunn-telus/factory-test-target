#!/usr/bin/env bash
# Delete the GitHub repo + local .git + factory state. Idempotent.
# Use after testing if you want a clean reset.

set -uo pipefail

# Resolve target
if [[ -d .git ]]; then
  remote_url="$(git remote get-url origin 2>/dev/null || true)"
  case "$remote_url" in
    git@github.com:*)  ownerrepo="${remote_url#git@github.com:}" ; ownerrepo="${ownerrepo%.git}" ;;
    https://github.com/*) ownerrepo="${remote_url#https://github.com/}" ; ownerrepo="${ownerrepo%.git}" ;;
    *) ownerrepo="" ;;
  esac
fi

# Confirm before destructive action
echo "About to delete:"
[[ -n "${ownerrepo:-}" ]] && echo "  GitHub repo: $ownerrepo"
echo "  Local .git directory"
echo "  .factory-state/ and .factory-sidecars/"
read -r -p "Proceed? (yes/no) " confirm
[[ "$confirm" == "yes" ]] || { echo "Aborted."; exit 0; }

if [[ -n "${ownerrepo:-}" ]]; then
  # delete_repo scope is required for this
  gh api -X DELETE "repos/$ownerrepo" 2>&1 | head -3 || \
    echo "WARN: gh repo delete failed — your token may lack delete_repo scope. Delete manually at https://github.com/$ownerrepo/settings"
fi

rm -rf .git .factory-state .factory-sidecars
echo "Local cleanup done. Re-run scaffold-github.sh to start fresh."
