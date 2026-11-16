# QR Studio

A small university project by [ThePrimeShak](https://www.linkedin.com/in/theprimeshak/), built with Vue 3 and Vite.

Turn links or text into QR codes and download them as 1024 × 1024 PNG images. QR codes are generated locally in the browser; entered content is not sent to a server.

## Development

```sh
npm install
npm run dev
```

## Production build

```sh
npm run build
npm run preview
```

The production files are generated in `dist/`.

## Features

- Responsive editor and QR preview
- PNG download with a standard QR quiet zone
- Empty-input validation and generation error feedback
- GitHub repository and LinkedIn profile links in the header

Uses [qrcode](https://github.com/soldair/node-qrcode) for QR encoding.
