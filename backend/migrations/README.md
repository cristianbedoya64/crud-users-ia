# 🗃️ Migraciones (Backend) / Migrations (Backend)

> **Trabajo de Grado – Facultad de Ingeniería**<br>
> **Universidad Santiago de Cali**<br>
> **Enfoque:** propuesta de investigación aplicada con IA para scoring de riesgo.<br>
>
> Documento técnico orientado a evaluación académica: describe cómo se versionan cambios de esquema (PostgreSQL) para garantizar reproducibilidad y trazabilidad.

---

## 🎓 Contexto Académico y Propósito / Academic Context & Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Las migraciones son evidencia de control de cambios en el modelo de datos (evolución del sistema con consistencia).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Migrations provide evidence of change control for the data model (consistent evolution over time).

---

## ▶️ Ejecución / Execution
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Ejecuta migraciones con el script del backend (ver `src/migrate.js`) o mediante el flujo de despliegue documentado.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Run migrations using the backend script (see `src/migrate.js`) or via the documented deployment flow.

---

<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Mantén nombres con prefijo de fecha (`YYYYMMDD-...`) y una intención clara del cambio.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Keep date-prefixed filenames (`YYYYMMDD-...`) with a clear intent.

## 📋 Política de Documentación y Trazabilidad / Documentation & Traceability Policy
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
Cada cambio funcional, técnico o de seguridad realizado en las migraciones será documentado en el changelog ([../../docs/CHANGELOG.md](../../docs/CHANGELOG.md)) y en los archivos relevantes. Esto garantiza trazabilidad y evidencia para la evaluación académica y profesional.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Every functional, technical, or security change made to the migrations will be documented in the changelog ([../../docs/CHANGELOG.md](../../docs/CHANGELOG.md)) and in the relevant files. This ensures traceability and evidence for academic and professional evaluation.
