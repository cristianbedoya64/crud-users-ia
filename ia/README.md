
# IA Panel (Python/Flask) - UARP-AI
# IA Panel (Python/Flask) - UARP-AI

---

## Visión General
## Overview
Servicio Python para análisis de datos y panel de IA. Expone `/ia-panel` para sugerencias, anomalías y predicciones.
Python service for data analysis and IA panel. Exposes `/ia-panel` for suggestions, anomalies, and predictions.

---

## Características
## Features
- API REST Flask  
	Flask REST API
- Análisis de datos y predicción  
	Data analysis and prediction
- Integración con backend Node.js  
	Node.js backend integration

---

## Estructura
## Structure
- `db_config.py`: Configuración de base de datos  
	DB config
- `ia_panel.py`: Lógica principal del panel IA  
	Main IA panel logic
- `inspect_db.py`: Inspección/análisis de la base de datos  
	DB inspection/analysis
- `seed_ia_panel.py`: Seed de datos IA  
	IA data seeding
- `test_db_connection.py`: Test de conexión a la base de datos  
	DB connection test
- `train_ia_model.py`: Entrenamiento del modelo  
	Model training

---

## Configuración (local)
## Setup (local)
1. Instala dependencias: `pip install -r requirements.txt` (si aplica)  
	 Install dependencies: `pip install -r requirements.txt` (if any)
2. Define `PORT=5001` si deseas cambiar el puerto  
	 Set `PORT=5001` if you want to change the port
3. Inicia: `python ia_panel.py`  
	 Start: `python ia_panel.py`

### Con Docker / Compose
### With Docker / Compose
- Se construye con `ia/Dockerfile`; expone puerto 5001  
	Built with `ia/Dockerfile`; exposes port 5001
- En App Platform usar Web Service con puerto interno 5001  
	In App Platform use Web Service with internal port 5001

---

## Variables de Entorno
## Env Vars
- `PORT` (default: 5001)

---

## Seguridad
## Security
- No exponer endpoints sensibles  
	Do not expose sensitive endpoints
- Revisar logs y errores  
	Review logs and errors

---

## Modelo
## Model
- Entrenamiento demo: `python train_ia_model.py` genera `ia_model.pkl`  
	Demo training: `python train_ia_model.py` generates `ia_model.pkl`
- El endpoint carga `ia_model.pkl`; si no existe, responderá error 500  
	The endpoint loads `ia_model.pkl`; if missing, returns error 500
- El frontend muestra "IA no disponible" y marca el panel como demo si el modelo no está cargado  
	Frontend shows "IA not available" and marks panel as demo if model is not loaded

---

## Troubleshooting
- Verifica que el backend llame via `IA_PANEL_URL` (por defecto `http://ia-panel:5001/ia-panel` en Docker)  
	Check backend calls via `IA_PANEL_URL` (default `http://ia-panel:5001/ia-panel` in Docker)
- Revisa logs de Flask; habilita verbose si necesitas depurar  
	Review Flask logs; enable verbose for debugging if needed