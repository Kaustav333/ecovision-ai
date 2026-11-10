import { useState, useEffect } from "react";
import { ScanLine, CheckCircle2, Unlink, AlertCircle } from "lucide-react";
import ImageUploader from "../components/scanner/ImageUploader";
import ClassificationResult from "../components/scanner/ClassificationResult";
import ModelSetupGuide from "../components/scanner/ModelSetupGuide";
import useWasteClassifier from "../hooks/useWasteClassifier";
import useClassificationHistory from "../hooks/useClassificationHistory";
import { createCompressedThumbnail } from "../utils/imageUtils";

export default function ScannerPage() {
  const {
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
  } = useWasteClassifier();

  const { history, addEntry, toggleDisposed, verifyPrediction } = useClassificationHistory();

  const [imagePreview, setImagePreview] = useState(null);
  const [savedEntryId, setSavedEntryId] = useState(null);

  useEffect(() => {
    if (isConfigured && !isModelLoaded && !isLoading && error !== "LOAD_FAILED") {
      loadModel();
    }
  }, [isConfigured, isModelLoaded, isLoading, error, loadModel]);

  const activeSavedEntry = savedEntryId
    ? history.find((item) => item.id === savedEntryId) || null
    : null;

  const handleImageReady = async (imgElement, previewUrl, sourceType) => {
    setImagePreview(previewUrl);
    setSavedEntryId(null);

    const results = await classify(imgElement);
    if (results && results.length > 0) {
      const top = results[0];
      const compressedThumb = await createCompressedThumbnail(previewUrl);
      const entry = addEntry({
        category: top.category,
        rawLabel: top.rawLabel,
        confidence: top.confidence,
        allScores: results,
        source: sourceType,
        thumbnail: compressedThumb || previewUrl,
      });
      setSavedEntryId(entry.id);
    }
  };

  const handleReset = () => {
    reset();
    setImagePreview(null);
    setSavedEntryId(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div className="eco-glass rounded-3xl border border-emerald-200/80 px-6 py-7 text-center max-w-2xl mx-auto shadow-xs">
        <div className="w-14 h-14 bg-emerald-100 border border-emerald-200 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <ScanLine className="w-7 h-7 text-[#14532D]" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0A3622]">
          AI Waste Scanner
        </h1>
        <p className="text-[#1E4730] mt-2 text-sm sm:text-base">
          Upload a photo or capture from your webcam to classify waste using Google Teachable Machine and TensorFlow.js.
        </p>
      </div>

      {/* Connected Model Status Pill */}
      {isConfigured && (
        <div className="flex flex-wrap items-center justify-between gap-3 eco-glass border border-emerald-200/80 rounded-2xl px-4 py-3 text-xs sm:text-sm shadow-2xs">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-semibold text-slate-800">
              {isModelLoaded ? "AI Model Active:" : "Connecting Model:"}
            </span>
            <span className="text-slate-500 truncate max-w-xs sm:max-w-md">{activeUrl}</span>
            {modelLabels.length > 0 && (
              <span className="hidden md:inline-block bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-full text-xs font-medium">
                {modelLabels.length} classes loaded
              </span>
            )}
          </div>
          {isUsingCustomOverride && (
            <button
              type="button"
              onClick={disconnectCustomUrl}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-red-700 px-2.5 py-1 rounded-lg hover:bg-red-50 transition-colors"
            >
              <Unlink className="w-3.5 h-3.5" />
              Disconnect Test URL
            </button>
          )}
        </div>
      )}

      {/* Unconfigured Setup Guide */}
      {!isConfigured && (
        <ModelSetupGuide
          onConnectUrl={connectCustomUrl}
          isLoading={isLoading}
          errorMessage={errorMessage}
        />
      )}

      {/* Model Load Failure */}
      {isConfigured && error === "LOAD_FAILED" && (
        <div className="max-w-2xl mx-auto bg-red-50 border border-red-200 rounded-3xl p-6 text-center space-y-3">
          <AlertCircle className="w-10 h-10 text-red-600 mx-auto" />
          <h3 className="text-lg font-bold text-red-900">Unable to Load AI Model</h3>
          <p className="text-sm text-red-700">{errorMessage}</p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => loadModel()}
              className="bg-red-700 hover:bg-red-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
            >
              Retry Loading Model
            </button>
            {isUsingCustomOverride && (
              <button
                type="button"
                onClick={disconnectCustomUrl}
                className="bg-white border border-red-200 text-red-700 px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-red-100/40 transition-colors"
              >
                Use Different Model URL
              </button>
            )}
          </div>
        </div>
      )}

      {/* Model Loading Spinner */}
      {isConfigured && isLoading && (
        <div className="bg-white rounded-3xl border border-emerald-100 p-12 text-center shadow-xs">
          <div className="w-12 h-12 border-4 border-emerald-200 border-t-emerald-700 rounded-full animate-spin mx-auto mb-4" />
          <p className="font-semibold text-slate-800">Loading TensorFlow.js Waste Model...</p>
          <p className="text-xs text-slate-500 mt-1">
            Downloading model weights directly to your browser
          </p>
        </div>
      )}

      {/* Scanner Input Interface */}
      {isConfigured && isModelLoaded && !predictions && (
        <ImageUploader onImageReady={handleImageReady} isProcessing={isAnalyzing} />
      )}

      {/* Classification Error Banner */}
      {error === "CLASSIFICATION_FAILED" && (
        <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-4 text-sm text-center">
          {errorMessage}
        </div>
      )}

      {/* Result + Disposal Recommendation Card */}
      {predictions && (
        <ClassificationResult
          predictions={predictions}
          imagePreview={imagePreview}
          savedEntry={activeSavedEntry}
          onToggleDisposed={toggleDisposed}
          onVerifyPrediction={verifyPrediction}
          onReset={handleReset}
        />
      )}
    </div>
  );
}
