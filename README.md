# QR Studio

A small university project by [ThePrimeShak](https://www.linkedin.com/in/theprimeshak/), built with Vue 3 and Vite.

Turn links or text into QR codes and download them as 1024 × 1024 PNG images. QR codes are generated locally in the browser; entered content is not sent to a server.

## Getting started

Use Node.js 18 or newer and npm.

```sh
npm ci
npm run dev
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm test` | Run the automated tests with Node's built-in test runner |
| `npm run build` | Build the production app into `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

| Path | Responsibility |
| --- | --- |
| `src/main.js` | Load global styles and mount Vue |
| `src/App.vue` | Compose the page layout and introductory content |
| `src/components/layout/` | Site header and footer |
| `src/components/qr/QrGenerator.vue` | Connect the form, preview, and QR state; handle downloads |
| `src/components/qr/QrCodeForm.vue` | Render the input and validation feedback; emit input and submit events |
| `src/components/qr/QrCodePreview.vue` | Render the empty or generated preview; emit download events |
| `src/composables/useQrCode.js` | Manage input, loading, validation, errors, and the last successful result |
| `src/services/qrCode.js` | Encode content and define the QR image settings |
| `src/utils/download.js` | Trigger a browser download and clean up its temporary anchor |
| `src/styles/main.css` | Global styles and shared color variables |
| `tests/` | QR generation, state transitions, and download tests |

Component-specific styles live in each Vue component's scoped style block, including its responsive rules. The form and preview communicate through declared props and events. State belongs to the generator's composable instance.

The generator validates whitespace-only input but preserves the original content when encoding. Failed attempts keep the last successful QR visible with its original text. The image size displayed in the preview comes from the encoding configuration.

## Features

- Responsive editor and QR preview
- PNG download with a standard QR quiet zone
- Empty-input validation and generation error feedback
- GitHub repository and LinkedIn profile links in the header

Uses [qrcode](https://github.com/soldair/node-qrcode) for QR encoding.
