/**
 * EcoVision AI - Google Teachable Machine Model Configuration
 * ===========================================================
 *
 * This file connects EcoVision AI to your trained image classification model.
 * The model runs 100% locally inside your web browser using TensorFlow.js.
 *
 * HOW TO TRAIN & CONNECT YOUR MODEL (STEP-BY-STEP FOR CLASS 12 PRACTICAL):
 * ------------------------------------------------------------------------
 * 1. Open Google Teachable Machine: https://teachablemachine.withgoogle.com/
 * 2. Click "Get Started" -> "Image Project" -> "Standard image model".
 * 3. Create 4 classes with these exact names:
 *      - Plastic
 *      - Paper
 *      - Metal
 *      - Organic Waste
 * 4. Add 40-100 clear sample photos per class (varied angles & lighting).
 * 5. Click "Train Model" and test it in the Preview panel.
 * 6. Click "Export Model" -> "TensorFlow.js" -> "Upload my model".
 * 7. Copy the shareable model URL, for example:
 *      https://teachablemachine.withgoogle.com/models/AbCdEfGhI/
 * 8. Paste that URL into MODEL_URL below and set IS_MODEL_CONFIGURED to true.
 * 9. Save this file and restart or refresh the app.
 */

const CUSTOM_URL_STORAGE_KEY = "ecovision_custom_model_url";

const MODEL_CONFIG = {
  // Paste your Google Teachable Machine model URL below (must end with '/' or will be normalized):
  MODEL_URL: "",

  // Change this to true after pasting your valid MODEL_URL above:
  IS_MODEL_CONFIGURED: false,

  // The four waste categories supported by the model & disposal engine:
  CATEGORIES: ["Plastic", "Paper", "Metal", "Organic Waste"],

  // Confidence threshold (0 to 1). Predictions below 0.50 show a low-confidence caution message.
  CONFIDENCE_THRESHOLD: 0.5,
};

/**
 * Ensures any valid URL ends cleanly with a single trailing slash.
 */
export function normalizeModelUrl(url) {
  if (!url || typeof url !== "string") return "";
  const trimmed = url.trim();
  if (!trimmed) return "";
  return trimmed.replace(/\/+$/, "") + "/";
}

/**
 * Checks whether a string looks like a usable HTTP(S) or local path model URL.
 */
export function isValidModelUrl(url) {
  const normalized = normalizeModelUrl(url);
  if (!normalized) return false;
  return (
    normalized.startsWith("https://") ||
    normalized.startsWith("http://") ||
    normalized.startsWith("/")
  );
}

/**
 * Returns the custom model URL saved via the in-app Quick Connect helper (if any).
 */
export function getSavedCustomModelUrl() {
  try {
    return localStorage.getItem(CUSTOM_URL_STORAGE_KEY) || "";
  } catch {
    return "";
  }
}

export function saveCustomModelUrl(url) {
  const normalized = normalizeModelUrl(url);
  localStorage.setItem(CUSTOM_URL_STORAGE_KEY, normalized);
  return normalized;
}

export function clearCustomModelUrl() {
  localStorage.removeItem(CUSTOM_URL_STORAGE_KEY);
}

/**
 * Resolves the active model URL from modelConfig.js first, or fallback quick-connect URL.
 */
export function getActiveModelUrl() {
  if (MODEL_CONFIG.IS_MODEL_CONFIGURED && isValidModelUrl(MODEL_CONFIG.MODEL_URL)) {
    return normalizeModelUrl(MODEL_CONFIG.MODEL_URL);
  }
  const saved = getSavedCustomModelUrl();
  if (isValidModelUrl(saved)) {
    return normalizeModelUrl(saved);
  }
  return "";
}

/**
 * Returns true only when a real Teachable Machine model URL has been configured.
 */
export function isModelConfigured() {
  return Boolean(getActiveModelUrl());
}

export default MODEL_CONFIG;
