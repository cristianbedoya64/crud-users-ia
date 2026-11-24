"""Entrenamiento del modelo de detección de anomalías (Isolation Forest).

Datos de entrenamiento: perfiles SINTÉTICOS generados con semilla fija para que
el entrenamiento sea reproducible. Representan el comportamiento esperado de dos
poblaciones de la plataforma:
  - usuarios estándar: 0 a 1 rol, sin privilegios de administrador, actividad baja;
  - administradores: 2 a 3 roles, con privilegios, actividad media-alta.
Variables (no contienen datos personales):
  num_roles, is_admin, activity_score (eventos de auditoría en los últimos 30 días).
Cuando la plataforma acumule historial real, este conjunto debe reemplazarse por
datos reales anonimizados.
"""
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import IsolationForest

rng = np.random.default_rng(42)

n_std, n_adm = 400, 100
estandar = pd.DataFrame({
    'num_roles': rng.choice([0, 1], size=n_std, p=[0.2, 0.8]),
    'is_admin': 0,
    'activity_score': np.clip(rng.normal(10, 4, n_std).round(), 0, None).astype(int),
})
admins = pd.DataFrame({
    'num_roles': rng.choice([2, 3], size=n_adm),
    'is_admin': 1,
    'activity_score': np.clip(rng.normal(56, 7, n_adm).round(), 0, None).astype(int),
})
X = pd.concat([estandar, admins], ignore_index=True)

model = IsolationForest(n_estimators=200, contamination=0.02, random_state=42)
model.fit(X)

with open('ia_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print(f'Modelo entrenado con {len(X)} perfiles sintéticos y guardado como ia_model.pkl')
