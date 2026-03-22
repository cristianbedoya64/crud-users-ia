# UARP-IA — Propuesta de Investigación y Desarrollo Tecnológico 🚀

> **Trabajo de Grado – Facultad de Ingeniería**<br>
> **Universidad Santiago de Cali**<br>
> **Enfoque:** optimización de la seguridad en el registro de usuarios mediante capas predictivas de riesgo.<br>
> **Estado:** prueba de concepto desplegada en `iausers.me`.

---

## Título del Proyecto (Grado)
**UARP-IA: Microservicio de Scoring de Riesgo con IA para Fintechs Colombianas, integrado a un sistema RBAC de gestión de usuarios.**

## Resumen Técnico
UARP-IA es una propuesta de investigación aplicada que parte de un sistema funcional de gestión de usuarios con RBAC, autenticación JWT y auditoría. Sobre esta base se proyecta un microservicio de scoring de riesgo con IA (Random Forest) para apoyar el registro seguro, la detección de identidades sintéticas y el control preventivo de fraude, manteniendo trazabilidad operativa y gobernanza de permisos.

## Stack Tecnológico
- **FastAPI** (microservicio de scoring de riesgo, fase de grado)
- **Docker** (orquestación y despliegue reproducible)
- **SQL/PostgreSQL** (persistencia y auditoría)
- Node.js/Express (backend actual)
- React/Vite (frontend actual)
- Python (prototipo IA vigente)

## Estado Actual
- Prototipo al 50% con RBAC funcional, JWT y auditoría de acciones.
- Panel de IA existente como prueba de concepto y punto de integración.
- Despliegue demostrativo en `iausers.me`.

## Alcance de la Fase de Grado
- Microservicio de **scoring de riesgo** con **Random Forest**.
- Validación de identidades sintéticas con aprendizaje supervisado.
- Integración con RBAC para restringir consumo de predicciones por rol.
- Evidencia experimental y métricas de desempeño para Fintechs colombianas.

---

## Estructura del Proyecto
```shell
/backend   # API Node.js/Express/Sequelize
/frontend  # SPA React/Vite/Tailwind
/ia        # Microservicio IA Python (PoC)
/docs      # Documentación técnica
```

---

## Documentación Técnica
- [Resumen Ejecutivo](docs/Resumen_Ejecutivo.md)
- [Alcance y Límites](docs/Alcance_y_Limites.md)
- [API](docs/api.md)
- [Base de datos](docs/db.md)
- [Seguridad](docs/security.md)
- [Microservicio de Scoring de Riesgo](docs/risk_scoring_microservice.md)
- [Despliegue](docs/DEPLOY.md)
- [Backup/Restore](docs/RESTORE_BACKUP.md)
- [Lighthouse](docs/lighthouse.md)
- [Trazabilidad de IA](docs/ai_traceability/README.md)
- [Uso de IA (Copilot)](docs/ai_assistance.md)
- [Changelog](docs/CHANGELOG.md)

---

## Política de Documentación y Trazabilidad
Cada cambio funcional, técnico o de seguridad se documenta en el changelog y en los archivos relevantes. Cuando existan prompts relevantes, se registra la trazabilidad en [docs/ai_traceability/README.md](docs/ai_traceability/README.md).
