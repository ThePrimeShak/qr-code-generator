import { readonly, ref } from 'vue';
import { createQrCodeImage } from '../services/qrCode.js';

export function useQrCode() {
  const text = ref('');
  const isGenerating = ref(false);
  const error = ref('');
  const result = ref(null);

  function updateText(value) {
    text.value = value;
    error.value = '';
  }

  async function generate() {
    if (isGenerating.value) return;

    error.value = '';
    if (!text.value.trim()) {
      error.value = 'Add a link or some text to create your QR code.';
      return;
    }

    isGenerating.value = true;
    const content = text.value;

    try {
      const imageUrl = await createQrCodeImage(content);
      result.value = { imageUrl, text: content };
    } catch {
      error.value = 'Could not create your QR code. Try a shorter link or message and generate again.';
    } finally {
      isGenerating.value = false;
    }
  }

  return {
    text: readonly(text),
    isGenerating: readonly(isGenerating),
    error: readonly(error),
    result: readonly(result),
    updateText,
    generate,
  };
}
