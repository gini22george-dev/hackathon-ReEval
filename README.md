# BoardMark Defender 🛡️⚖️

> **The Pro-Student Board Examination Audit & Mark Recovery Engine**  
> Powered by **Gemini 1.5 Pro** (`google-genai` SDK) & **OpenCV Regional Blur Vision**.

---

## 📌 Architecture Overview

```
BoardMark_Defender/
├── backend/
│   ├── main.py              # FastAPI app + OpenCV regional blur + Gemini 1.5 Pro advocate rules
│   └── requirements.txt     # Python dependencies (FastAPI, OpenCV, google-genai, PIL, NumPy)
├── frontend/
│   ├── app/
│   │   ├── layout.tsx       # Root layout & dark-mode styling
│   │   ├── page.tsx         # Dashboard with drag-and-drop dropzones, loading states & results grid
│   │   └── globals.css      # Tailwind & glassmorphism theme
│   ├── package.json         # Next.js 14, Lucide icons, Tailwind
│   ├── tailwind.config.js   # Tailwind custom styling & animations
│   ├── next.config.js       # API proxy rewrite to FastAPI backend
│   └── tsconfig.json        # TypeScript configuration
├── vercel.json              # Monorepo single-click Vercel routing
└── README.md
```

---

## ⚡ Core Specifications & Highlights

1. **Strict Student-Advocate Rules**:
   - **Zero Deductions Directive**: The engine **never reduces marks**.
   - **Pro-Student Recovery**: Exclusively flags under-evaluation, unchecked answers/sub-questions, clerical retotalling errors, and blurred scan areas.
   - Outputs a formalized **RTI / Board Re-evaluation petition** ready for submission to the Examination Controller (CBSE, ICSE, State Boards).

2. **OpenCV Regional Blur Vision**:
   - Decomposes the answer sheet into a $3 \times 3$ matrix of localized inspection zones.
   - Computes Laplacian variance ($\text{Var}(\Delta I)$) for each sector.
   - Detects low-contrast scan regions ($< 85.0$) where examiner oversight or OCR misreading is probable.

3. **Modern 21st.dev-Ready Next.js Frontend**:
   - Glassmorphic dark UI with glowing ambient accents and badges.
   - Interactive dropzones for **Answer Script (PDF/Images)**, **Question Paper**, and **Marking Scheme**.
   - Built-in **"Load Physics Demo"** preset to test the complete audit lifecycle in 1 click without needing manual file uploads.
   - Multi-phase animated progress pipeline simulating real-time AI & Computer Vision auditing.
   - Comprehensive results dashboard:
     - Recoverable score banner ($+\text{X Marks}$, percentage boost)
     - Categorized discrepancy cards with rubric citations & student evidence
     - Retotalling arithmetic audit
     - $3 \times 3$ interactive OpenCV blur heatmap
     - One-click copy & `.txt` export of the formal dispute petition.

---

## 🚀 Local Development Setup

### 1. Run the FastAPI Backend
```bash
cd backend
pip install -r requirements.txt
python -m uvicorn main:app --host 127.0.0.1 --port 8000 --reload
```
The FastAPI interactive documentation will be available at [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs).

### 2. Run the Next.js Frontend
```bash
cd frontend
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser. Next.js automatically proxies `/api/*` to the FastAPI backend at `http://127.0.0.1:8000`.

---

## ☁️ Deployment on Vercel

The monorepo includes [`vercel.json`](./vercel.json) pre-configured with:
- `@vercel/python` builder for `backend/main.py`
- `@vercel/next` builder for `frontend/package.json`
- Unified routing directing `/api/(.*)` to the Python backend and all other traffic to the Next.js frontend.

Deploy in one command with the Vercel CLI:
```bash
vercel
```
Ensure you configure `GEMINI_API_KEY` in your Vercel Project Environment Variables (or input it directly in the UI's Gemini Key modal).
