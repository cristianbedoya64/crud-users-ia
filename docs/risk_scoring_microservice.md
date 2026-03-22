# Microservicio de Scoring de Riesgo (IA)

> **Trabajo de Grado – Facultad de Ingenieria**<br>
> **Universidad Santiago de Cali**<br>
> **Enfoque:** scoring de riesgo con IA integrado a RBAC.

---

## 1) Proposito y Alcance
El microservicio de scoring de riesgo estima la probabilidad de riesgo durante el registro de usuarios. Su funcion es preventiva y complementa el RBAC existente, sin reemplazarlo. Opera como servicio aislado (FastAPI), consumido solo por el backend.

---

## 2) Endpoints
### 2.1 POST `/risk-score`
**Auth:** gestionada por el backend. El microservicio no expone autenticacion propia.  
**Request (JSON):**
```json
{
  "features": {
    "document_validity_score": 0.92,
    "document_age_days": 120,
    "email_domain_reputation": 0.85,
    "email_age_days": 430,
    "phone_line_age_days": 980,
    "ip_risk_score": 0.12,
    "device_trust_score": 0.78,
    "velocity_24h": 2,
    "kyc_flags": 0,
    "prior_rejection_count": 0
  },
  "metadata": {
    "request_id": "REQ-2026-0001",
    "model_version": "rf-1.0.0",
    "source_channel": "web"
  }
}
```

**Response (JSON):**
```json
{
  "score": 0.18,
  "risk_level": "low",
  "explanation": [
    { "feature": "ip_risk_score", "impact": 0.12 },
    { "feature": "document_validity_score", "impact": -0.08 }
  ],
  "model_version": "rf-1.0.0",
  "request_id": "REQ-2026-0001"
}
```

### 2.2 GET `/health`
- Respuesta 200 si el servicio esta operativo.

### 2.3 GET `/ready`
- Respuesta 200 si el modelo esta cargado y listo para inferencia.

---

## 3) Esquema de Features (Entrada)
**Convencion:** todas las features numericas, normalizadas a rangos 0-1 cuando aplique.

| Feature | Tipo | Rango | Fuente | Descripcion |
|---|---|---|---|---|
| `document_validity_score` | float | 0-1 | KYC | Validez del documento (OCR/validacion). |
| `document_age_days` | int | >=0 | KYC | Antiguedad del documento. |
| `email_domain_reputation` | float | 0-1 | OSINT | Reputacion del dominio de correo. |
| `email_age_days` | int | >=0 | OSINT | Antiguedad del correo. |
| `phone_line_age_days` | int | >=0 | Telco | Antiguedad de la linea. |
| `ip_risk_score` | float | 0-1 | Fraud intel | Riesgo del IP. |
| `device_trust_score` | float | 0-1 | Device | Confianza del dispositivo. |
| `velocity_24h` | int | >=0 | Sistema | Intentos de registro en 24h. |
| `kyc_flags` | int | >=0 | KYC | Numero de banderas de KYC. |
| `prior_rejection_count` | int | >=0 | Sistema | Rechazos previos asociados. |

**Metadatos opcionales:** `request_id`, `model_version`, `source_channel`.

---

## 4) Metricas y Evaluacion
**Metricas de clasificacion:**
- Precision, recall, F1
- AUC-ROC
- Matriz de confusion

**Criterios de evaluacion:**
- Reduccion de falsos negativos en registros de alto riesgo.
- Control de falsos positivos para minimizar friccion.
- Estabilidad de modelo frente a drift del dataset.

---

## 5) Governance y Seguridad
- El microservicio no se expone publicamente; se consume via backend.
- Acceso a scoring controlado por permiso `view_risk_score`.
- Operaciones de versionamiento del modelo controladas por `manage_risk_models` (propuesto).
- Todas las consultas deben registrarse en auditoria con `request_id`, `risk_level` y `userId`.
- No se persisten datos sensibles en el microservicio; solo telemetria tecnica.

---

## 6) Integracion con RBAC
El backend actua como proxy y aplica permisos antes de llamar al microservicio. La respuesta del scoring se integra al flujo de registro sin reemplazar el control de acceso.

---

## 7) Limitaciones
- El dataset y la validacion de identidades sinteticas forman parte de la investigacion.
- El scoring no toma decisiones automaticas de bloqueo sin validacion adicional.

---

## 8) Roadmap
- Definir dataset y estrategia de balanceo.
- Entrenamiento Random Forest con explicabilidad (top features).
- Despliegue en FastAPI y documentacion de versionado.
- Experimentos controlados con metricas reproducibles.
