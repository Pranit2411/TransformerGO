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

# Load data
df = pd.read_csv("../data/pt_dataset.csv")
print(f"Loaded {len(df)} rows, {len(df.columns)} columns")
print("Columns:", df.columns.tolist())

# Drop missing
df = df.dropna()
print(f"After dropna: {len(df)} rows")

# Clean column names
df.columns = df.columns.str.strip()

feature_cols = ["Speciations", "Burden", "class", "BDVOil",
                "PrimarytoSecondary", "PrimarytoEarth", "SecondarytoEarth"]

target_cols = [
    "Ratio100Error120", "Ratio100Error100", "Ratio100Error80",
    "Phase100Error120", "Phase100Error100", "Phase100Error80",
]

# Check columns exist
missing_features = [c for c in feature_cols if c not in df.columns]
missing_targets  = [c for c in target_cols  if c not in df.columns]
if missing_features:
    print("MISSING FEATURE COLUMNS:", missing_features)
if missing_targets:
    print("MISSING TARGET COLUMNS:", missing_targets)

target_cols = [c for c in target_cols if c in df.columns]
print(f"Training with {len(feature_cols)} features and {len(target_cols)} targets")

X = df[feature_cols].values
Y = df[target_cols].values

X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=42)

pipeline = Pipeline([
    ("scaler", StandardScaler()),
    ("model", MultiOutputRegressor(
        GradientBoostingRegressor(n_estimators=200, max_depth=4, learning_rate=0.05, random_state=42)
    ))
])

print("Training PT model...")
pipeline.fit(X_train, Y_train)

Y_pred = pipeline.predict(X_test)
print("\n--- PT Model Evaluation ---")
for i, col in enumerate(target_cols):
    mae = mean_absolute_error(Y_test[:, i], Y_pred[:, i])
    r2 = r2_score(Y_test[:, i], Y_pred[:, i])
    print(f"{col}: MAE={mae:.4f}, R²={r2:.4f}")

output_path = os.path.join(os.path.dirname(__file__), "pt_model.joblib")
joblib.dump({
    "pipeline": pipeline,
    "feature_cols": feature_cols,
    "target_cols": target_cols,
}, output_path)
print(f"\nPT model saved to {output_path}")