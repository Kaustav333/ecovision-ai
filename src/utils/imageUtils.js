/**
 * Image Utility Helpers
 * =====================
 * Creates lightweight, compressed thumbnail previews using HTML5 Canvas
 * so classification history fits safely within browser localStorage limits.
 */

/**
 * Resizes and compresses a data URL or HTMLImageElement to a small JPEG thumbnail.
 * @param {string} dataUrl - Base64 image data URL
 * @param {number} maxDimension - Max width or height in pixels
 * @param {number} quality - JPEG quality from 0 to 1
 * @returns {Promise<string>} Compressed JPEG data URL
 */
export function createCompressedThumbnail(dataUrl, maxDimension = 240, quality = 0.72) {
  return new Promise((resolve) => {
    if (!dataUrl) {
      resolve("");
      return;
    }

    const img = new window.Image();
    img.onload = () => {
      try {
        let { width, height } = img;
        if (width > maxDimension || height > maxDimension) {
          if (width >= height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement("canvas");
        canvas.width = Math.max(1, width);
        canvas.height = Math.max(1, height);
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      } catch {
        resolve(dataUrl);
      }
    };
    img.onerror = () => resolve("");
    img.src = dataUrl;
  });
}

