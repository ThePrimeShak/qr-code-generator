<template>
  <footer>
    <span>A small university project, made with curiosity.</span>
    <span>
      Built with Vue
      <span class="footer-dot" aria-hidden="true">·</span>
      Designed for everyday ideas
    </span>
  </footer>
</template>

<style scoped>
footer {
  border-top: 1px solid var(--color-border);
  padding: 22px 0;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  color: #77717e;
  font-size: 10px;
  line-height: 1.7;
}

.footer-dot {
  margin: 0 6px;
}

@media (max-width: 700px) {
  footer {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 5px;
  }
}
</style>
