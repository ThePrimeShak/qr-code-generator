import QRCode from 'qrcode';

export const QR_CODE_SIZE = 1024;

/** Encode the original content without trimming or changing it. */
export function createQrCodeImage(content) {
  return QRCode.toDataURL(content, {
    type: 'image/png',
    width: QR_CODE_SIZE,
    margin: 4,
    errorCorrectionLevel: 'M',
    color: {
      dark: '#242136',
      light: '#ffffff',
    },
  });
}
