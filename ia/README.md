
# IA Panel (Python/Flask) - UARP-AI

## Visión General / Overview
Servicio Python para análisis de datos y panel de IA. Expone `/ia-panel` para sugerencias, anomalías y predicciones.

## Características / Features
- API REST Flask
- Análisis de datos y predicción
- Integración con backend Node.js

## Estructura / Structure
- `db_config.py`: DB config
- `ia_panel.py`: Main IA panel logic
- `inspect_db.py`: DB inspection/analysis
- `seed_ia_panel.py`: IA data seeding
- `test_db_connection.py`: DB connection test
- `train_ia_model.py`: Model training

## Setup / Configuración (local)
1. Instala dependencias: `pip install -r requirements.txt` (si aplica)
2. Define `PORT=5001` si deseas cambiar el puerto
3. Inicia: `python ia_panel.py`

### Con Docker / Compose
- Se construye con `ia/Dockerfile`; expone puerto 5001
- En App Platform usar Web Service con puerto interno 5001

## Variables de Entorno / Env Vars
- `PORT` (default: 5001)

## Seguridad / Security
- No exponer endpoints sensibles
- Revisar logs y errores

## Modelo
- Entrenamiento demo: `python train_ia_model.py` genera `ia_model.pkl`
- El endpoint carga `ia_model.pkl`; si no existe, responderá error 500
 - El frontend muestra "IA no disponible" y marca el panel como demo si el modelo no está cargado

## Troubleshooting
- Verifica que el backend llame via `IA_PANEL_URL` (por defecto `http://ia-panel:5001/ia-panel` en Docker)
- Revisa logs de Flask; habilita verbose si necesitas depurar

---

# IA Panel (Python/Flask) - UARP-AI

## Overview
Python service for data analysis and IA panel. Exposes endpoints for suggestions, anomalies, predictions.

## Features
- Flask REST API
- Data analysis/prediction
- Node.js backend integration

## Structure
- `db_config.py`: DB config
- `ia_panel.py`: Main IA panel logic
- `inspect_db.py`: DB inspection/analysis
- `seed_ia_panel.py`: IA data seeding
- `test_db_connection.py`: DB connection test
- `train_ia_model.py`: Model training

## Setup
1. Install dependencies: `pip install -r requirements.txt` (if any)
2. Set env vars if needed
3. Start: `python ia_panel.py` or via Docker

## Env Vars
- `PORT` (default: 5001)

## Security
- Do not expose sensitive endpoints
- Review logs/errors

## Troubleshooting
- Check backend connection
- Review Flask logs