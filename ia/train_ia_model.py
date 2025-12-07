import pandas as pd
from sklearn.ensemble import IsolationForest
import pickle

# Datos simulados: cada fila es un usuario con features
# Puedes reemplazar esto por datos reales de tu DB
X = pd.DataFrame({
    'num_roles': [1, 2, 1, 3, 0, 1, 2, 0, 1, 3],
    'is_admin': [0, 1, 0, 1, 0, 0, 1, 0, 0, 1],
    'activity_score': [10, 50, 12, 60, 5, 15, 55, 3, 14, 65]
})

# Entrenar modelo de detección de anomalías
model = IsolationForest(contamination=0.2, random_state=42)
model.fit(X)

# Guardar el modelo entrenado
with open('ia_model.pkl', 'wb') as f:
    pickle.dump(model, f)

print('Modelo IA entrenado y guardado como ia_model.pkl')
