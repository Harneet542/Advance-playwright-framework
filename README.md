# Advance Playwright Framework

A TypeScript test automation framework built on [Playwright](https://playwright.dev), with page objects, data-driven testing, environment switching, and a custom HTML report.

## Features

- **Page Object Model**: page classes in `src/pages`
- **Environment switching**: the base URL is chosen by `TTA_ENV` (qa, stg, prod, dev, api)
- **Data-driven testing**: readers for CSV, Excel, YAML and MySQL in `src/utils`
- **Custom TTA HTML report**: step screenshots and a self-heal tab, written to `tta-report/`
- **AI helpers**: root-cause analysis and flaky-test analysis in `src/ai` (they only run when `ANTHROPIC_API_KEY` or `OPENAI_API_KEY` is set)
- **CI**: GitHub Actions workflow in `.github/workflows/playwright.yml`

## Project structure

```
src/
  ai/          AI agents (RCA, flaky analyzer) and provider config
  api/         API clients
  config/      Framework config
  fixtures/    Custom Playwright fixtures
  pages/       Page objects (LoginPage, InventoryPage, CartPage, ...)
  testdata/    Test data files
  tests/       Test specs
  utils/       Data readers, custom reporter, helpers
playwright.config.ts
```

## Setup

Requires Node.js 18 or later.

```bash
npm install
npx playwright install
```

Create a `.env` file in the project root (it is git-ignored):

```env
TTA_ENV=qa

# Optional per-environment URLs; built-in defaults are used when these are missing
QA_BASE_URL=https://app.thetestingacademy.com
STG_BASE_URL=https://stage.thetestingacademy.com
PROD_BASE_URL=https://app.thetestingacademy.com
DEV_BASE_URL=http://localhost:3000
API_BASE_URL=https://restful-booker.herokuapp.com

# Used only when TTA_ENV is not set
BASE_URL=

LOG_LEVEL=info
TTA_USERNAME=
PASSWORD=
```

## Environments

`resolveBaseURL()` in `playwright.config.ts` maps `TTA_ENV` to a base URL:

| `TTA_ENV` | Variable used | Default |
|---|---|---|
| `qa` (default) | `QA_BASE_URL` | https://app.thetestingacademy.com |
| `stg`, `stage`, `staging` | `STG_BASE_URL` | https://stage.thetestingacademy.com |
| `prod`, `production` | `PROD_BASE_URL` | https://app.thetestingacademy.com |
| `dev`, `local` | `DEV_BASE_URL` | http://localhost:3000 |
| `api` | `API_BASE_URL` | https://restful-booker.herokuapp.com |

To pick an environment for a single run, set it in the shell. This overrides `.env`:

```powershell
# PowerShell
$env:TTA_ENV="stg"; npx playwright test
```

```bash
# bash
TTA_ENV=stg npx playwright test
```

## Running tests

```bash
npm test                  # all tests
npm run test:chromium     # Chromium only
npx playwright test src/tests/Login.spec.ts
```

Locally the browser is visible. On CI (`CI=true`) tests run headless, with 2 retries and 1 worker.

## Reports

- **TTA HTML report**: generated in `tta-report/` after each run. Open it with `npm run report:open`.
- **Playwright HTML report**: `npx playwright show-report`

Every test records a trace and screenshots.
