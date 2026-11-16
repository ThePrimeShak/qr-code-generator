<script setup>
defineProps({
  result: { type: Object, default: null },
  loading: { type: Boolean, default: false },
  imageSize: { type: Number, required: true },
});

defineEmits(['download']);
</script>

<template>
  <div class="preview-panel" :aria-busy="loading">
    <div class="preview-heading">
      <span class="preview-label">YOUR QR CODE</span>
      <span class="status" :class="{ ready: result }">
        {{ result ? 'Ready to share' : 'Awaiting your idea' }}
      </span>
    </div>

    <div class="qr-frame" :class="{ 'has-result': result }">
      <img
        v-if="result"
        :src="result.imageUrl"
        alt="Generated QR code for the content shown below"
        width="212"
        height="212"
      />
      <div v-else class="empty-preview">
        <svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true">
          <path d="M5 24V9a4 4 0 0 1 4-4h15M56 5h15a4 4 0 0 1 4 4v15M75 56v15a4 4 0 0 1-4 4H56M24 75H9a4 4 0 0 1-4-4V56" />
          <rect x="20" y="20" width="13" height="13" rx="2" />
          <rect x="47" y="20" width="13" height="13" rx="2" />
          <rect x="20" y="47" width="13" height="13" rx="2" />
          <path d="M47 47h6v6h7v7H47V47Z" />
        </svg>
        <span>A little square.<br />A world of possibilities.</span>
      </div>
    </div>

    <div class="result-caption" aria-live="polite" aria-atomic="true">
      <template v-if="result">
        <p class="result-title">A scan away from your content.</p>
        <p class="encoded-text">{{ result.text }}</p>
      </template>
      <template v-else>
        <p class="result-title">Your code will appear here</p>
        <p>Add your content, then hit generate.</p>
      </template>
    </div>

    <button
      class="download-button"
      type="button"
      :disabled="!result || loading"
      @click="$emit('download')"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
        <path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4" />
      </svg>
      Download PNG
      <span class="file-detail">{{ imageSize }} × {{ imageSize }}</span>
    </button>
  </div>
</template>

<style scoped>
.preview-panel {
  padding: 28px;
  border-left: 1px solid #e9e3f0;
  background: #f6f3fa;
  display: flex;
  align-items: center;
  flex-direction: column;
}

.preview-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
  margin-bottom: 22px;
}

.preview-label {
  font-size: 9px;
  color: #776984;
  font-weight: 700;
  letter-spacing: 1.4px;
}

.status {
  background: #ece7f3;
  color: #897a9e;
  padding: 5px 8px;
  border-radius: 20px;
  font-size: 9px;
  white-space: nowrap;
}

.status.ready {
  background: #e2eee7;
  color: #3e7454;
}

.qr-frame {
  width: 212px;
  height: 212px;
  border: 1px dashed #d6ccE2;
  border-radius: 14px;
  background: #ffffff80;
  display: grid;
  place-items: center;
}

.qr-frame.has-result {
  background: #fff;
  border-style: solid;
  border-color: #e5dfec;
}

.qr-frame img {
  width: 100%;
  height: 100%;
  border-radius: 14px;
}

.empty-preview {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 17px;
}

.empty-preview svg {
  width: 65px;
  height: 65px;
  color: #c2b5d5;
}

.empty-preview span {
  text-align: center;
  font-size: 11px;
  line-height: 1.7;
  color: #82728f;
}

.result-caption {
  text-align: center;
  width: 100%;
  min-height: 64px;
  padding: 16px 0;
}

.result-caption p {
  font-size: 10px;
  line-height: 1.6;
  color: #776984;
  margin: 4px 0 0;
}

.result-caption .result-title {
  font-size: 12px;
  font-weight: 550;
  color: #736380;
  margin: 0;
}

.encoded-text {
  overflow-wrap: anywhere;
  max-height: 64px;
  overflow: auto;
  white-space: pre-wrap;
}

.download-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: auto;
  padding: 12px;
  width: 100%;
  border: 1px solid #d8cce8;
  border-radius: 9px;
  background: white;
  color: #725a9b;
  font-size: 11px;
  font-weight: 600;
  transition: background .15s;
}

.download-button:hover:enabled {
  background: #eee7f8;
}

.download-button:disabled {
  color: #aa9bb9;
  background: transparent;
  border-color: #e2d9ec;
}

.download-button svg {
  width: 16px;
  height: 16px;
}

.file-detail {
  font-size: 9px;
  font-weight: 400;
  margin-left: auto;
}

@media (max-width: 700px) {
  .preview-panel {
    border-left: none;
    border-top: 1px solid #e9e3f0;
    padding: 26px;
  }
}

@media (max-width: 380px) {
  .preview-panel {
    padding: 22px;
  }
}
</style>
