# TransformerGO

A full-stack engineering tool for designing Current Transformers (CT) and Potential Transformers (PT), with real machine-learning models predicting ratio and phase errors from lab-trained data.

**Live demo:** [transformergo.vercel.app](https://transformer-go-seven.vercel.app/) · **ML API:** [transformergo-production.up.railway.app](https://transformergo-production.up.railway.app)

---

## Overview

TransformerGO helps electrical engineers compute transformer design parameters — core size, winding turns, insulation thickness, wire cross-sections — and then predicts measurement errors using gradient boosting models trained on real test data, instead of static lookup tables.

## Features

- **CT Calculator** — core dimensions, primary/secondary turns, insulation, wire cross-sections
- **PT Calculator** — cross-section area, wire width, insulation layers, winding turns
- **ML Error Prediction** — ratio and phase error predictions across multiple burden levels, powered by trained scikit-learn models
- **3D Model Viewer** — interactive Sketchfab embeds for Oil Cooled and Epoxy/Dry transformer types
- **Export & Print** — generate a clean, print-ready report of inputs, computed results, and predictions
- **Authentication** — secure credential-based login with hashed passwords and JWT sessions
- **Responsive Design** — fully usable on mobile, tablet, and desktop

## Tech Stack

**Frontend**
- Next.js 16 (App Router, TypeScript)
- Tailwind CSS with a custom dark industrial theme
- shadcn/ui component library
- React Hook Form + Zod for validated forms
- NextAuth v5 (Credentials provider)
- Prisma ORM with PostgreSQL (Neon)

**ML Service**
- FastAPI
- scikit-learn (Gradient Boosting Regressors, multi-output)
- pandas / numpy for data processing
- joblib for model persistence

**Infrastructure**
- Frontend hosted on Vercel
- ML API hosted on Railway
- Database hosted on Neon (serverless PostgreSQL)
- CI via GitHub Actions (lint, typecheck, ML API import check)

## Project Structure

```
transformergo/
├── apps/
│   ├── web/                  Next.js frontend
│   │   ├── src/
│   │   │   ├── app/           App Router pages and API routes
│   │   │   ├── components/    Shared UI components (3D embed, print button)
│   │   │   └── lib/
│   │   │       ├── computations/  CT and PT design formulas
│   │   │       ├── auth.ts        NextAuth configuration
│   │   │       └── db.ts          Prisma client
│   │   └── prisma/
│   │       └── schema.prisma  Database schema
│   │
│   └── ml-api/                FastAPI ML service
│       ├── main.py            API endpoints
│       ├── models/
│       │   ├── train_ct.py    CT model training script
│       │   ├── train_pt.py    PT model training script
│       │   ├── ct_model.joblib
│       │   └── pt_model.joblib
│       └── data/               Training datasets
│
└── .github/workflows/ci.yml
```

## How It Works

1. **Design computation** happens entirely client-side using TypeScript ports of standard transformer design formulas (core sizing, turns ratio, insulation thickness).
2. **Error prediction** sends the computed design parameters to the FastAPI service, which runs them through a trained Gradient Boosting model and returns predicted ratio and phase errors at multiple burden and current levels.
3. **Authentication** is handled with NextAuth's Credentials provider; passwords are hashed with bcrypt and sessions are managed via JWT.

## Running Locally

### Frontend

```bash
cd apps/web
npm install
npx prisma generate
npm run dev
```

Create `apps/web/.env`:

```env
DATABASE_URL="your-postgresql-connection-string"
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
ML_API_URL="http://localhost:8000"
```

### ML API

```bash
cd apps/ml-api
python -m venv .venv
.venv\Scripts\activate   # or source .venv/bin/activate on macOS/Linux
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

To retrain the models from scratch:

```bash
cd apps/ml-api/models
python train_ct.py
python train_pt.py
```

## Model Performance

| Target | MAE | R² |
|---|---|---|
| CT Ratio Error (100%, Burden 1) | 0.038 | 0.69 |
| CT Phase Error (25%, Burden 120) | 0.571 | 0.87 |
| PT Ratio Error (100%, Burden 100) | 0.014 | 0.85 |
| PT Phase Error (100%, Burden 120) | 0.867 | 0.86 |

Full per-target metrics are printed during training.

## License

This project is for portfolio and educational purposes.