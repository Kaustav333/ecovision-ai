# EcoVision AI – Sample Test Cases

Use this test checklist during development verification and CBSE Class 12 AI practical presentation / viva demonstration.

---

## Part A: Waste Category Classification Test Cases (Requires Configured Teachable Machine Model)

| Test ID | Waste Category | Sample Input Item (Upload / Webcam) | Expected Predicted Category | Expected Confidence Display | Expected Recommended Bin | Expected Disposal & Reuse Output |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TC-01** | **Plastic** | Clean transparent PET water bottle, milk pouch, or plastic food tub against a plain desk | `Plastic` | Top confidence bar highlighted for `Plastic`; percentages shown for all 4 classes (`Plastic`, `Paper`, `Metal`, `Organic Waste`) | **Dry Waste (Recyclable Stream)** – Blue Bin | Instructions to rinse/empty, flatten bottle, check resin code, separate cap if needed, plus local rules disclaimer |
| **TC-02** | **Paper** | Folded newspaper, notebook sheet, paper bag, or flattened cardboard box | `Paper` | Top confidence bar highlighted for `Paper`; all 4 class scores rendered | **Dry Waste (Recyclable Stream)** – Blue Bin | Instructions to keep dry, remove tape/staples, flatten cartons, avoid oily paper, reuse/donate suggestions |
| **TC-03** | **Metal** | Empty aluminium soda can, clean tin food container, or rolled aluminium foil ball | `Metal` | Top confidence bar highlighted for `Metal`; all 4 class scores rendered | **Dry Waste (Recyclable Stream)** – Blue Bin | Instructions to rinse can, tuck sharp edges safely, recycle aluminium infinitely, energy-saving environmental benefit |
| **TC-04** | **Organic Waste** | Banana peel, apple core, vegetable trimmings, or dry garden leaves | `Organic Waste` | Top confidence bar highlighted for `Organic Waste`; all 4 class scores rendered | **Wet Waste (Biodegradable / Compost Bin)** – Green Bin | Instructions to remove plastic stickers/wrappers, separate from dry waste, compost or vermicompost suggestions, methane prevention benefit |

---

## Part B: Functional & Edge-Case Test Cases

| Test ID | Feature / Scenario | Steps to Reproduce | Expected Behaviour |
| :--- | :--- | :--- | :--- |
| **TC-05** | **Unconfigured Model Guard** | Ensure `MODEL_URL` in `src/config/modelConfig.js` is `""` (and no quick-connect URL is saved). Navigate to `/scanner`. | Scanner does **not** display fake or random predictions. Displays clear **"Teachable Machine AI Model Not Configured Yet"** setup instructions. |
| **TC-06** | **Webcam Capture & Cleanup** | Open `/scanner` with model configured → switch to **Use Webcam** → click **Enable Camera** → grant permission → click **Capture Photo** → click **Analyze Waste Item**. | Live camera preview appears; captured snapshot displays cleanly; camera light turns off immediately after capture or when navigating to another page. |
| **TC-07** | **Low-Confidence Caution** | Upload an ambiguous or dark/blurry image where top confidence `< 50%`. | Displays an amber caution alert recommending clearer lighting and a single centered waste item. |
| **TC-08** | **Disposal Confirmation Separation** | Classify 1 item → navigate to `/impact` before clicking **Mark as Properly Disposed** → then click **Mark as Properly Disposed**. | Before clicking: `Total Items Classified = 1`, `Confirmed Properly Disposed = 0`. After clicking: `Confirmed Properly Disposed = 1`. AI detection never pretends waste was recycled automatically. |
| **TC-09** | **History Filtering & Local Persistence** | Classify items across multiple categories → visit `/history` → filter by `Plastic` or `Properly Disposed` → refresh browser (`F5`). | Thumbnail, category, confidence %, timestamp, and disposal status persist in browser `localStorage` across page reloads; category & status filters accurately filter cards. |
| **TC-10** | **Interactive Charts & Eco Guide** | Visit `/impact` and switch Activity Chart between **Daily** and **Weekly**; visit `/guide` and click **Next / Surprise Me** on *Did You Know?* and toggle Sustainable Habits. | Pie chart, category bar chart, and daily/weekly chart render cleanly from real `localStorage` data; *Did You Know?* facts cycle smoothly and habit checkboxes toggle state. |

