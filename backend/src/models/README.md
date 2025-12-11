
# Models

Aquí se definen los modelos Sequelize que representan las tablas de la base de datos. Cada archivo corresponde a una entidad y especifica sus campos y relaciones.

## Ejemplo
```js
// User.js
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('User', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING,
		// ...otros campos
	});
};
```

## Recomendaciones
Define relaciones entre modelos en `index.js`. Mantén los modelos simples y enfocados en la estructura de datos.