# Data Validator

A simple data validation tool that checks if your CSV files have correct data (emails, ages, required fields). And learn how to set up a CI/CD pipeline using GitHub Actions.

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install
```

### Run the Application

```bash
# Validate sample data files
npm start
```

### Run Tests

```bash
# Run all tests
npm test

# Run Jest tests only
npm run test:jest
```

## 📁 What's Inside

```
data-validator/
├── src/           # Main code
├── tests/         # Test files
├── data/          # Sample CSV files to validate
├── .github/       # GitHub Actions CI/CD
│   └── workflows/
│       └── ci.yml # Continuous Integration pipeline
└── package.json   # Dependencies and scripts
```

## 🎯 Commands

| Command         | What it does                   |
| --------------- | ------------------------------ |
| `npm start`     | Validate data and show results |
| `npm test`      | Run validation tests           |
| `npm run build` | Compile TypeScript             |

## 🔄 Continuous Integration

This project uses **GitHub Actions** for automated testing and quality assurance:

### CI Pipeline ([.github/workflows/ci.yml](.github/workflows/ci.yml))

The CI automatically runs on:

- **Push** to any branch
- **Pull requests** to main branch

**What the CI does:**

1. 🏗️ **Setup** - Installs Node.js and dependencies using pnpm
2. 🔨 **Build** - Compiles TypeScript code
3. 🧪 **Test** - Runs all validation tests using both custom test runner and Jest
4. ✅ **Validate** - Ensures the [`Validator`](src/validator.ts) correctly identifies:
   - Missing required fields
   - Incorrect data formats
   - Logical inconsistencies

**CI Status:** All tests must pass before code can be merged.

### 🏠 Run CI Locally

You can simulate the GitHub Actions CI pipeline on your local machine using this script:

#### Windows (PowerShell/Git Bash)

```bash
# run directly with bash
bash run-ci.sh
```

#### What the Local CI Checks

- ✅ Dependencies install correctly
- ✅ TypeScript compiles without errors
- ✅ All validation tests pass
- ✅ Jest unit tests pass
- ✅ Code follows the same standards as GitHub Actions

**💡 Tip:** Run this script before pushing to catch issues early!
