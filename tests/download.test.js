import assert from 'node:assert/strict';
import { test } from 'node:test';
import { downloadImage } from '../src/utils/download.js';

function mockDocument(t, { throwOnClick = false } = {}) {
  const events = [];
  const link = {
    click() {
      events.push('click');
      if (throwOnClick) throw new Error('Download failed');
    },
    remove() {
      events.push('remove');
    },
  };
  const original = Object.getOwnPropertyDescriptor(globalThis, 'document');
  Object.defineProperty(globalThis, 'document', {
    configurable: true,
    value: {
      createElement(tag) {
        assert.equal(tag, 'a');
        return link;
      },
      body: {
        appendChild(element) {
          assert.equal(element, link);
          events.push('append');
        },
      },
    },
  });
  t.after(() => {
    if (original) Object.defineProperty(globalThis, 'document', original);
    else delete globalThis.document;
  });
  return { link, events };
}

test('downloads the requested image and removes the temporary anchor', (t) => {
  const { link, events } = mockDocument(t);
  const imageUrl = 'data:image/png;base64,example';
  downloadImage(imageUrl, 'qrcode.png');
  assert.equal(link.href, imageUrl);
  assert.equal(link.download, 'qrcode.png');
  assert.deepEqual(events, ['append', 'click', 'remove']);
});

test('removes the temporary anchor even if starting the download fails', (t) => {
  const { events } = mockDocument(t, { throwOnClick: true });
  assert.throws(() => downloadImage('data:image/png;base64,example', 'qrcode.png'), /Download failed/);
  assert.deepEqual(events, ['append', 'click', 'remove']);
});
