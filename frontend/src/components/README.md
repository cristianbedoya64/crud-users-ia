
# 🧱 Components / Components

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe componentes UI reutilizables, evidenciando modularidad y mantenibilidad.

---

## 📌 Propósito / Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este directorio contiene componentes reutilizables del frontend, típicamente organizados por tipo:
- `forms/`: formularios para entrada/edición
- `tables/`: tablas para listados
- `modals/`: confirmaciones/edición/visualización
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This folder contains reusable frontend components, typically grouped by type:
- `forms/`: input/edit forms
- `tables/`: list tables
- `modals/`: confirmations/editing/detail views

---

## 🧪 Ejemplo / Example
```jsx
// DashboardSummary.jsx
export default function DashboardSummary({ totals }) {
	return <div>{/* ... */}</div>;
}
```

---

<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Mantén componentes desacoplados y documenta props relevantes. Evita mezclar UI con lógica de autenticación/permiso.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Keep components decoupled and document relevant props. Avoid mixing UI with auth/permission logic.

## 📋 Política de Documentación y Trazabilidad / Documentation & Traceability Policy
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
Cada cambio funcional, técnico o de seguridad realizado en los componentes será documentado en el changelog ([../../../docs/CHANGELOG.md](../../../docs/CHANGELOG.md)) y en los archivos relevantes. Esto garantiza trazabilidad y evidencia para la evaluación académica y profesional.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Every functional, technical, or security change made to the components will be documented in the changelog ([../../../docs/CHANGELOG.md](../../../docs/CHANGELOG.md)) and in the relevant files. This ensures traceability and evidence for academic and professional evaluation.
