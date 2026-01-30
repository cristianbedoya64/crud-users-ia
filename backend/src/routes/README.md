
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

## ✅ Recomendaciones / Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Mantén rutas simples y delega lógica al controlador. Documenta endpoints en `docs/api.md`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Keep routes simple and delegate logic to controllers. Document endpoints in `docs/api.md`.