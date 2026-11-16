import assert from 'node:assert/strict';
import { test } from 'node:test';
import { createQrCodeImage, QR_CODE_SIZE } from '../src/services/qrCode.js';
import { useQrCode } from '../src/composables/useQrCode.js';

test('creates an actual 1024px PNG for URLs and Unicode content', async () => {
  for (const content of ['https://example.com', 'سلام دنیا 👋\nA university project']) {
    const dataUrl = await createQrCodeImage(content);
    assert.ok(dataUrl.startsWith('data:image/png;base64,'));
    const png = Buffer.from(dataUrl.split(',')[1], 'base64');
    assert.deepEqual(png.subarray(0, 8), Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]));
    assert.equal(png.readUInt32BE(16), QR_CODE_SIZE);
    assert.equal(png.readUInt32BE(20), QR_CODE_SIZE);
  }
});

test('rejects empty or whitespace-only input without creating a result', async () => {
  const qr = useQrCode();
  for (const content of ['', '  \n\t']) {
    qr.updateText(content);
    await qr.generate();
    assert.match(qr.error.value, /Add a link/);
    assert.equal(qr.result.value, null);
    assert.equal(qr.isGenerating.value, false);
  }
});

test('preserves the original content and clears validation errors when editing', async () => {
  const qr = useQrCode();
  await qr.generate();
  const content = '  سلام 👋\nhttps://example.com?q=hello  ';
  qr.updateText(content);
  assert.equal(qr.error.value, '');
  await qr.generate();
  assert.equal(qr.result.value.text, content);
  assert.equal(qr.error.value, '');
  assert.equal(qr.isGenerating.value, false);
});

test('ignores duplicate submissions and keeps the content captured at submission', async () => {
  const qr = useQrCode();
  qr.updateText('First content');
  const pending = qr.generate();
  assert.equal(qr.isGenerating.value, true);
  qr.updateText('Changed while generating');
  await qr.generate();
  await pending;
  assert.equal(qr.result.value.text, 'First content');
  assert.equal(qr.text.value, 'Changed while generating');
  assert.equal(qr.isGenerating.value, false);
});

test('preserves the last successful result on failure and recovers on the next attempt', async () => {
  const qr = useQrCode();
  qr.updateText('First result');
  await qr.generate();
  const previous = qr.result.value;
  qr.updateText('x'.repeat(10000));
  await qr.generate();
  assert.ok(qr.error.value);
  assert.equal(qr.isGenerating.value, false);
  assert.equal(qr.result.value, previous);

  qr.updateText('Recovered result');
  await qr.generate();
  assert.equal(qr.error.value, '');
  assert.equal(qr.result.value.text, 'Recovered result');
  assert.notEqual(qr.result.value.imageUrl, previous.imageUrl);
});

test('separate generator instances do not share state', async () => {
  const first = useQrCode();
  const second = useQrCode();
  first.updateText('Only in the first instance');
  await first.generate();
  assert.equal(second.text.value, '');
  assert.equal(second.error.value, '');
  assert.equal(second.result.value, null);
});
