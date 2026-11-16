<script setup>
import QrCodeForm from './QrCodeForm.vue';
import QrCodePreview from './QrCodePreview.vue';
import { useQrCode } from '../../composables/useQrCode.js';
import { QR_CODE_SIZE } from '../../services/qrCode.js';
import { downloadImage } from '../../utils/download.js';

const { text, isGenerating, error, result, updateText, generate } = useQrCode();

function download() {
  if (!result.value || isGenerating.value) return;
  downloadImage(result.value.imageUrl, 'qrcode.png');
}
</script>

<template>
  <section class="generator" aria-label="QR code generator">
    <QrCodeForm
      :model-value="text"
      :loading="isGenerating"
      :error="error"
      @update:model-value="updateText"
      @submit="generate"
    />
    <QrCodePreview
      :result="result"
      :loading="isGenerating"
      :image-size="QR_CODE_SIZE"
      @download="download"
    />
  </section>
</template>

<style scoped>
.generator {
  max-width: 940px;
  margin: auto;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  background: white;
  border: 1px solid #e5e1e8;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 32px #30243d05;
}

@media (max-width: 700px) {
  .generator {
    grid-template-columns: 1fr;
  }
}
</style>
