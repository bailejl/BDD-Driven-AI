# GitHub Actions CI/CD Pipeline

This directory contains the GitHub Actions workflows for the Cucumber Declarative Gherkin project.

## Workflows Overview

### 1. CI Pipeline (`ci.yml`)

**Triggers:** Push to main, Pull requests to main, Manual dispatch

**Jobs:**

- **test** - Unit tests, linting, and build validation
- **e2e-tests** - End-to-end testing with Selenium
- **security-audit** - Security vulnerability scanning
- **quality-checks** - Code formatting, TypeScript compilation, dependency checks
- **parallel-upgrade-validation** - Special validation for upgrade branches

**Key Features:**

- Runs on Node.js 24
- Uses npm cache for faster builds
- Uploads test coverage and E2E screenshots on failure
- Fails on high/critical security vulnerabilities

### 2. PR Validation (`pr-validation.yml`)

**Triggers:** PR opened, synchronized, reopened, ready for review

**Jobs:**

- **pr-info** - Detects upgrade branches and sets context
- **validation** - Validates upgrade branch requirements
- **mandatory-tests** - Core test suite (unit, lint, build, security)
- **e2e-validation** - E2E tests for upgrade branches or tagged PRs
- **merge-readiness** - Final validation check
- **upgrade-conflict-detection** - Checks for conflicting upgrade work

**Special Features for Upgrade Branches:**

- Validates progress file existence
- Checks dependency order (React waits for Nx)
- Ensures proper upgrade branch naming
- Comments PR status and checklist
- Detects conflicting parallel upgrade work

### 3. Deploy Pipeline (`deploy.yml`)

**Triggers:** Push to main, Manual dispatch with environment selection

**Jobs:**

- **post-merge-validation** - Comprehensive validation after merge
- **e2e-smoke-tests** - Full E2E test suite on main
- **build-and-package** - Creates production build artifacts
- **staging-deployment** - Deploys to staging environment
- **production-deployment** - Deploys to production (manual trigger only)
- **upgrade-coordination** - Notifies other upgrade branches of merges

**Deployment Features:**

- Automatic staging deployment on main branch pushes
- Manual production deployment with approval gates
- Artifact management with appropriate retention periods
- GitHub release creation for production deployments
- Cleanup of upgrade artifacts after merge

## Upgrade Branch Support

The pipeline has special support for the parallel upgrade strategy defined in `PARALLEL_WORKFLOW.md`:

### Supported Upgrade Branches

- `upgrade/eslint-9` - ESLint 9 migration
- `upgrade/testing-framework` - Jest/ts-jest updates
- `upgrade/dev-tooling` - Node.js/Docker/CI updates
- `upgrade/nx-workspace` - Nx workspace migration
- `upgrade/react-19` - React ecosystem upgrade

### Validation Requirements

1. **Progress File** - Must have `PROGRESS_upgrade-[type].md`
2. **Naming Convention** - Must follow exact branch naming
3. **Dependency Order** - React upgrade waits for Nx completion
4. **Quality Gates** - All standard tests must pass
5. **Completion Status** - Progress file must indicate "COMPLETED"

### Coordination Features

- Detects conflicting parallel upgrade work
- Validates dependency relationships
- Comments PR status and checklists
- Notifies other branches when upgrades merge
- Prevents premature merging of dependent work

## Environment Configuration

### Node.js Version

- **Version:** 24 (latest LTS)
- **Cache:** npm dependencies cached by package-lock.json hash
- **Working Directory:** `first-bank-of-change/`

### Security Requirements

- **Audit Level:** Fails on high/critical vulnerabilities
- **Dependencies:** Checks for unused packages
- **Code Quality:** Enforces TypeScript compilation and formatting

### E2E Testing

- **Browser:** Chrome via Selenium standalone container
- **Port Mapping:** 4444 (Selenium), 7900 (VNC)
- **Triggers:** All upgrade branches, PRs tagged with `[e2e]`
- **Artifacts:** Screenshots and reports on failure

## Usage Examples

### Standard Feature Development

```bash
git checkout -b feature/new-functionality
# Make changes...
git push origin feature/new-functionality
# Create PR - will trigger pr-validation.yml
```

### Upgrade Branch Development

```bash
git checkout -b upgrade/eslint-9
echo "Started ESLint 9 migration $(date)" > PROGRESS_upgrade-eslint-9.md
# Follow UPGRADE_PLANS.md...
echo "COMPLETED: Ready for merge" >> PROGRESS_upgrade-eslint-9.md
git push origin upgrade/eslint-9
# Create PR - will trigger upgrade-specific validation
```

### Manual Production Deployment

1. Go to Actions tab in GitHub
2. Select "Deploy to Main" workflow
3. Click "Run workflow"
4. Select "production" environment
5. Confirm deployment

## Status Badges

Add these to your README.md to show pipeline status:

```markdown
![CI Pipeline](https://github.com/bailejl/cucumber-declarative-gherkin/workflows/CI%20Pipeline/badge.svg)
![Deploy Status](https://github.com/bailejl/cucumber-declarative-gherkin/workflows/Deploy%20to%20Main/badge.svg)
```

## Troubleshooting

### Common Issues

**Tests failing on PR:**

1. Check unit test output in CI logs
2. Ensure all dependencies are in package.json
3. Verify Node.js version compatibility

**E2E tests timing out:**

1. Check Selenium container startup logs
2. Verify application is starting correctly
3. Check for port conflicts

**Security audit failures:**

1. Run `npm audit fix` locally
2. Update vulnerable dependencies
3. Check for new critical vulnerabilities

**Upgrade branch validation errors:**

1. Ensure progress file exists and has correct name
2. Check branch naming follows exact convention
3. Verify dependency order (React after Nx)
4. Mark progress file as "COMPLETED" when ready

### Getting Help

1. Check workflow logs in GitHub Actions tab
2. Review error messages in PR comments
3. Consult PARALLEL_WORKFLOW.md for upgrade coordination
4. Review UPGRADE_PLANS.md for specific upgrade instructions

## Maintenance

### Regular Tasks

- Monitor security vulnerability reports
- Update Node.js version in workflows when new LTS available
- Review and update dependency versions quarterly
- Clean up old workflow runs and artifacts

### Workflow Updates

- Test changes in feature branches first
- Use workflow_dispatch for manual testing
- Validate with upgrade branches before merging
- Document breaking changes in this README
