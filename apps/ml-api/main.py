from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import numpy as np
import os

app = FastAPI(title="TransformerGO ML API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "https://*.vercel.app"],
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

ct_bundle = None
pt_bundle = None

@app.on_event("startup")
def load_models():
    global ct_bundle, pt_bundle
    ct_path = "models/ct_model.joblib"
    pt_path = "models/pt_model.joblib"
    if os.path.exists(ct_path):
        ct_bundle = joblib.load(ct_path)
        print("CT model loaded.")
    else:
        print("WARNING: CT model not found.")
    if os.path.exists(pt_path):
        pt_bundle = joblib.load(pt_path)
        print("PT model loaded.")
    else:
        print("WARNING: PT model not found.")

class CTPredictRequest(BaseModel):
    specification: float
    ct_ratio_num: float
    burden: float
    stc: float
    bdv_oil: float
    primary_to_secondary: float
    primary_to_earth: float
    secondary_to_earth: float
    type_encoded: float = 1.0

class PTPredictRequest(BaseModel):
    specification: float
    burden: float
    class_type: float
    bdv_oil: float
    primary_to_secondary: float
    primary_to_earth: float
    secondary_to_earth: float

class PredictResponse(BaseModel):
    predictions: dict

@app.get("/health")
def health():
    return {
        "status": "ok",
        "ct_model": "loaded" if ct_bundle else "not loaded",
        "pt_model": "loaded" if pt_bundle else "not loaded",
    }

@app.post("/predict/ct", response_model=PredictResponse)
def predict_ct(req: CTPredictRequest):
    if not ct_bundle:
        raise HTTPException(status_code=503, detail="CT model not loaded.")
    pipeline = ct_bundle["pipeline"]
    target_cols = ct_bundle["target_cols"]
    # Feature order: Specification, CTRatioNum, BurdenNum, STCNum,
    #                BDVOil, PrimarytoSecondary, PrimarytoEarth, SecondarytoEarth, TypeEncoded
    features = np.array([[
        req.specification, req.ct_ratio_num, req.burden, req.stc,
        req.bdv_oil, req.primary_to_secondary, req.primary_to_earth,
        req.secondary_to_earth, req.type_encoded
    ]])
    preds = pipeline.predict(features)[0]
    return {"predictions": dict(zip(target_cols, [round(float(p), 4) for p in preds]))}

@app.post("/predict/pt", response_model=PredictResponse)
def predict_pt(req: PTPredictRequest):
    if not pt_bundle:
        raise HTTPException(status_code=503, detail="PT model not loaded.")
    pipeline = pt_bundle["pipeline"]
    target_cols = pt_bundle["target_cols"]
    # Feature order: Speciations, Burden, class, BDVOil,
    #                PrimarytoSecondary, PrimarytoEarth, SecondarytoEarth
    features = np.array([[
        req.specification, req.burden, req.class_type,
        req.bdv_oil, req.primary_to_secondary, req.primary_to_earth,
        req.secondary_to_earth
    ]])
    preds = pipeline.predict(features)[0]
    return {"predictions": dict(zip(target_cols, [round(float(p), 4) for p in preds]))}