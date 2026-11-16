<template>
  <header class="site-header">
    <a class="brand" href="./" aria-label="QR Studio home">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
      QR<span class="brand-light">Studio</span>
    </a>
    <nav aria-label="Project links">
      <a
        class="repo-link"
        aria-label="View source code on GitHub (opens in a new tab)"
        href="https://github.com/ThePrimeShak/qr-code-generator"
        target="_blank"
        rel="noopener noreferrer"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
        </svg>
        <span>Source code</span>
        <span aria-hidden="true">↗</span>
      </a>
      <a
        class="author-link"
        aria-label="ThePrimeShak on LinkedIn (opens in a new tab)"
        href="https://www.linkedin.com/in/theprimeshak/"
        target="_blank"
        rel="noopener noreferrer"
      >
        ThePrimeShak <span aria-hidden="true">↗</span>
      </a>
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  border-bottom: 1px solid var(--color-border);
}

.brand {
  display: inline-flex;
  align-items: center;
  gap: 0;
  font-size: 22px;
  font-weight: 750;
  letter-spacing: -.8px;
}

.brand-light {
  font-weight: 450;
}

.brand-mark {
  width: 30px;
  height: 30px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 4px;
  margin-right: 10px;
}

.brand-mark i {
  border: 3px solid #7460b4;
  border-radius: 3px;
}

.brand-mark i:last-child {
  border: 0;
  background: #7460b4;
  width: 8px;
  height: 8px;
  align-self: end;
}

nav {
  display: flex;
  align-items: center;
  gap: 26px;
  font-size: 13px;
  font-weight: 600;
}

nav a {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  transition: color .15s;
}

nav a:hover {
  color: #765bb8;
}

nav svg {
  width: 18px;
  height: 18px;
}

.author-link {
  padding: 10px 14px;
  border: 1px solid #dedbd4;
  border-radius: 8px;
}

@media (max-width: 700px) {
  .site-header {
    min-height: 84px;
    gap: 12px;
  }

  .brand {
    font-size: 19px;
  }

  .brand-mark {
    width: 25px;
    height: 25px;
    margin-right: 7px;
  }

  nav {
    gap: 14px;
    font-size: 11px;
  }

  .repo-link > span {
    display: none;
  }

  .repo-link {
    padding: 8px;
  }

  .repo-link::after {
    content: 'GitHub';
  }

  .author-link {
    padding: 8px 10px;
  }
}

@media (max-width: 380px) {
  nav {
    gap: 4px;
  }

  .repo-link::after {
    content: none;
  }
}
</style>
