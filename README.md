# QR Studio

A browser-based QR code generator built with Vue and Vite as a university project.

**Live demo:** [Open on Vercel](https://qr-code-generator-psi-rose.vercel.app)

## Overview

A small university project for converting links and text into downloadable QR images. Encoding runs locally in the browser.

## Features

- Generate 1024 × 1024 PNG QR codes from links or text.
- Validate empty input while preserving the original encoded content.
- Download generated PNG images with a standard QR quiet zone.
- Keep the last successful result visible if a later attempt fails.

## Tech stack

Vue 3, JavaScript, Vite, qrcode, CSS, Node.js built-in test runner.

## Run locally

Use Node.js 22.12 or newer and npm.

```sh
git clone https://github.com/ThePrimeShak/qr-code-generator.git
cd qr-code-generator
npm ci
npm run dev
```

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Create the production build |
| `npm run preview` | Preview the production build |
| `npm run test` | Run automated tests |

## Project structure

- `src/components/qr/` — form, preview, and generator UI.
- `src/composables/` and `src/services/` — QR state and encoding.
- `src/utils/` and `tests/` — download helper and automated tests.

## Scope and limitations

No backend, API key, or environment variables are required. Entered content is encoded locally and is not uploaded by the generator.

## Author

Built by [ThePrimeShak](https://github.com/ThePrimeShak) · [LinkedIn](https://www.linkedin.com/in/theprimeshak/).
