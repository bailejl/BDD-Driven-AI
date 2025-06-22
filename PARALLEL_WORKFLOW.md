# Parallel Upgrade Workflow

This document outlines how multiple Claude Code sessions can work on upgrades simultaneously.

## Quick Start for AI Agents

### Before Starting Any Work

1. **Check Active Branches**

   ```bash
   git branch -a
   git status
   ```

2. **Read Current Status**

   ```bash
   cat UPGRADE_PLANS.md | grep -A 5 "Current Status"
   ```

3. **Check for Conflicts**
   - Review active upgrade branches in CLAUDE.md
   - Ensure your assigned upgrade is not already in progress

## Parallel Execution Slots

### Slot 1: ESLint Migration (READY)

**Branch**: `upgrade/eslint-9`  
**Dependencies**: None  
**AI Agent Instructions**:

```bash
git checkout -b upgrade/eslint-9
# Follow UPGRADE_PLANS.md section "3. ESLint Configuration Migration"
```

### Slot 2: Testing Framework (READY)

**Branch**: `upgrade/testing-framework`  
**Dependencies**: None  
**AI Agent Instructions**:

```bash
git checkout -b upgrade/testing-framework
# Follow UPGRADE_PLANS.md section "4. Testing Framework Updates"
```

### Slot 3: Dev Tooling (READY)

**Branch**: `upgrade/dev-tooling`  
**Dependencies**: None  
**AI Agent Instructions**:

```bash
git checkout -b upgrade/dev-tooling
# Follow UPGRADE_PLANS.md section "6. Node.js Version Update"
# Include Docker and CI/CD updates
```

### Slot 4: Nx Migration (CRITICAL PATH)

**Branch**: `upgrade/nx-workspace`  
**Dependencies**: None, but blocks React work  
**AI Agent Instructions**:

```bash
git checkout -b upgrade/nx-workspace
# Follow UPGRADE_PLANS.md section "1. Nx Workspace Migration"
# PRIORITY: Complete this first to unblock React work
```

### Slot 5: React Ecosystem (BLOCKED)

**Branch**: `upgrade/react-19`  
**Dependencies**: Requires Nx migration completion  
**AI Agent Instructions**:

```bash
# WAIT: Do not start until upgrade/nx-workspace is merged to main
git checkout main
git pull origin main  # Ensure Nx changes are present
git checkout -b upgrade/react-19
# Follow UPGRADE_PLANS.md section "2. React Ecosystem Migration"
```

## Coordination Protocol

### Starting Work

1. **Claim Your Slot**

   ```bash
   # Update CLAUDE.md to show branch as "IN PROGRESS"
   # Example: upgrade/eslint-9 - ESLint 9 migration (IN PROGRESS - Agent A)
   ```

2. **Create Progress File**

   ```bash
   echo "Started by: Claude Agent $(date)" > PROGRESS_$(git branch --show-current).md
   git add PROGRESS_*.md
   git commit -m "Start work on $(git branch --show-current)"
   git push --set-upstream origin $(git branch --show-current)
   ```

### During Work

1. **Regular Updates**

   ```bash
   # Update progress file every 30 minutes or major milestone
   echo "$(date): Major milestone completed" >> PROGRESS_$(git branch --show-current).md
   git add . && git commit -m "Progress update: [description]"
   git push
   ```

2. **Blocking Issues**

   ```bash
   # If blocked, update progress file and stop
   echo "$(date): BLOCKED - [reason]" >> PROGRESS_$(git branch --show-current).md
   git add . && git commit -m "Work blocked: [reason]"
   git push
   ```

### Completing Work

1. **Final Validation**

   ```bash
   # Run full test suite
   make npm run test
   make npm run lint
   make npm run build

   # For branches that affect E2E:
   docker compose up selenium -d
   make npm run e2e-headless
   ```

2. **Prepare for Merge**

   ```bash
   # Update progress file
   echo "$(date): COMPLETED - Ready for merge" >> PROGRESS_$(git branch --show-current).md

   # Update UPGRADE_PLANS.md with lessons learned
   # Mark section as COMPLETED

   git add .
   git commit -m "Complete $(git branch --show-current) upgrade"
   git push
   ```

3. **Request Merge**

   ```bash
   # Update CLAUDE.md to show "READY FOR MERGE"
   # Example: upgrade/eslint-9 - ESLint 9 migration (READY FOR MERGE)
   ```

## Merge Protocol

### For Repository Maintainer

1. **Review Completed Work**

   ```bash
   git fetch --all
   git checkout upgrade/[branch-name]

   # Run validation
   make npm run test
   make npm run lint
   make npm run build
   ```

2. **Merge to Main**

   ```bash
   git checkout main
   git merge upgrade/[branch-name]
   git push origin main

   # Clean up
   git branch -d upgrade/[branch-name]
   git push origin --delete upgrade/[branch-name]
   ```

3. **Update Documentation**

   ```bash
   # Remove branch from active list in CLAUDE.md
   # Update UPGRADE_PLANS.md status
   ```

## Conflict Resolution

### Merge Conflicts

If multiple branches modify the same files:

1. **Identify Conflicts Early**

   ```bash
   git fetch origin main
   git merge origin/main  # Test merge locally
   ```

2. **Coordinate Resolution**
   - Update progress files with conflict details
   - First-merged branch takes precedence
   - Later branches must resolve conflicts

### Dependency Violations

If work starts on dependent branch too early:

1. **Stop Work Immediately**
2. **Update progress file with status**
3. **Wait for dependency completion**

## Communication

### Status Updates

Each AI agent should update their progress file with:

- Start time
- Major milestones
- Blocking issues
- Completion status
- Lessons learned

### Handoff Information

When completing work that unblocks others:

```bash
echo "HANDOFF: [branch-name] ready for dependent work" >> PROGRESS_$(git branch --show-current).md
# Include any important notes for dependent work
```

## Example Session

```bash
# 1. Check status
git branch -a
cat CLAUDE.md | grep -A 10 "Active Upgrade Branches"

# 2. Claim slot
git checkout -b upgrade/eslint-9

# 3. Start work
echo "Started ESLint 9 migration $(date)" > PROGRESS_upgrade-eslint-9.md
git add . && git commit -m "Start ESLint 9 migration"
git push --set-upstream origin upgrade/eslint-9

# 4. Do the work (follow UPGRADE_PLANS.md)
# [... actual upgrade work ...]

# 5. Complete
echo "$(date): COMPLETED - All tests passing" >> PROGRESS_upgrade-eslint-9.md
git add . && git commit -m "Complete ESLint 9 migration"
git push

# 6. Update coordination files
# Edit CLAUDE.md to mark as "READY FOR MERGE"
```

---

_This workflow enables 3-4 parallel upgrade streams while preventing conflicts and ensuring coordination._
