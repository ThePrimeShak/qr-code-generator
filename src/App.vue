<script setup>
import SiteHeader from './components/layout/SiteHeader.vue';
import SiteFooter from './components/layout/SiteFooter.vue';
import QrGenerator from './components/qr/QrGenerator.vue';
</script>

<template>
  <div class="page-shell">
    <SiteHeader />

    <main>
      <section class="intro" aria-labelledby="page-title">
        <p class="eyebrow">
          <span aria-hidden="true"></span>
          SMALL TOOL. ENDLESS POSSIBILITIES.
        </p>
        <h1 id="page-title">
          Your next idea,<br />
          one scan away<span class="accent">.</span>
        </h1>
        <p class="intro-description">
          Turn a link, a note, or a little inspiration into a QR code.<br />
          Create it in seconds. Share it anywhere.
        </p>
      </section>

      <QrGenerator />

      <div class="details" aria-label="Features">
        <span><span aria-hidden="true">✓</span> No sign-up needed</span>
        <span><span aria-hidden="true">✓</span> High-resolution PNG</span>
        <span><span aria-hidden="true">✓</span> Made to be shared</span>
      </div>
    </main>

    <SiteFooter />
  </div>
</template>

<style scoped>
.page-shell {
  max-width: 1160px;
  padding: 0 40px;
  margin: auto;
}

.intro {
  text-align: center;
  padding: 54px 0 35px;
}

.eyebrow {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.9px;
  color: #766395;
  margin: 0 0 19px;
}

.eyebrow > span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8b75bd;
}

h1 {
  font-size: clamp(38px, 4.5vw, 54px);
  line-height: 1.08;
  font-weight: 650;
  letter-spacing: -2.4px;
  margin: 0;
}

.accent {
  color: #896cc2;
}

.intro-description {
  margin: 20px 0 0;
  font-size: 14px;
  line-height: 1.8;
  color: #7c7884;
}

.details {
  display: flex;
  justify-content: center;
  gap: 30px;
  padding: 24px 0 45px;
  color: #77717e;
  font-size: 10px;
}

.details > span {
  display: flex;
  gap: 7px;
  align-items: center;
}

.details > span > span {
  color: #8d7ca3;
}

@media (min-width: 1600px) {
  .intro {
    padding-top: 75px;
  }
}

@media (max-width: 700px) {
  .page-shell {
    padding: 0 20px;
  }

  .intro {
    padding: 40px 0 30px;
  }

  .eyebrow {
    font-size: 8px;
    letter-spacing: 1.3px;
  }

  h1 {
    letter-spacing: -1.8px;
  }

  .intro-description {
    font-size: 13px;
  }

  .details {
    gap: 15px;
    flex-wrap: wrap;
    padding-bottom: 30px;
  }
}

@media (max-width: 380px) {
  .page-shell {
    padding: 0 14px;
  }
}
</style>
