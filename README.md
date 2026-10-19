# mAIra — Frontend

mAIra is a React-based web frontend built with Vite. It provides the UI for landing/login and registration flows, verification, password recovery, and dashboard screens. This repository contains the frontend application; backend API integration and live service behavior should be confirmed with the backend team.

## Project description

The application is a single-page React app using React Router for navigation. The main route configuration is in `src/App.jsx`. Shared authentication components and reusable UI elements are separated into component folders, while styling is organized under `src/styles/`.

## Tech stack

- **React** — UI components
- **Vite** — development server and production build
- **React Router** — client-side routing
- **Lucide React** — icons
- **CSS** — global, page, authentication, dashboard, and responsive styling
- **Oxlint** — lint checks

Dependencies and scripts are managed in `package.json` and `package-lock.json`.

## Prerequisites

- Node.js and npm
- Git

## Get started

```bash
git clone https://github.com/Mkm157/mAIra-web-frontend.git
cd mAIra-web-frontend
npm install
npm run dev
```

Vite prints a local URL in the terminal (usually `http://localhost:5173/`). Open the exact URL it displays and keep the terminal running.

## Available commands

| Command | Purpose |
| --- | --- |
| `npm install` | Install dependencies |
| `npm run dev` | Start the development server |
| `npm run build` | Build the production frontend into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint checks |

Before handing off changes, run:

```bash
npm run build
npm run lint
```

The build should complete successfully. Lint may report warnings about unused imports or variables; review them and distinguish warnings from errors.

## Routes currently configured

The routes below are configured in `src/App.jsx`:

| Route | Page / behavior |
| --- | --- |
| `/` | Landing page with login/register entry |
| `/login` | Redirects to `/?tab=login` |
| `/register` | Redirects to `/?tab=register` |
| `/register/verify` | Registration verification screen |
| `/register/create-password` | Create account password screen |
| `/verify-modal` | Standalone verification screen |
| `/forgot-password` | Password recovery method screen |
| `/recovery/verify-code` | Recovery code verification screen |
| `/recovery/new-password` | Create new password screen |
| `/recovery/success` | Password recovery success screen |
| `/register/success` | Reuses the success screen |
| `/admin` | Redirects to `/dashboard` |
| `/dashboard` | User dashboard |
| Any unmatched route | Redirects to `/` |

**Routing note:** `AdminDashboardPage.jsx` exists, but `/admin` currently redirects to `/dashboard`; the admin page is imported but is not currently rendered by that route. Confirm the intended admin behavior before changing it.

## User Journey

The mAIra frontend provides navigation through the following user flows.

### Registration Flow

1. Open the landing page.
2. Select the registration option.
3. Proceed to the registration verification screen.
4. Continue to the account password creation screen.
5. View the registration success screen when the flow is completed.

### Login Flow

1. Open the landing page.
2. Select the login option.
3. Enter the required login details.
4. Continue to the dashboard if authentication succeeds..

### Password Recovery Flow

1. Open the forgot-password screen.
2. Select the available recovery method.
3. Enter the verification code.
4. Create a new password.
5. Reach the recovery success screen.

**Note:** These flows describe the intended navigation. Actual authentication, verification, and password changes depend on the backend integration.

## Features implemented in the frontend

Based on the current page and component structure, the frontend includes:

- Landing page and login/register entry points
- Registration verification UI
- Account password creation UI
- Standalone verification UI
- Forgot-password and recovery verification screens
- New-password and recovery-success screens
- User dashboard screen
- Admin dashboard page component (not currently connected to `/admin`)
- Reusable authentication components: `AuthCard`, `AuthLeftBanner`, `Logo`, `OtpInput`, `PasswordRequirements`, and `ScreenSwitcher`
- Shared style files for authentication, dashboards, landing page, design tokens, global styling, and responsiveness

**Backend integration status:** A successful frontend build does not prove that real authentication, OTP delivery/validation, password changes, or dashboard data are connected to backend services. The backend team should review the API contract, connect the required endpoints, and configure environment variables as needed.

## File structure

```text
mAIra-web-frontend/
├── .github/                    # Repository workflows/configuration
├── public/                     # Publicly served images, logos, and icons
├── src/
│   ├── assets/                 # Imported images and assets
│   ├── components/
│   │   ├── auth/               # Shared authentication layout components
│   │   ├── common/             # Reusable common components
│   │   └── ui/                 # Shared UI primitives
│   ├── pages/                  # Route-level screens
│   ├── styles/                 # Shared and page-area CSS
│   ├── App.css                 # App-level styles
│   ├── App.jsx                 # Main routes and page mapping
│   ├── index.css               # Global CSS entry
│   └── main.jsx                # React application entry point
├── index.html                  # HTML entry document
├── package.json                # Scripts and dependencies
├── package-lock.json           # Locked dependency tree
├── vite.config.js              # Vite configuration
└── README.md
```

Other root files such as `.gitignore` and `eslint.config.js` are retained in the repository.

## Where to make changes

| Change needed | Files / folders to review |
| --- | --- |
| Add a route or change URL behavior | `src/App.jsx` |
| Change landing page or login/register entry UI | `src/pages/LandingPage.jsx`, `src/styles/landing.css`, `src/styles/auth.css` |
| Change registration verification | `src/pages/RegisterVerifyPage.jsx` |
| Change account password creation | `src/pages/RegisterPasswordPage.jsx` |
| Change standalone verification | `src/pages/StandaloneVerifyPage.jsx` |
| Change forgot-password flow | `src/pages/ForgotPasswordPage.jsx`, `src/pages/RecoveryVerifyPage.jsx`, `src/pages/RecoveryPasswordPage.jsx`, `src/pages/RecoverySuccessPage.jsx` |
| Change user dashboard | `src/pages/UserDashboardPage.jsx`, `src/styles/dashboard.css` |
| Change admin dashboard UI or routing | `src/pages/AdminDashboardPage.jsx` and `src/App.jsx` |
| Change shared authentication layout | `src/components/auth/` |
| Change reusable common components | `src/components/common/` |
| Change shared UI primitives | `src/components/ui/` |
| Change global design tokens or shared styles | `src/styles/tokens.css`, `src/styles/globals.css`, `src/index.css` |
| Change responsive styling | `src/styles/responsive.css` and the relevant page/style file |
| Change images, logos, or icons | `src/assets/` and/or `public/` |
| Add/update dependencies or scripts | `package.json`, then run `npm install` and commit `package-lock.json` |
| Change Vite configuration | `vite.config.js` |
| Change HTML title or metadata | `index.html` |

When changing a component, check its imports and related styles. Then run `npm run build` and test the affected route in the browser.

## Backend integration handoff

The backend team should:

1. Agree on API endpoints and request/response formats for registration, verification, login, password recovery, and dashboard data.
2. Connect the relevant page flows to the agreed APIs.
3. Add required environment configuration using the team's chosen convention; do not commit secrets or API keys.
4. Handle loading, error, success, and expired/invalid-code states.
5. Verify CORS, authentication/session handling, and authorization rules with the backend service.
6. Test the integrated flows end-to-end.

If an API client or environment setup is introduced, document its location and required environment variables here.

## Contribution / handoff checklist

- [ ] Install dependencies with `npm install`.


- [ ] Run the app with `npm run dev`.
- [ ] Test the routes affected by the change.
- [ ] Run `npm run build`.
- [ ] Run `npm run lint` and review warnings.
- [ ] Do not commit `node_modules/`, `dist/`, credentials, or local environment secrets.
- [ ] Update this README if routes, commands, or integration requirements change.
