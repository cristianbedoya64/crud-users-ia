# Lighthouse (mobile y desktop)

## Requisitos
- La app frontend debe estar corriendo en http://localhost:5173
- Ejecutar desde la carpeta frontend.
- Lighthouse usa Chromium embebido vía Puppeteer (no requiere Chrome del sistema).

## Ejecutar auditorías
- `npm run lighthouse`

Si el frontend no está en localhost, define la URL:
- `LHCI_URL=https://<tu-codespace>-5173.app.github.dev npm run lighthouse`

Este comando ejecuta dos auditorías:
- Modo móvil (preset: mobile)
- Modo escritorio (preset: desktop)

Los reportes se guardan en:
- frontend/lighthouse-reports/mobile
- frontend/lighthouse-reports/desktop

## Qué métricas incluye
Lighthouse reporta cuatro categorías principales:
- Performance
- Accessibility
- Best Practices
- SEO

## Umbrales recomendados (warnings)
Los umbrales actuales están definidos en:
- frontend/lighthouserc.mobile.cjs
- frontend/lighthouserc.desktop.cjs

## Ejemplo de lectura del reporte
Cada reporte contiene un archivo HTML y JSON. En el HTML verás un resumen con las puntuaciones de cada categoría.
Ejemplo (ficticio):
- Performance: 0.86
- Accessibility: 0.94
- Best Practices: 0.92
- SEO: 0.88

Si algún umbral no se cumple, Lighthouse CI mostrará una advertencia en consola.
