# EcoVision AI – Smart Waste Classification & Management System

**Class 12 CBSE Artificial Intelligence Practical Project**  
*Domain: Artificial Intelligence – Computer Vision*

---

## 1. Project Overview

Improper waste segregation makes recycling difficult and increases environmental pollution. People often struggle to identify the correct category and disposal method for everyday waste. **EcoVision AI** simplifies this process using real-time browser-based **image classification** and **smart disposal recommendations**.

### Aligned UN Sustainable Development Goals (SDGs)
- **SDG 11:** Sustainable Cities and Communities
- **SDG 12:** Responsible Consumption and Production
- **SDG 13:** Climate Action

---

## 2. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js + Vite | Fast single-page web interface |
| **Styling** | Tailwind CSS (v4) | Modern green-and-white responsive UI |
| **AI Training** | Google Teachable Machine | Transfer learning image classification (MobileNet) |
| **Model Inference** | TensorFlow.js (`@tensorflow/tfjs` + `@teachablemachine/image`) | Runs AI predictions inside the browser |
| **Data Visualization** | Recharts | Interactive Pie, Bar, and Daily/Weekly Activity charts |
| **Icons** | Lucide React | Clean environmental & UI iconography |
| **Persistence** | Browser `localStorage` | Private client-side history & disposal tracking |

---

## 3. Project Folder Structure

```text
ecovision-ai/
├── public/
│   └── favicon.svg
├── src/
│   ├── config/
│   │   └── modelConfig.js         # Paste your Google Teachable Machine model URL here
│   ├── data/
│   │   ├── wasteInfo.js           # Disposal steps, bins, reuse tips & environmental benefits
│   │   └── ecoFacts.js            # Eco Awareness content, "Did You Know?" facts, SDGs
│   ├── hooks/
│   │   ├── useWasteClassifier.js  # Loads TensorFlow.js model & executes real predictions
│   │   └── useClassificationHistory.js # Manages localStorage history & dashboard metrics
│   ├── utils/
│   │   ├── imageUtils.js          # Compresses thumbnails before storing in localStorage
│   │   └── storage.js             # LocalStorage read/write, daily/weekly aggregation
│   ├── components/
│   │   ├── layout/                # Navbar, Footer, Layout
│   │   ├── home/                  # HeroSection, StatsOverview
│   │   ├── scanner/               # ImageUploader (upload/webcam), ConfidenceBars, ClassificationResult, ModelSetupGuide
│   │   ├── dashboard/             # ImpactStats, WasteDistributionChart, CategoryBarChart, ActivityChart
│   │   └── history/               # HistoryList with category & status filters
│   ├── pages/
│   │   ├── HomePage.jsx           # Home Dashboard
│   │   ├── ScannerPage.jsx        # AI Waste Scanner
│   │   ├── HistoryPage.jsx        # Classification History
│   │   ├── DashboardPage.jsx      # Environmental Impact Dashboard
│   │   ├── RecyclingGuidePage.jsx # Eco Awareness & Recycling Guide
│   │   └── AboutPage.jsx          # Academic Project Information & Viva Reference
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── index.html
├── package.json
├── README.md
└── TEST_CASES.md
```

---

## 4. How the Application Works (Workflow)

1. **Image Acquisition:** On the **AI Scanner** page, the user uploads a photo (click or drag-and-drop) or captures one using the live **Webcam**.
2. **Client-Side AI Inference:** TensorFlow.js loads the trained Teachable Machine MobileNet model, preprocesses the image to 224×224 pixels, and outputs probability scores across the 4 waste classes.
3. **Smart Disposal Card:** The top predicted category (`Plastic`, `Paper`, `Metal`, or `Organic Waste`), confidence bars across all 4 categories, recommended waste bin (`Dry Waste / Blue Bin` vs `Wet Waste / Green Bin`), disposal steps, recycling/reuse tips, and a local rules reminder are displayed.
4. **Local Storage & Verification:** Each classification is saved privately in browser `localStorage` with a compressed thumbnail. The user can click **Mark as Properly Disposed** after sorting the item, ensuring AI detection counts stay strictly separate from confirmed real-world disposal actions.
5. **Interactive Analytics:** The **Environmental Impact** dashboard dynamically builds Pie, Bar, and Daily/Weekly activity charts strictly from locally stored records.

---

## 5. Step-by-Step Guide: Train Your AI Model on Google Teachable Machine

> **Important:** EcoVision AI never uses fake or hardcoded predictions. If no model is configured, the scanner displays clear setup instructions.

1. Visit **[https://teachablemachine.withgoogle.com/](https://teachablemachine.withgoogle.com/)**.
2. Click **Get Started** → **Image Project** → **Standard image model**.
3. Rename/create **4 Classes** with these exact names:
   - `Plastic`
   - `Paper`
   - `Metal`
   - `Organic Waste`
4. Collect **50–100 clear photos per class** (e.g. plastic bottles/wrappers, newspapers/cardboard, aluminium cans/spoons, fruit peels/food scraps) using varied angles, lighting, and backgrounds.
5. Click **Train Model** and wait for browser training to complete.
6. Test accuracy in Teachable Machine's **Preview** pane using new unseen items.
7. Click **Export Model** → select the **TensorFlow.js** tab → choose **Upload my model** → click **Upload my model**.
8. Copy the generated shareable URL (for example: `https://teachablemachine.withgoogle.com/models/AbCdEf123/`).

---

## 6. Connect the Trained Model to EcoVision AI

### Method 1: Permanent Configuration (Recommended for Submission)
1. Open `src/config/modelConfig.js`.
2. Paste your Teachable Machine URL into `MODEL_URL` and change `IS_MODEL_CONFIGURED` to `true`:

```js
const MODEL_CONFIG = {
  MODEL_URL: "https://teachablemachine.withgoogle.com/models/YOUR_MODEL_ID/",
  IS_MODEL_CONFIGURED: true,
  CATEGORIES: ["Plastic", "Paper", "Metal", "Organic Waste"],
  CONFIDENCE_THRESHOLD: 0.5,
};
```

3. Save the file and restart/refresh the app.

### Method 2: Quick-Connect During Live Demo
If `src/config/modelConfig.js` is not yet edited, you can also paste your exported Teachable Machine URL directly into the **Quick-connect in this browser** box on the **AI Scanner** page to test it immediately.

---

## 7. Run Locally

### Prerequisites
- **Node.js** (v18 or newer) and **npm** installed.

### Commands
```bash
# 1. Navigate to the project folder
cd ecovision-ai

# 2. Install dependencies
npm install

# 3. Start the local development server
npm run dev
```

Open the URL printed in your terminal (typically `http://localhost:5173`) in your browser.

To create an optimized production build:
```bash
npm run build
npm run preview
```

---

## 8. Sample Test Cases

See [`TEST_CASES.md`](./TEST_CASES.md) for detailed test cases covering all 4 waste categories (`Plastic`, `Paper`, `Metal`, `Organic Waste`), unconfigured model verification, webcam permissions, and `localStorage` persistence.
