

# 📚 Documentación Técnica

## 📋 Política de Documentación y Trazabilidad / Documentation & Traceability Policy
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
Cada cambio funcional, técnico o de seguridad realizado en la documentación será documentado en el changelog ([CHANGELOG.md](CHANGELOG.md)) y en los archivos relevantes. Esto garantiza trazabilidad y evidencia para la evaluación académica y profesional.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Every functional, technical, or security change made to the documentation will be documented in the changelog ([CHANGELOG.md](CHANGELOG.md)) and in the relevant files. This ensures traceability and evidence for academic and professional evaluation.

> **Trabajo de Grado – Facultad de Ingeniería**<br>
> **Universidad Santiago de Cali**<br>
> **Enfoque:** optimización de la seguridad en el registro de usuarios mediante capas predictivas de riesgo.<br>
>
> Este índice organiza la documentación de la propuesta de investigación y desarrollo tecnológico, facilitando la revisión académica y la trazabilidad técnica.

---

## 🧭 Enfoque de investigación (problema → solución → valor)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
La seguridad en el registro de usuarios requiere mecanismos preventivos que complementen el RBAC con análisis predictivo de riesgo. Esta propuesta integra un sistema funcional de roles y permisos con un microservicio de scoring de riesgo (Random Forest) para apoyar la detección de identidades sintéticas y reducir exposición a fraude, manteniendo trazabilidad y control de acceso.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
User onboarding security benefits from preventive mechanisms that complement RBAC with predictive risk analysis. This proposal integrates a functional roles/permissions system with a risk-scoring microservice (Random Forest) to support synthetic-identity detection while preserving traceability and access control.

---

## 🎓 Contexto Académico / Academic Context
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este repositorio corresponde a una propuesta de investigación y desarrollo tecnológico (Trabajo de Grado) en Ingeniería de Sistemas. La documentación presenta evidencia técnica del prototipo actual y del plan de ampliación hacia un microservicio de IA para scoring de riesgo.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This repository is a research and technological development proposal (degree thesis). The documentation provides technical evidence of the current prototype and the plan to extend it with an AI risk-scoring microservice.

---

## 🗂️ Índice / Index
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- [API](api.md)
- [Base de datos](db.md)
- [Seguridad y configuración](security.md)
- [Microservicio de Scoring de Riesgo](risk_scoring_microservice.md)
- [Uso de IA (Copilot)](ai_assistance.md)
- [Trazabilidad de Prompts (IA)](ai_traceability/README.md)
- [Despliegue DigitalOcean](DEPLOY.md)
- [Backup y actualización](RESTORE_BACKUP.md)
- [Changelog de docs](CHANGELOG.md)
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- [API](api.md)
- [Database](db.md)
- [Security and configuration](security.md)
- [DigitalOcean deployment](DEPLOY.md)
- [Backup and update](RESTORE_BACKUP.md)
- [Docs changelog](CHANGELOG.md)

---

## ✅ Recomendaciones / Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Revisa estos documentos antes de cambios de arquitectura o despliegues.
- Mantén este índice actualizado al agregar nuevos documentos.
- Prioriza coherencia: variables de entorno, puertos y rutas deben coincidir con `docker-compose.yml` y los módulos.
- Cuando los cambios impliquen prompts relevantes, registra la trazabilidad en [ai_traceability/README.md](ai_traceability/README.md).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Review these documents before architecture changes or deployments.
- Keep this index updated when adding new documents.
- Keep consistency: env vars, ports, and routes must match `docker-compose.yml` and the modules.
- When changes involve relevant prompts, record traceability in [ai_traceability/README.md](ai_traceability/README.md).
