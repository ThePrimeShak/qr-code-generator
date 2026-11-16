<script setup>
import { ref } from 'vue';
import QRCode from 'qrcode';

const text = ref('');
const loading = ref(false);
const error = ref('');
const result = ref(null);

async function generateQrCode() {
	if (loading.value) return;
	error.value = '';
	if (!text.value.trim()) {
		error.value = 'Add a link or some text to create your QR code.';
		return;
	}

	loading.value = true;
	const content = text.value;
	try {
		const imageUrl = await QRCode.toDataURL(content, {
			type: 'image/png',
			width: 1024,
			margin: 4,
			errorCorrectionLevel: 'M',
			color: { dark: '#242136', light: '#ffffff' },
		});
		result.value = { imageUrl, text: content };
	} catch {
		error.value = 'This text is too long for a QR code. Try a shorter link or message.';
	} finally {
		loading.value = false;
	}
}

function downloadQrCode() {
	if (!result.value) return;
	const link = document.createElement('a');
	link.download = 'qrcode.png';
	link.href = result.value.imageUrl;
	link.click();
}
</script>

<template>
	<div class="page-shell">
		<header class="site-header">
			<a class="brand" href="./" aria-label="QR Studio home">
				<span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span>
				QR<span class="brand-light">Studio</span>
			</a>
			<nav aria-label="Project links">
				<a class="repo-link" aria-label="View source code on GitHub (opens in a new tab)" href="https://github.com/ThePrimeShak/qr-code-generator" target="_blank" rel="noopener noreferrer">
					<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.86c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 6.82c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"/></svg>
					<span>Source code</span><span aria-hidden="true">↗</span>
				</a>
				<a class="author-link" aria-label="ThePrimeShak on LinkedIn (opens in a new tab)" href="https://www.linkedin.com/in/theprimeshak/" target="_blank" rel="noopener noreferrer">ThePrimeShak <span aria-hidden="true">↗</span></a>
			</nav>
		</header>

		<main>
			<section class="intro" aria-labelledby="page-title">
				<p class="eyebrow"><span aria-hidden="true"></span> SMALL TOOL. ENDLESS POSSIBILITIES.</p>
				<h1 id="page-title">Your next idea,<br />one scan away<span class="accent">.</span></h1>
				<p class="intro-description">Turn a link, a note, or a little inspiration into a QR code.<br class="desktop-break" /> Create it in seconds. Share it anywhere.</p>
			</section>

			<section class="generator" aria-label="QR code generator">
				<div class="editor-panel">
					<div class="panel-heading"><span class="step">01</span><h2>Make it yours</h2></div>
					<p class="panel-description">What would you like to share?</p>
					<form @submit.prevent="generateQrCode">
						<div class="field-heading"><label for="qr-content">Link or text</label><span>Anything worth sharing</span></div>
						<textarea id="qr-content" v-model="text" :disabled="loading" placeholder="https://your-next-big-idea.com&#10;&#10;Or type a message here…" :aria-invalid="Boolean(error)" :aria-describedby="error ? 'input-hint input-error' : 'input-hint'" @input="error = ''"></textarea>
						<p id="input-hint" class="input-hint">Website links, contact details, plain text — you choose.</p>
						<p v-if="error" id="input-error" class="error" role="alert">{{ error }}</p>
						<button class="primary-button" type="submit" :disabled="loading">{{ loading ? 'Creating your code…' : 'Generate QR code' }}<span aria-hidden="true">↗</span></button>
					</form>
					<p class="privacy-note"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="3"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></svg>Just your browser. Your content stays on your device.</p>
				</div>

				<div class="preview-panel" :aria-busy="loading">
					<div class="preview-heading"><span class="preview-label">YOUR QR CODE</span><span class="status" :class="{ ready: result }">{{ result ? 'Ready to share' : 'Awaiting your idea' }}</span></div>
					<div class="qr-frame" :class="{ 'has-result': result }">
						<img v-if="result" :src="result.imageUrl" alt="Generated QR code for the content shown below" width="240" height="240" />
						<div v-else class="empty-preview"><svg viewBox="0 0 80 80" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M5 24V9a4 4 0 0 1 4-4h15M56 5h15a4 4 0 0 1 4 4v15M75 56v15a4 4 0 0 1-4 4H56M24 75H9a4 4 0 0 1-4-4V56"/><rect x="20" y="20" width="13" height="13" rx="2"/><rect x="47" y="20" width="13" height="13" rx="2"/><rect x="20" y="47" width="13" height="13" rx="2"/><path d="M47 47h6v6h7v7H47V47Z"/></svg><span>A little square.<br />A world of possibilities.</span></div>
					</div>
					<div class="result-caption" aria-live="polite" aria-atomic="true"><template v-if="result"><p class="result-title">A scan away from your content.</p><p class="encoded-text">{{ result.text }}</p></template><template v-else><p class="result-title">Your code will appear here</p><p>Add your content, then hit generate.</p></template></div>
					<button class="download-button" type="button" :disabled="!result || loading" @click="downloadQrCode"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><path d="M12 3v12m-5-5 5 5 5-5M5 16v4h14v-4"/></svg>Download PNG<span class="file-detail">1024 × 1024</span></button>
				</div>
			</section>
			<div class="details" aria-label="Features"><span><span aria-hidden="true">✓</span> No sign-up needed</span><span><span aria-hidden="true">✓</span> High-resolution PNG</span><span><span aria-hidden="true">✓</span> Made to be shared</span></div>
		</main>
		<footer><span>A small university project, made with curiosity.</span><span>Built with Vue <span class="footer-dot" aria-hidden="true">·</span> Designed for everyday ideas</span></footer>
	</div>
</template>
