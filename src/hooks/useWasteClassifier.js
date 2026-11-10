import { useState, useRef, useCallback } from "react";
import MODEL_CONFIG, {
  getActiveModelUrl,
  getSavedCustomModelUrl,
  saveCustomModelUrl,
  clearCustomModelUrl,
  isValidModelUrl,
  normalizeModelUrl,
} from "../config/modelConfig";
import { WASTE_CATEGORIES, normalizeCategoryLabel } from "../data/wasteInfo";

/**
 * Custom hook to handle real AI waste classification using Google Teachable Machine + TensorFlow.js.
 * Never generates fake or random predictions: requires a valid configured Teachable Machine model.
 */
export default function useWasteClassifier() {
  const [activeUrl, setActiveUrl] = useState(() => getActiveModelUrl());
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [predictions, setPredictions] = useState(null);
  const [modelLabels, setModelLabels] = useState([]);
  const [error, setError] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const modelRef = useRef(null);

  const isConfigured = Boolean(activeUrl);
  const isUsingCustomOverride = Boolean(
    getSavedCustomModelUrl() && !(MODEL_CONFIG.IS_MODEL_CONFIGURED && isValidModelUrl(MODEL_CONFIG.MODEL_URL))
  );

  /**
   * Loads the TensorFlow.js + Teachable Machine model from the configured URL.
   */
  const loadModel = useCallback(
    async (overrideUrl) => {
      const targetUrl = overrideUrl ? normalizeModelUrl(overrideUrl) : getActiveModelUrl();
      setActiveUrl(targetUrl);

      if (!targetUrl) {
        setIsModelLoaded(false);
        setError("MODEL_NOT_CONFIGURED");
        setErrorMessage("");
        return false;
      }

      try {
        setIsLoading(true);
        setError(null);
        setErrorMessage("");

        // Ensure TensorFlow.js registers its runtime backends before loading Teachable Machine
        await import("@tensorflow/tfjs");
        const tmModule = await import("@teachablemachine/image");
        const tmImage = typeof tmModule.load === "function" ? tmModule : tmModule.default;

        if (!tmImage || typeof tmImage.load !== "function") {
          throw new Error("Teachable Machine image loader could not be initialized.");
        }

        const modelURL = `${targetUrl}model.json`;
        const metadataURL = `${targetUrl}metadata.json`;

        const model = await tmImage.load(modelURL, metadataURL);
        modelRef.current = model;
        setModelLabels(model.getClassLabels ? model.getClassLabels() : []);
        setIsModelLoaded(true);
        setIsLoading(false);
        return true;
      } catch (err) {
        console.error("Failed to load Teachable Machine model:", err);
        modelRef.current = null;
        setIsModelLoaded(false);
        setError("LOAD_FAILED");
        setErrorMessage(
          err?.message ||
            "Could not load model.json / metadata.json. Verify the Teachable Machine URL and your internet connection."
        );
        setIsLoading(false);
        return false;
      }
    },
    []
  );

  /**
   * Connects and persists a Teachable Machine URL in browser localStorage for quick testing.
   */
  const connectCustomUrl = useCallback(
    async (rawUrl) => {
      if (!isValidModelUrl(rawUrl)) {
        setError("INVALID_URL");
        setErrorMessage(
          "Please enter a valid Teachable Machine model URL starting with https:// (e.g. https://teachablemachine.withgoogle.com/models/XXXXX/)."
        );
        return false;
      }
      const saved = saveCustomModelUrl(rawUrl);
      const ok = await loadModel(saved);
      if (!ok) {
        clearCustomModelUrl();
        setActiveUrl(getActiveModelUrl());
      }
      return ok;
    },
    [loadModel]
  );

  /**
   * Disconnects any temporary in-browser URL and falls back to src/config/modelConfig.js.
   */
  const disconnectCustomUrl = useCallback(() => {
    clearCustomModelUrl();
    modelRef.current = null;
    setIsModelLoaded(false);
    setPredictions(null);
    setError(null);
    setErrorMessage("");
    setActiveUrl(getActiveModelUrl());
  }, []);

  /**
   * Runs inference on an image/canvas/video element using the loaded Teachable Machine model.
   */
  const classify = useCallback(async (imageElement) => {
    if (!modelRef.current) {
      setError("MODEL_NOT_LOADED");
      setErrorMessage("The AI model is still loading or not configured.");
      return null;
    }

    try {
      setIsAnalyzing(true);
      setError(null);
      setErrorMessage("");

      const rawResults = await modelRef.current.predict(imageElement);

      // Map raw predictions onto canonical categories while preserving highest score per canonical class
      const scoreMap = new Map();
      for (const r of rawResults) {
        const canonical = normalizeCategoryLabel(r.className);
        const pct = parseFloat((r.probability * 100).toFixed(1));
        const existing = scoreMap.get(canonical);
        if (!existing || pct > existing.confidence) {
          scoreMap.set(canonical, {
            category: canonical,
            rawLabel: r.className,
            confidence: pct,
          });
        }
      }

      // Ensure all 4 standard categories are included for clear confidence visualization
      for (const cat of WASTE_CATEGORIES) {
        if (!scoreMap.has(cat)) {
          scoreMap.set(cat, {
            category: cat,
            rawLabel: cat,
            confidence: 0,
          });
        }
      }

      const sorted = Array.from(scoreMap.values()).sort(
        (a, b) => b.confidence - a.confidence
      );

      setPredictions(sorted);
      setIsAnalyzing(false);
      return sorted;
    } catch (err) {
      console.error("Classification failed:", err);
      setError("CLASSIFICATION_FAILED");
      setErrorMessage("Could not analyze this image. Please try another clear photo.");
      setIsAnalyzing(false);
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setPredictions(null);
    setError(null);
    setErrorMessage("");
  }, []);

  return {
    activeUrl,
    isConfigured,
    isUsingCustomOverride,
    isModelLoaded,
    isLoading,
    isAnalyzing,
    predictions,
    modelLabels,
    error,
    errorMessage,
    loadModel,
    connectCustomUrl,
    disconnectCustomUrl,
    classify,
    reset,
  };
}
