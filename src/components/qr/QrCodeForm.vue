<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: { type: String, required: true },
  loading: { type: Boolean, default: false },
  error: { type: String, default: '' },
});

const emit = defineEmits(['update:modelValue', 'submit']);

const content = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<template>
  <div class="editor-panel">
    <div class="panel-heading">
      <span class="step">01</span>
      <h2>Make it yours</h2>
    </div>
    <p class="panel-description">What would you like to share?</p>

    <form @submit.prevent="$emit('submit')">
      <div class="field-heading">
        <label for="qr-content">Link or text</label>
        <span>Anything worth sharing</span>
      </div>
      <textarea
        id="qr-content"
        v-model="content"
        :disabled="loading"
        placeholder="https://your-next-big-idea.com&#10;&#10;Or type a message here…"
        :aria-invalid="Boolean(error)"
        :aria-describedby="error ? 'input-hint input-error' : 'input-hint'"
      ></textarea>
      <p id="input-hint" class="input-hint">
        Website links, contact details, plain text — you choose.
      </p>
      <p v-if="error" id="input-error" class="error" role="alert">{{ error }}</p>
      <button class="primary-button" type="submit" :disabled="loading">
        {{ loading ? 'Creating your code…' : 'Generate QR code' }}
        <span aria-hidden="true">↗</span>
      </button>
    </form>

    <p class="privacy-note">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true">
        <rect x="5" y="10" width="14" height="11" rx="3" />
        <path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3" />
      </svg>
      Just your browser. Your content stays on your device.
    </p>
  </div>
</template>

<style scoped>
.editor-panel {
  padding: 34px;
}

.panel-heading {
  display: flex;
  gap: 12px;
  align-items: center;
}

.step {
  display: grid;
  place-items: center;
  width: 29px;
  height: 29px;
  border-radius: 8px;
  background: #f0ecf8;
  color: #7c62af;
  font-size: 11px;
  font-weight: 650;
}

h2 {
  margin: 0;
  font-size: 21px;
  font-weight: 650;
  letter-spacing: -.5px;
}

.panel-description {
  margin: 12px 0 30px;
  color: #827c8a;
  font-size: 13px;
}

.field-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}

label {
  font-size: 12px;
  font-weight: 650;
}

.field-heading > span {
  font-size: 10px;
  color: var(--color-muted);
}

textarea {
  display: block;
  width: 100%;
  min-height: 160px;
  resize: vertical;
  padding: 16px;
  border: 1px solid #ddd8e6;
  border-radius: 10px;
  color: #30293c;
  background: #fefdfd;
  font-size: 13px;
  line-height: 1.7;
  transition: border-color .15s, box-shadow .15s;
}

textarea::placeholder {
  color: #aaa3b2;
}

textarea:focus {
  outline: none;
  border-color: #977bc4;
  box-shadow: 0 0 0 3px #987fc218;
}

textarea[aria-invalid="true"] {
  border-color: #bf5353;
}

.input-hint {
  font-size: 10px;
  color: var(--color-muted);
  margin: 10px 0 24px;
  line-height: 1.6;
}

.error {
  color: #a53a45;
  font-size: 12px;
  line-height: 1.5;
  margin: -12px 0 16px;
}

.primary-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;
  width: 100%;
  padding: 15px 20px;
  border: 0;
  border-radius: 9px;
  color: white;
  background: var(--color-primary);
  font-size: 13px;
  font-weight: 600;
  transition: background .15s, transform .15s;
}

.primary-button:hover {
  background: var(--color-primary-hover);
  transform: translateY(-1px);
}

.primary-button:disabled {
  opacity: .6;
  transform: none;
}

.primary-button > span {
  font-size: 19px;
  line-height: 16px;
}

.privacy-note {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  color: var(--color-muted);
  font-size: 10px;
  margin: 18px 0 0;
  line-height: 1.6;
}

.privacy-note svg {
  width: 13px;
  height: 13px;
  flex-shrink: 0;
}

@media (max-width: 700px) {
  .editor-panel {
    padding: 26px;
  }
}

@media (max-width: 380px) {
  .field-heading > span {
    display: none;
  }

  .editor-panel {
    padding: 22px;
  }
}
</style>
