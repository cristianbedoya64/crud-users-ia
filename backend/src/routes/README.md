
# Routes

Este directorio contiene las rutas REST para cada módulo funcional. Cada archivo expone los endpoints HTTP y conecta con el controlador correspondiente.

## Ejemplo
```js
// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', userController.getUsers);
router.post('/', userController.createUser);
// ...otros endpoints

module.exports = router;
```

## Recomendaciones
Mantén las rutas simples y delega la lógica al controlador. Documenta los endpoints principales.