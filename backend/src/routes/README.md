
# 🧭 Routes / Routes

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe la capa de rutas HTTP del backend y su relación con middleware y controladores.

---

## 📌 Propósito / Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este directorio contiene rutas REST por módulo. Las rutas aplican middleware (auth/permisos/auditoría) y delegan al controlador.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This folder contains REST routes per module. Routes apply middleware (auth/permissions/audit) and delegate to controllers.

---

## 🧪 Ejemplo / Example
```js
// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
// ...other endpoints

module.exports = router;
```

---

<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Mantén rutas simples y delega lógica al controlador. Documenta endpoints en `docs/api.md`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Keep routes simple and delegate logic to controllers. Document endpoints in `docs/api.md`.

## 📋 Política de Documentación y Trazabilidad / Documentation & Traceability Policy
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
Cada cambio funcional, técnico o de seguridad realizado en las rutas será documentado en el changelog ([../../../docs/CHANGELOG.md](../../../docs/CHANGELOG.md)) y en los archivos relevantes. Esto garantiza trazabilidad y evidencia para la evaluación académica y profesional.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Every functional, technical, or security change made to the routes will be documented in the changelog ([../../../docs/CHANGELOG.md](../../../docs/CHANGELOG.md)) and in the relevant files. This ensures traceability and evidence for academic and professional evaluation.