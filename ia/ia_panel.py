
from flask import Flask, request, jsonify

import random
import pickle
import pandas as pd

app = Flask(__name__)


@app.route('/ia-panel', methods=['POST'])
def ia_panel():
    print("Petición recibida en /ia-panel")
    features = request.json or {}
    print("Features recibidos:", features)
    num_roles = features.get('num_roles', 1)
    is_admin = features.get('is_admin', 0)
    activity_score = features.get('activity_score', 10)

    try:
        print("Cargando modelo ia_model.pkl...")
        with open('ia_model.pkl', 'rb') as f:
            model = pickle.load(f)
        print("Modelo cargado correctamente.")
        X = pd.DataFrame({
            'num_roles': [num_roles],
            'is_admin': [is_admin],
            'activity_score': [activity_score]
        })
        print("Datos para predicción:", X)
        anomaly_score = model.decision_function(X)[0]
        is_anomaly = model.predict(X)[0] == -1
        suggestion = 'Usuario normal.' if not is_anomaly else 'Posible anomalía detectada.'
        anomaly = f'Score de anomalía: {anomaly_score:.2f}'
        prediction = 'Sin predicción relevante.'
        print("Resultado:", suggestion, anomaly, prediction)
        return jsonify({
            'suggestions': suggestion,
            'anomalies': anomaly,
            'predictions': prediction
        })
    except Exception as e:
        print("ERROR PANEL IA:", e)
        return jsonify({'error': 'IA error', 'details': str(e)}), 500

if __name__ == '__main__':
    # Bind to all interfaces so other containers can reach this service.
    app.run(host='0.0.0.0', port=5001)
