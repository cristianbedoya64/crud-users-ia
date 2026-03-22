# ✅ Criterios de cierre (Prototipo)

**Fecha:** 2026‑02‑04  
**Tag de referencia:** `defense-2026-02-04`

---

## 1) Ensayo cold start (2 veces)
**Método:** `docker compose down -v` + `time RUN_MODE=local scripts/start.sh`

| Ensayo | Duración (real) | Resultado |
|---|---|---|
| #1 | 1m24.380s | OK |
| #2 | 1m18.266s | OK |

**Evidencia operacional:** [scripts/start.sh](scripts/start.sh), [docs/DEPLOY.md](docs/DEPLOY.md)

---

## 2) DoD mínima

- [x] **No se filtran secretos/contraseñas**
  - Evidencia: [docs/security.md](docs/security.md), [backend/tests/api.test.js](backend/tests/api.test.js)
- [x] **Backend levanta siempre y health responde**
  - Evidencia: [backend/src/server.js](backend/src/server.js), [docs/DEPLOY.md](docs/DEPLOY.md)
- [x] **Auditoría y RBAC coherentes**
  - Evidencia: [backend/src/middleware/logFailedAccess.js](backend/src/middleware/logFailedAccess.js), [backend/src/middleware/permission.js](backend/src/middleware/permission.js)
- [x] **Pruebas pasan**
  - Evidencia: [backend/tests/api.test.js](backend/tests/api.test.js)
- [x] **Docs reproducibles**
  - Evidencia: [docs/PAQUETE_JURADO.md](docs/PAQUETE_JURADO.md), [docs/DEPLOY.md](docs/DEPLOY.md)
- [x] **Plan de validación con fallback**
  - Evidencia: [docs/DEFENSA_DEMO_QA.md](docs/DEFENSA_DEMO_QA.md)

---

## 3) Estado de cierre
- Versión congelada con tag `defense-2026-02-04`.
- Cold start ejecutado 2 veces con tiempos registrados.
- DoD cumplida con evidencia en repo.
