# factory-test-target

A tiny Node.js sandbox project for smoke-testing **telus-claude-code-factory**. Three sample issues describing small, well-scoped features that an autonomous worker can implement end-to-end.

## What you do

```bash
# 1. From this directory, scaffold + push to GitHub
bash scripts/scaffold-github.sh

# 2. Seed three sample factory-ready issues
bash scripts/seed-issues.sh

# 3. Install the factory plugin into your Claude Code
#    (from any Claude Code session — two-step: add marketplace, install plugin)
/plugin marketplace add telus/telus-claude-code-factory
/plugin install telus-claude-code-factory@telus-cc-factories

# 4. Dry-run first
/night-shift --dry-run

# 5. Launch
/night-shift

# 6. Watch
/factory-status

# 7. Walk away. Come back to PRs.

# 8. Stop (graceful)
touch .factory-state/STOP
```

## What's in here before you do anything

```
factory-test-target/
├── CLAUDE.md              conventions for workers
├── package.json           dependencies (eslint, vitest)
├── src/calculator.js      tiny calculator module
├── tests/calculator.test.js
├── eslint.config.js
├── scripts/
│   ├── scaffold-github.sh   creates GH repo + branch protection + auto-merge
│   ├── seed-issues.sh       posts 3 sample factory-ready issues
│   └── teardown.sh          (use when you're done — deletes the GH repo)
└── sample-issues/
    ├── 01-power-function.md
    ├── 02-modulo-function.md
    └── 03-input-validation.md
```

The three sample issues are intentionally tiny: each adds one function with tests + lint expectations. A worker should be able to satisfy any of them in 5–10 turns.

## Expected outcome of a successful smoke test

- Layer 1 dispatches the first issue (typically `#1` after seeding) within one tick
- A worker appears in `claude agents` as a row labelled by the orchestrator agent
- The worker delegates to `implementer` → `verifier` → `reviewer`, opens a PR with `Closes #1`
- Layer 1's next-tick reap routine sees the PR, waits for CI to go green, then `gh pr merge --squash --delete-branch`
- Repeat for issues #2 and #3 until backlog is empty
- Total wall-clock time, end-to-end: 30–60 minutes depending on loop-interval and CI speed

## If something goes wrong

Check `/factory-status` first. The Troubleshooting section of the [Operator User Guide](https://offnet-kb.gizmos.run/d/cc-goals-factory-operator-user-guide-j9bz#troubleshoot) covers the common failures.

To start over cleanly:
```bash
bash scripts/teardown.sh    # deletes the GH repo + local clone
```
