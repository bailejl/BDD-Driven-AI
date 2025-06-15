# Upgrade Plans

This document outlines the remaining dependency upgrades needed for the codebase. Each section provides a detailed plan that an AI agent can follow to perform the upgrades safely.

## Current Status

As of June 2025, the following major updates have been completed:
- ✅ Security vulnerabilities: 462 of 753 fixed
- ✅ TypeScript: 4.0.7 → 4.9.5  
- ✅ WebdriverIO: 7.7.3 → 9.15.0
- ✅ Prettier: 2.2.1 → 3.5.3
- ✅ Testing libraries updated
- ✅ Node.js types: 12.x → 24.x

## Remaining High-Priority Upgrades

### 1. Nx Workspace Migration (CRITICAL)

**Current**: Nx 12.3.6  
**Target**: Nx 21.x (latest stable)  
**Impact**: High - Core build system migration  
**Risk**: High - Breaking changes to build configuration

#### Prerequisites
- [ ] Create backup branch
- [ ] Document current Nx configuration
- [ ] Review Nx 21 migration guide

#### Step-by-Step Plan

1. **Preparation Phase**
   ```bash
   git checkout -b upgrade/nx-workspace
   git push --set-upstream origin upgrade/nx-workspace
   ```

2. **Documentation Phase**
   ```bash
   # Document current configuration
   cp nx.json nx.json.backup
   cp workspace.json workspace.json.backup
   cp package.json package.json.backup
   ```

3. **Migration Phase**
   ```bash
   # Update Nx CLI globally first
   npm install -g nx@latest
   
   # Run Nx migration
   npx nx migrate latest
   
   # Review migrations.json for breaking changes
   cat migrations.json
   
   # Install new dependencies
   npm install
   
   # Run migrations
   npx nx migrate --run-migrations
   ```

4. **Validation Phase**
   ```bash
   # Test build system
   make npm run build
   make npm run test
   make npm run lint
   
   # Test E2E (requires selenium container)
   docker compose up selenium -d
   make npm run e2e-headless
   ```

5. **Configuration Updates**
   - Update `.eslintrc.json` if needed
   - Update `jest.config.js` if needed
   - Update `tsconfig.base.json` if needed
   - Review and update workspace configuration

6. **Cleanup Phase**
   ```bash
   rm migrations.json
   npm audit fix
   ```

#### Success Criteria
- [ ] All builds pass
- [ ] All tests pass
- [ ] E2E tests pass
- [ ] No breaking changes in development workflow

#### Rollback Plan
```bash
git checkout main
git branch -D upgrade/nx-workspace
```

---

### 2. React Ecosystem Migration (HIGH)

**Current**: React 17.0.1  
**Target**: React 19.x (latest)  
**Impact**: High - Core UI framework  
**Risk**: Medium - Well-documented migration path

#### Prerequisites
- [ ] Complete Nx migration first
- [ ] Review React 19 breaking changes
- [ ] Update testing utilities compatibility

#### Step-by-Step Plan

1. **Preparation Phase**
   ```bash
   git checkout -b upgrade/react-19
   ```

2. **Dependency Updates**
   ```bash
   # Update React core
   npm install react@^19 react-dom@^19
   
   # Update React types
   npm install --save-dev @types/react@^19 @types/react-dom@^19
   
   # Update React testing library
   npm install --save-dev @testing-library/react@^16
   ```

3. **Code Migration**
   - Replace deprecated `ReactDOM.render` with `createRoot`
   - Update component patterns for React 19
   - Update test patterns for new testing library

4. **Material-UI Migration**
   ```bash
   # Migrate from Material-UI v4 to MUI v6
   npm install @mui/material@^6 @mui/icons-material@^6
   npm uninstall @material-ui/core @material-ui/icons @material-ui/pickers
   ```

5. **Form Library Updates**
   ```bash
   # Update React Hook Form
   npm install react-hook-form@^7
   npm install @hookform/resolvers@^5
   ```

6. **Router Updates**
   ```bash
   # Update React Router
   npm install react-router-dom@^7
   ```

7. **Validation Phase**
   ```bash
   make npm run build
   make npm run test
   make npm run lint
   make npm run e2e-headless
   ```

#### Success Criteria
- [ ] All React components render correctly
- [ ] All forms function properly
- [ ] All tests pass
- [ ] No console warnings
- [ ] E2E tests pass

#### Breaking Changes to Address
- Update `ReactDOM.render` usage
- Update Material-UI import paths
- Update React Hook Form API usage
- Update React Router API usage

---

### 3. ESLint Configuration Migration (MEDIUM)

**Current**: ESLint 7.10.0  
**Target**: ESLint 9.x (latest)  
**Impact**: Medium - Code quality tooling  
**Risk**: Medium - Configuration format changes

#### Prerequisites
- [ ] Complete Nx migration
- [ ] Review ESLint 9 flat config format

#### Step-by-Step Plan

1. **Preparation Phase**
   ```bash
   git checkout -b upgrade/eslint-9
   cp .eslintrc.json .eslintrc.json.backup
   ```

2. **TypeScript ESLint Updates**
   ```bash
   npm install --save-dev @typescript-eslint/eslint-plugin@^8 @typescript-eslint/parser@^8
   ```

3. **Plugin Updates**
   ```bash
   npm install --save-dev eslint-plugin-react@^7.37 eslint-plugin-react-hooks@^5
   npm install --save-dev eslint-plugin-import@^2.31 eslint-plugin-jsx-a11y@^6.10
   ```

4. **Configuration Migration**
   - Convert `.eslintrc.json` to flat config format (`eslint.config.js`)
   - Update rule configurations for ESLint 9
   - Test configuration with sample files

5. **Integration Updates**
   - Update Nx ESLint integration
   - Update VS Code settings if needed
   - Update CI/CD configuration

6. **Validation Phase**
   ```bash
   make npm run lint
   npx eslint --print-config apps/declarative-gherkin/src/app/app.tsx
   ```

#### Success Criteria
- [ ] All files pass linting
- [ ] No deprecated rule warnings
- [ ] Nx integration works
- [ ] IDE integration works

---

### 4. Testing Framework Updates (MEDIUM)

**Current**: Jest 26.x, ts-jest 26.x  
**Target**: Jest 30.x, ts-jest 29.x  
**Impact**: Medium - Testing infrastructure  
**Risk**: Low - Well-documented migration

#### Prerequisites
- [ ] Complete Nx migration
- [ ] Ensure TypeScript compatibility

#### Step-by-Step Plan

1. **Jest Updates**
   ```bash
   npm install --save-dev jest@^30 ts-jest@^29 @types/jest@^29
   ```

2. **Configuration Updates**
   - Update `jest.config.js` for Jest 30
   - Update `ts-jest` configuration
   - Update test setup files

3. **Babel Updates**
   ```bash
   npm install --save-dev babel-jest@^30 @babel/core@^7.27
   npm install --save-dev @babel/preset-env@^7.27 @babel/preset-react@^7.27 @babel/preset-typescript@^7.27
   ```

4. **Validation Phase**
   ```bash
   make npm run test
   ```

#### Success Criteria
- [ ] All tests pass
- [ ] No deprecation warnings
- [ ] Test coverage maintained

---

### 5. Build Tool Modernization (LOW)

**Current**: Webpack 4.x  
**Target**: Webpack 5.x or Vite  
**Impact**: Medium - Build performance  
**Risk**: Medium - Build configuration changes

#### Prerequisites
- [ ] Complete Nx migration (may handle this automatically)
- [ ] Review Nx build system updates

#### Step-by-Step Plan

1. **Assessment Phase**
   - Check if Nx migration already updated build tools
   - Evaluate Vite vs Webpack 5 for this project

2. **Webpack 5 Migration** (if needed)
   ```bash
   npm install --save-dev webpack@^5
   ```
   - Update webpack configuration
   - Update plugins for Webpack 5 compatibility

3. **Validation Phase**
   ```bash
   make npm run build
   make npm run start
   ```

#### Success Criteria
- [ ] Build times improved
- [ ] All assets load correctly
- [ ] Development server works
- [ ] Production builds work

---

### 6. Node.js Version Update (LOW)

**Current**: Node.js 14.x (in Docker)  
**Target**: Node.js 20.x LTS  
**Impact**: Low - Runtime environment  
**Risk**: Low - Backward compatible

#### Prerequisites
- [ ] Complete all other upgrades
- [ ] Update CI/CD pipeline

#### Step-by-Step Plan

1. **Local Development**
   - Update `.nvmrc` to `20`
   - Update `package.json` engines field

2. **Docker Updates**
   - Update base image in `npm.Dockerfile`
   - Update docker-compose configuration

3. **CI/CD Updates**
   - Update GitHub Actions Node version
   - Update any other CI configurations

4. **Validation Phase**
   ```bash
   make npm install
   make npm run build
   make npm run test
   ```

#### Success Criteria
- [ ] All builds pass on Node 20
- [ ] No compatibility issues
- [ ] Performance improvements observed

---

## General Upgrade Guidelines

### Before Starting Any Upgrade

1. **Create Feature Branch**
   ```bash
   git checkout -b upgrade/[component-name]
   git push --set-upstream origin upgrade/[component-name]
   ```

2. **Backup Current State**
   ```bash
   cp package.json package.json.backup
   git add . && git commit -m "Backup before [component] upgrade"
   ```

3. **Run Baseline Tests**
   ```bash
   make npm run test
   make npm run lint
   make npm run build
   ```

### During Upgrade

1. **Incremental Changes**
   - Make one major change at a time
   - Test after each significant change
   - Commit working states frequently

2. **Documentation**
   - Document any manual changes required
   - Note any breaking changes encountered
   - Update this file with lessons learned

### After Upgrade

1. **Comprehensive Testing**
   ```bash
   make npm run test
   make npm run lint
   make npm run build
   make npm run e2e-headless
   ```

2. **Performance Validation**
   - Check build times
   - Check test execution times
   - Check bundle size

3. **Documentation Updates**
   - Update CLAUDE.md if needed
   - Update package.json scripts if needed
   - Update README.md if needed

### Rollback Procedure

If any upgrade fails:

1. **Immediate Rollback**
   ```bash
   git checkout .
   git clean -fd
   npm install
   ```

2. **Full Rollback**
   ```bash
   git checkout main
   git branch -D upgrade/[component-name]
   ```

3. **Analysis**
   - Document what went wrong
   - Update this plan with lessons learned
   - Consider alternative approaches

## Priority Order

Execute upgrades in this order to minimize conflicts:

1. **Nx Workspace Migration** (enables other upgrades)
2. **ESLint Configuration** (fixes linting for other changes)
3. **Testing Framework** (ensures good test coverage during other changes)
4. **React Ecosystem** (major application framework)
5. **Build Tool Modernization** (performance improvements)
6. **Node.js Version** (foundation improvements)

## Success Metrics

- [ ] Zero security vulnerabilities (critical/high)
- [ ] All tests passing
- [ ] Build times improved by 20%+
- [ ] Development experience improved
- [ ] Future upgrade paths cleared
- [ ] Modern tooling ecosystem achieved

---

*Last Updated: June 2025*  
*Next Review: December 2025*