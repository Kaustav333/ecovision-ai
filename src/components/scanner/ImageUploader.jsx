import { useState, useRef, useEffect, useCallback } from "react";
import { Upload, Camera, Image as ImageIcon, X, Loader2, ScanLine, VideoOff } from "lucide-react";

export default function ImageUploader({ onImageReady, isProcessing }) {
  const [preview, setPreview] = useState(null);
  const [sourceType, setSourceType] = useState("upload");
  const [mode, setMode] = useState("upload");
  const [isDragging, setIsDragging] = useState(false);
  const [webcamActive, setWebcamActive] = useState(false);
  const [webcamError, setWebcamError] = useState(null);

  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const stopWebcam = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setWebcamActive(false);
  }, []);

  // Ensure camera is always stopped if user navigates away
  useEffect(() => {
    return () => {
      stopWebcam();
    };
  }, [stopWebcam]);

  // Attach media stream cleanly after <video> mounts
  useEffect(() => {
    if (webcamActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
      videoRef.current.play().catch((err) => {
        console.error("Video playback failed:", err);
      });
    }
  }, [webcamActive]);

  const loadFile = (file) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setWebcamError("Please choose a valid image file (JPG, PNG, or WebP).");
      return;
    }
    setWebcamError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target.result);
      setSourceType("upload");
    };
    reader.readAsDataURL(file);
  };

  const handleFileUpload = (e) => {
    loadFile(e.target.files?.[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    loadFile(e.dataTransfer.files?.[0]);
  };

  const startWebcam = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setWebcamError("Webcam access is not supported by this browser.");
      return;
    }

    try {
      setWebcamError(null);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment", width: { ideal: 640 }, height: { ideal: 480 } },
        audio: false,
      });
      streamRef.current = stream;
      setWebcamActive(true);
    } catch (err) {
      console.error("Webcam error:", err);
      setWebcamError(
        "Unable to access camera. Please allow camera permission in your browser settings or upload an image file instead."
      );
    }
  };

  const captureFromWebcam = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setPreview(dataUrl);
    setSourceType("webcam");
    stopWebcam();
  };

  const handleClassify = () => {
    if (!preview || isProcessing) return;
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      onImageReady(img, preview, sourceType);
    };
    img.src = preview;
  };

  const clearPreview = () => {
    setPreview(null);
    setWebcamError(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="bg-white rounded-3xl border border-emerald-100 shadow-sm p-6 sm:p-8 space-y-6">
      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2 bg-emerald-50 border border-emerald-100 rounded-2xl p-1.5 max-w-sm mx-auto">
        <button
          type="button"
          onClick={() => {
            setMode("upload");
            stopWebcam();
            setWebcamError(null);
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "upload"
              ? "bg-emerald-900 text-white shadow-xs"
              : "text-emerald-900/70 hover:text-emerald-950"
          }`}
        >
          <Upload className="w-4 h-4" />
          Upload Image
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("webcam");
            clearPreview();
          }}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
            mode === "webcam"
              ? "bg-emerald-900 text-white shadow-xs"
              : "text-emerald-900/70 hover:text-emerald-950"
          }`}
        >
          <Camera className="w-4 h-4" />
          Use Webcam
        </button>
      </div>

      {webcamError && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-2xl text-sm text-center">
          {webcamError}
        </div>
      )}

      {/* Upload Dropzone */}
      {mode === "upload" && !preview && (
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") fileInputRef.current?.click();
          }}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-10 sm:p-14 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? "border-emerald-600 bg-emerald-50/80"
              : "border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50/40"
          }`}
        >
          <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ImageIcon className="w-8 h-8 text-emerald-700" />
          </div>
          <p className="text-lg font-bold text-slate-900 mb-1.5">
            Drop a waste photo here, or click to browse
          </p>
          <p className="text-sm text-slate-500">
            Supports JPG, PNG, WebP — processed locally in your browser
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      )}

      {/* Webcam Area */}
      {mode === "webcam" && !preview && (
        <div className="space-y-4">
          {!webcamActive ? (
            <div className="border-2 border-dashed border-emerald-200 rounded-2xl p-10 sm:p-14 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Camera className="w-8 h-8 text-emerald-700" />
              </div>
              <p className="text-base font-semibold text-slate-800 mb-4">
                Point your camera at a single waste item in good lighting
              </p>
              <button
                type="button"
                onClick={startWebcam}
                className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-colors"
              >
                <Camera className="w-4 h-4" />
                Enable Camera
              </button>
              <p className="text-xs text-slate-500 mt-3">
                Your browser will request camera permission. Live video stays private on your device.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 border border-emerald-200">
                <video
                  ref={videoRef}
                  className="w-full max-h-96 object-contain mx-auto"
                  autoPlay
                  playsInline
                  muted
                />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={captureFromWebcam}
                  className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl font-semibold shadow-sm transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  Capture Photo
                </button>
                <button
                  type="button"
                  onClick={stopWebcam}
                  className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-3 rounded-xl font-semibold transition-colors"
                >
                  <VideoOff className="w-4 h-4" />
                  Stop Camera
                </button>
              </div>
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      )}

      {/* Selected Image Preview */}
      {preview && (
        <div className="space-y-5 animate-fade-in">
          <div className="relative rounded-2xl overflow-hidden bg-slate-100 border border-emerald-100 max-w-md mx-auto">
            <img
              src={preview}
              alt="Selected waste preview"
              className="w-full max-h-80 object-contain"
            />
            <button
              type="button"
              onClick={clearPreview}
              aria-label="Remove selected image"
              className="absolute top-3 right-3 bg-slate-900/70 hover:bg-slate-900 text-white p-2 rounded-full transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleClassify}
              disabled={isProcessing}
              className="inline-flex items-center gap-2.5 bg-gradient-to-r from-emerald-700 to-green-600 hover:from-emerald-800 hover:to-green-700 text-white px-8 py-3.5 rounded-2xl font-bold shadow-md disabled:opacity-60 disabled:cursor-not-allowed transition-all"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analysing Image...
                </>
              ) : (
                <>
                  <ScanLine className="w-5 h-5" />
                  Analyze Waste Item
                </>
              )}
            </button>

            <button
              type="button"
              onClick={clearPreview}
              disabled={isProcessing}
              className="inline-flex items-center gap-2 bg-white border border-slate-200 hover:border-emerald-300 text-slate-700 px-5 py-3.5 rounded-2xl font-semibold transition-colors"
            >
              Choose Different Image
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
