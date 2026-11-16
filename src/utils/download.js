/** Trigger a browser download without leaving the current page. */
export function downloadImage(imageUrl, filename) {
  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = filename;
  document.body.appendChild(link);

  try {
    link.click();
  } finally {
    link.remove();
  }
}
