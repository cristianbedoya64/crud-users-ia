
# 🤖 IA Panel (Python/Flask) — UARP-AI / AI Panel (Python/Flask) — UARP-AI

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: presenta el microservicio de IA y su integración con el backend, evidenciando arquitectura por componentes.

---

## 🎓 Contexto Académico y Propósito / Academic Context & Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este módulo demuestra integración de un servicio Python con un sistema web (backend Node + frontend React), aportando analítica/predicción y tolerancia a fallos (fallback cuando no hay modelo).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This module demonstrates integrating a Python service into a web system (Node backend + React frontend), adding analytics/prediction and fault tolerance (fallback when no model is available).

---

## 🧭 Visión General / Overview
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Servicio Flask para análisis de datos y panel de IA. Expone `/ia-panel` para sugerencias, anomalías y predicciones (según implementación/modelo).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Flask service for data analysis and AI panel. Exposes `/ia-panel` for suggestions, anomalies, and predictions (depending on implementation/model).

---

## ✨ Características / Features
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- API REST (Flask)
- Análisis de datos y predicción (demo)
- Integración con backend Node.js
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- REST API (Flask)
- Data analysis and prediction (demo)
- Node.js backend integration

---

## 🧱 Estructura / Structure
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- `db_config.py`: configuración de DB
- `ia_panel.py`: lógica principal del panel
- `inspect_db.py`: inspección/análisis de DB
- `seed_ia_panel.py`: seed de datos IA
- `test_db_connection.py`: verificación de conectividad
- `train_ia_model.py`: entrenamiento demo
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- `db_config.py`: DB config
- `ia_panel.py`: main panel logic
- `inspect_db.py`: DB inspection/analysis
- `seed_ia_panel.py`: AI data seeding
- `test_db_connection.py`: connectivity test
- `train_ia_model.py`: demo training

---

## 🛠️ Configuración (Local) / Setup (Local)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
1. Instala dependencias: `pip install -r requirements.txt` (si aplica).
2. (Opcional) Define `PORT=5001` si deseas cambiar el puerto.
3. Inicia: `python ia_panel.py`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
1. Install dependencies: `pip install -r requirements.txt` (if applicable).
2. (Optional) Set `PORT=5001` to change the port.
3. Start: `python ia_panel.py`.

---

## 🐳 Docker / Compose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Se construye con `ia/Dockerfile` y expone el puerto 5001.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Built with `ia/Dockerfile` and exposes port 5001.

---

## 🔧 Variables de Entorno / Env Vars
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** `PORT` (default: 5001).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** `PORT` (default: 5001).

---

## 🧠 Modelo / Model
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Entrenamiento demo: `python train_ia_model.py` genera `ia_model.pkl`.
- El endpoint carga `ia_model.pkl`; si no existe, puede responder error 500 y el frontend muestra un fallback.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Demo training: `python train_ia_model.py` generates `ia_model.pkl`.
- The endpoint loads `ia_model.pkl`; if missing, it may return 500 and the frontend shows a fallback.

---

## 🧩 Integración (Backend) / Integration (Backend)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Verifica que el backend apunte a este servicio vía `IA_PANEL_URL` (por defecto `http://ia-panel:5001/ia-panel` en Docker).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Ensure the backend points to this service via `IA_PANEL_URL` (default `http://ia-panel:5001/ia-panel` in Docker).

---

## 🩺 Troubleshooting
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Revisa logs de Flask y valida conectividad desde el backend.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Check Flask logs and validate connectivity from the backend.