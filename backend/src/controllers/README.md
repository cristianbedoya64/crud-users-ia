
# Controllers

Este directorio contiene la lógica de negocio para cada entidad del sistema. Cada archivo implementa las funciones CRUD y otras operaciones específicas para su módulo (Users, Roles, Permissions, etc.).

## Ejemplo de uso
Cada controlador expone funciones para ser utilizadas por las rutas HTTP. Ejemplo:

```js
// userController.js
exports.createUser = async (req, res) => { /* ... */ };
```

## Recomendaciones
Mantén la lógica desacoplada y reutilizable. Evita lógica de presentación aquí.