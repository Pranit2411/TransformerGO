import pandas as pd
import numpy as np
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.multioutput import MultiOutputRegressor
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_absolute_error, r2_score
import joblib
import os

df = pd.read_excel("../data/ct_dataset.xlsx")
print(f"Loaded {len(df)} rows, {len(df.columns)} columns")

# Step 1: Strip column names FIRST
df.columns = df.columns.str.strip()

# Step 2: Drop missing
df = df.dropna()
print(f"After dropna: {len(df)} rows")

# Step 3: Parse ratio-format columns
def parse_ratio_first(val):
    s = str(val).replace("\\", "/").split("/")[0].strip()
    return float(s)

df["CTRatioNum"] = df["CTRatio"].apply(parse_ratio_first)
df["BurdenNum"]  = df["Burden"].apply(parse_ratio_first)
df["STCNum"]     = df["STC"].apply(parse_ratio_first)

print("CTRatioNum sample:", df["CTRatioNum"].head().tolist())
print("BurdenNum sample:", df["BurdenNum"].head().tolist())
print("STCNum sample:", df["STCNum"].head().tolist())

# Step 4: Encode transformer type
if "Type1" in df.columns:
    df["TypeEncoded"] = df["Type1"].astype(str).str.strip().apply(
        lambda x: 1.0 if "oil" in x.lower() else 0.0
    )
else:
    df["TypeEncoded"] = 0.0

feature_cols = [
    "Specification", "CTRatioNum", "BurdenNum", "STCNum",
    "BDVOil", "PrimarytoSecondary", "PrimarytoEarth", "SecondarytoEarth", "TypeEncoded"
]

target_cols = [
    "Ratio100Error120", "Ratio100Error100", "Ratio100Error20", "Ratio100Error5", "Ratio100Error1",
    "Phase100Error120", "Phase100Error100", "Phase100Error20", "Phase100Error5", "Phase100Error1",
    "Ratio25Error120",  "Ratio25Error100",  "Ratio25Error20",  "Ratio25Error5",  "Ratio25Error1",
    "Phase25Error120",  "Phase25Error100",  "Phase25Error20",  "Phase25Error5",  "Phase25Error1",
]

missing_features = [c for c in feature_cols if c not in df.columns]
missing_targets  = [c for c in target_cols  if c not in df.columns]
if missing_features:
    print("MISSING FEATURE COLUMNS:", missing_features)
if missing_targets:
    print("MISSING TARGET COLUMNS:", missing_targets)

target_cols = [c for c in target_cols if c in df.columns]
print(f"Training with {len(feature_cols)} features and {len(target_cols)} targets")

X = df[feature_cols].values.astype(float)
Y = df[target_cols].values.astype(float)

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", MultiOutputRegressor(
        GradientBoostingRegressor(n_estimators=200, max_depth=4, learning_rate=0.05, random_state=42)
    ))
])

print("Training CT model...")
pipeline.fit(X_train, Y_train)

Y_pred = pipeline.predict(X_test)
print("\n--- CT Model Evaluation ---")
for i, col in enumerate(target_cols):
    mae = mean_absolute_error(Y_test[:, i], Y_pred[:, i])
    r2  = r2_score(Y_test[:, i], Y_pred[:, i])
    print(f"{col}: MAE={mae:.4f}, R²={r2:.4f}")

output_path = os.path.join(os.path.dirname(__file__), "ct_model.joblib")
joblib.dump({
    "pipeline": pipeline,
    "feature_cols": feature_cols,
    "target_cols": target_cols,
}, output_path)
print(f"\nCT model saved to {output_path}")