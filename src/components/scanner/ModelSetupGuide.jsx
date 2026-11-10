import { useState } from "react";
import { AlertTriangle, ExternalLink, CheckCircle2, Link2, Loader2, Code2 } from "lucide-react";

export default function ModelSetupGuide({ onConnectUrl, isLoading, errorMessage }) {
  const [urlInput, setUrlInput] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!urlInput.trim() || !onConnectUrl) return;
    await onConnectUrl(urlInput);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
      {/* Main Unconfigured Notice */}
      <div className="bg-white border-2 border-amber-300 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex items-start gap-3.5 pb-5 border-b border-amber-100">
          <div className="w-11 h-11 rounded-2xl bg-amber-100 flex items-center justify-center shrink-0">
            <AlertTriangle className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Teachable Machine AI Model Not Configured Yet
            </h2>
            <p className="text-sm text-slate-600 mt-1 leading-relaxed">
              EcoVision AI runs real computer vision inference using TensorFlow.js and never uses simulated or random predictions. Connect your trained Google Teachable Machine model below to activate the scanner.
            </p>
          </div>
        </div>

        {/* Option A: Connect via src/config/modelConfig.js */}
        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-emerald-900">
            <Code2 className="w-4 h-4 text-emerald-700" />
            Step-by-Step Setup (Recommended via <code className="bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded text-xs">src/config/modelConfig.js</code>)
          </div>

          <ol className="space-y-2.5">
            {[
              <>Open <a href="https://teachablemachine.withgoogle.com/" target="_blank" rel="noopener noreferrer" className="text-emerald-700 font-semibold underline">Google Teachable Machine</a> and start a <strong>Standard Image Project</strong>.</>,
              <>Create 4 classes named: <strong>Plastic</strong>, <strong>Paper</strong>, <strong>Metal</strong>, and <strong>Organic Waste</strong>.</>,
              <>Capture or upload 40–100 varied waste photos per class, then click <strong>Train Model</strong>.</>,
              <>Click <strong>Export Model &rarr; TensorFlow.js &rarr; Upload my model</strong> and copy the shareable model URL.</>,
              <>Open <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">src/config/modelConfig.js</code>, paste your URL into <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">MODEL_URL</code>, and set <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">IS_MODEL_CONFIGURED: true</code>.</>,
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                <span className="w-6 h-6 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>

          <div className="bg-slate-900 text-emerald-200 rounded-2xl p-4 text-xs font-mono overflow-x-auto">
            <pre>{`// src/config/modelConfig.js
MODEL_URL: "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/",
IS_MODEL_CONFIGURED: true,`}</pre>
          </div>

          <a
            href="https://teachablemachine.withgoogle.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-emerald-900 hover:bg-emerald-950 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Open Google Teachable Machine
          </a>
        </div>

        {/* Option B: Quick In-Browser Model URL Test */}
        <div className="mt-8 pt-6 border-t border-slate-100">
          <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-1.5">
            <Link2 className="w-4 h-4 text-emerald-700" />
            Already exported a model URL? Quick-connect in this browser
          </h3>
          <p className="text-xs text-slate-500 mb-3">
            Paste your Teachable Machine shareable URL below to load and test the real model immediately (for permanent project submission, also save it in <code className="bg-slate-100 px-1 rounded">src/config/modelConfig.js</code>).
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://teachablemachine.withgoogle.com/models/XXXXXXXX/"
              required
              className="flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <button
              type="submit"
              disabled={isLoading || !urlInput.trim()}
              className="inline-flex items-center justify-center gap-2 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors shrink-0"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Loading Model...
                </>
              ) : (
                "Connect Model"
              )}
            </button>
          </form>

          {errorMessage && (
            <p className="text-xs text-red-600 mt-2 font-medium">{errorMessage}</p>
          )}
        </div>

        {/* Training Tips */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <h4 className="font-semibold text-sm text-slate-900 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Dataset Tips for High Viva Accuracy
          </h4>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
            <li>• Capture real photos from multiple angles</li>
            <li>• Vary lighting and plain/tabletop backgrounds</li>
            <li>• Keep one waste item centered per training photo</li>
            <li>• Balance sample counts equally across all 4 classes</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
