# Repository Simplification Plan

## Current Complex Structure (Nx Workspace)

```
first-bank-of-change/
├── apps/
│   ├── declarative-gherkin/          # Main React app
│   └── declarative-gherkin-e2e/      # Unused Cypress tests
├── libs/
│   ├── ui/                           # React components  
│   ├── data/                         # Data utilities
│   └── fake-security/                # Mock auth
├── features/                         # WebdriverIO E2E tests
├── nx.json                           # Nx configuration
├── workspace.json                    # Nx workspace config
└── package.json                      # Complex Nx dependencies
```

## Proposed Simple Structure

```
/
├── src/                              # Main application source
│   ├── components/                   # React components (from libs/ui)
│   │   ├── forms/
│   │   ├── auth/
│   │   ├── navigation/
│   │   └── shared/
│   ├── services/                     # Business logic
│   │   ├── data.ts                   # From libs/data
│   │   ├── auth.ts                   # From libs/fake-security
│   │   └── api.ts
│   ├── pages/                        # Application pages
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── CreditForm/
│   │   └── Admin/
│   ├── hooks/                        # Custom React hooks
│   ├── utils/                        # Utility functions
│   ├── types/                        # TypeScript definitions
│   ├── styles/                       # Global styles
│   └── assets/                       # Static assets
├── features/                         # E2E tests (keep as-is)
├── public/                           # Static files
│   ├── index.html
│   └── favicon.ico
├── package.json                      # Simple dependencies
├── vite.config.ts                    # Modern build tool
├── tsconfig.json                     # TypeScript config
├── jest.config.js                    # Testing config
├── .eslintrc.js                      # Linting config
└── .gitignore
```

## Migration Strategy

### Phase 1: Create New Structure
1. Create new `src/` directory structure
2. Move React app from `apps/declarative-gherkin/src/` to `src/`
3. Consolidate libraries into logical folders
4. Update import paths

### Phase 2: Replace Build System
1. Remove Nx dependencies
2. Add Vite for fast development and builds
3. Update scripts in package.json
4. Configure TypeScript, ESLint, Jest for simple setup

### Phase 3: Update Configuration
1. Create simple `vite.config.ts`
2. Simplify `tsconfig.json`
3. Update `jest.config.js` for new structure
4. Update CI/CD pipeline paths

### Phase 4: Clean Up
1. Remove Nx configuration files
2. Remove unused Cypress E2E setup
3. Update documentation
4. Test everything works

## Benefits of Simplification

### Developer Experience
- ✅ **Faster builds** - Vite vs Webpack
- ✅ **Simpler mental model** - Standard React project structure
- ✅ **Easier onboarding** - No Nx learning curve
- ✅ **Better IDE support** - Standard project structure
- ✅ **Simpler debugging** - Direct file paths

### Maintenance
- ✅ **Fewer dependencies** - Remove 15+ Nx packages
- ✅ **Less configuration** - Single build config vs complex workspace
- ✅ **Easier upgrades** - Standard React upgrade path
- ✅ **Better tooling** - Use standard React ecosystem tools

### Performance  
- ✅ **Faster dev server** - Vite HMR vs Webpack
- ✅ **Faster builds** - Vite build vs Nx build
- ✅ **Smaller bundle** - Tree-shaking with Vite

## Library Consolidation Strategy

### UI Components (libs/ui → src/components)
```
libs/ui/src/lib/admin-landing/ → src/components/admin/AdminLanding/
libs/ui/src/lib/auth-button/ → src/components/auth/AuthButton/
libs/ui/src/lib/credit-form-*/ → src/components/forms/CreditForm*/
libs/ui/src/lib/header/ → src/components/navigation/Header/
libs/ui/src/lib/login/ → src/components/auth/Login/
libs/ui/src/lib/side-nav/ → src/components/navigation/SideNav/
```

### Data Services (libs/data → src/services)
```
libs/data/src/lib/form-data.tsx → src/services/data.ts
libs/data/src/lib/fake-db.tsx → src/services/database.ts
libs/data/src/lib/application-data.tsx → src/services/application.ts
```

### Security (libs/fake-security → src/services)
```
libs/fake-security/src/lib/fake-security.ts → src/services/auth.ts
```

## New Package.json Structure

### Dependencies (Simplified)
```json
{
  "dependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0", 
    "react-router-dom": "^7.0.0",
    "react-hook-form": "^7.0.0",
    "@mui/material": "^6.0.0",
    "@mui/icons-material": "^6.0.0",
    "date-fns": "^4.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "vite": "^5.0.0",
    "typescript": "^5.0.0",
    "jest": "^30.0.0",
    "@testing-library/react": "^16.0.0",
    "eslint": "^8.0.0",
    "@wdio/cli": "^9.0.0"
  }
}
```

### Scripts (Simplified)
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build", 
    "preview": "vite preview",
    "test": "jest",
    "test:watch": "jest --watch",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "type-check": "tsc --noEmit",
    "e2e": "start-server-and-test dev 4200 'wdio run features/wdio.conf.ts'",
    "e2e:headless": "start-server-and-test dev 4200 'wdio run features/wdio-headless.conf.ts'"
  }
}
```

## Migration Checklist

### Phase 1: Structure Setup
- [ ] Create new `src/` directory structure
- [ ] Move main app files from `apps/declarative-gherkin/src/`
- [ ] Reorganize UI components by feature
- [ ] Consolidate data services
- [ ] Update all import statements

### Phase 2: Build System
- [ ] Remove all Nx dependencies
- [ ] Add Vite and modern tooling
- [ ] Create `vite.config.ts`
- [ ] Update TypeScript configuration
- [ ] Test dev server works

### Phase 3: Testing
- [ ] Update Jest configuration for new structure
- [ ] Update test file paths
- [ ] Ensure all tests pass
- [ ] Update E2E test configuration

### Phase 4: CI/CD
- [ ] Update GitHub Actions workflows
- [ ] Update build and test commands
- [ ] Update deployment paths
- [ ] Test full pipeline

### Phase 5: Documentation
- [ ] Update CLAUDE.md
- [ ] Update README.md
- [ ] Update UPGRADE_PLANS.md (remove Nx migration)
- [ ] Update development instructions

## Risk Mitigation

### Backup Strategy
1. Create `backup/nx-workspace` branch before starting
2. Commit frequently during migration
3. Keep original structure until validation complete

### Validation Steps
1. All unit tests pass
2. All E2E tests pass  
3. Development server works
4. Production build works
5. CI/CD pipeline works
6. Docker setup works

### Rollback Plan
If simplification fails:
1. `git checkout backup/nx-workspace`
2. Restore original package.json
3. Run `npm install`
4. Validate original setup works

## Expected Outcomes

### Performance Improvements
- **Dev server startup**: 10s → 2s
- **Build time**: 60s → 15s  
- **Hot reload**: 3s → 200ms
- **Bundle size**: Potential 20% reduction

### Developer Experience
- **Onboarding time**: 2 hours → 30 minutes
- **Mental overhead**: Complex → Simple
- **Debugging ease**: Improved significantly
- **IDE performance**: Better with standard structure

This simplification aligns with modern React development practices and eliminates unnecessary complexity while maintaining all functionality.