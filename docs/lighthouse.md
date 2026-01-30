
# 🧪 Lighthouse (Mobile y Desktop) / Lighthouse (Mobile & Desktop)

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe el proceso de auditoría del frontend con Lighthouse CI para evidenciar métricas de rendimiento, accesibilidad y buenas prácticas.

---

## 🎓 Contexto Académico y Destinatario / Academic Context & Audience
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este documento sirve como evidencia de calidad del frontend mediante métricas objetivas (Performance/Accessibility/Best Practices/SEO) y umbrales verificables.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This document provides evidence of frontend quality through objective metrics and enforceable thresholds.

---

## ✅ Requisitos / Requirements
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- El frontend debe estar corriendo en `http://localhost:5173`.
- Ejecutar comandos desde la carpeta `frontend/`.
- Lighthouse usa Chromium embebido vía Puppeteer (no requiere Chrome del sistema).
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- The frontend must be running at `http://localhost:5173`.
- Run commands from the `frontend/` folder.
- Lighthouse uses an embedded Chromium via Puppeteer (no system Chrome required).

---

## ▶️ Ejecutar Auditorías / Run Audits
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
- Ejecuta:
```bash
npm run lighthouse
```

Si el frontend no está en localhost, define la URL:
```bash
LHCI_URL=https://<tu-codespace>-5173.app.github.dev npm run lighthouse
```

Este comando ejecuta dos auditorías:
- Modo móvil (preset: `mobile`)
- Modo escritorio (preset: `desktop`)

Los reportes se guardan en:
- `frontend/lighthouse-reports/mobile`
- `frontend/lighthouse-reports/desktop`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
- Run:
```bash
npm run lighthouse
```

If the frontend is not on localhost, set the URL:
```bash
LHCI_URL=https://<your-codespace>-5173.app.github.dev npm run lighthouse
```

This command runs two audits:
- Mobile mode (preset: `mobile`)
- Desktop mode (preset: `desktop`)

Reports are stored in:
- `frontend/lighthouse-reports/mobile`
- `frontend/lighthouse-reports/desktop`

---

## 📊 Qué métricas incluye / Included Metrics
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Lighthouse reporta cuatro categorías principales:
- Performance
- Accessibility
- Best Practices
- SEO
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Lighthouse reports four main categories:
- Performance
- Accessibility
- Best Practices
- SEO

---

## ⚠️ Umbrales Recomendados (warnings) / Recommended Thresholds (warnings)
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Los umbrales actuales están definidos en:
- `frontend/lighthouserc.mobile.cjs`
- `frontend/lighthouserc.desktop.cjs`
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Current thresholds are defined in:
- `frontend/lighthouserc.mobile.cjs`
- `frontend/lighthouserc.desktop.cjs`

---

## 🧾 Ejemplo de lectura del reporte / Report Reading Example
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Cada reporte contiene un archivo HTML y JSON. En el HTML verás un resumen con las puntuaciones de cada categoría.
Ejemplo (ficticio):
- Performance: 0.86
- Accessibility: 0.94
- Best Practices: 0.92
- SEO: 0.88

Si algún umbral no se cumple, Lighthouse CI mostrará una advertencia en consola.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Each report includes an HTML and a JSON file. The HTML shows a summary with category scores.
Example (fictional):
- Performance: 0.86
- Accessibility: 0.94
- Best Practices: 0.92
- SEO: 0.88

If any threshold is not met, Lighthouse CI will show a warning in the console.
