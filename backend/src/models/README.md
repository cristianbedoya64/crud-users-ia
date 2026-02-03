
# 🗃️ Models (Sequelize) / Models (Sequelize)

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe la capa de persistencia del backend (modelos Sequelize y relaciones).

---

## 📌 Propósito / Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Aquí se definen los modelos Sequelize que representan tablas. Cada archivo corresponde a una entidad y especifica campos/validaciones; relaciones se centralizan en `index.js`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Sequelize models representing tables live here. Each file defines an entity’s fields/validation; relationships are typically centralized in `index.js`.

---

## 🧪 Ejemplo / Example
```js
// User.js
module.exports = (sequelize, DataTypes) => {
	return sequelize.define('User', {
		id: { type: DataTypes.INTEGER, primaryKey: true },
		name: DataTypes.STRING,
		// ...other fields
	});
};
```

---

<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Mantén los modelos simples y usa migraciones para cambios controlados. Define asociaciones en `index.js`.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Keep models simple and use migrations for controlled changes. Define associations in `index.js`.

## 📋 Política de Documentación y Trazabilidad / Documentation & Traceability Policy
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:**
Cada cambio funcional, técnico o de seguridad realizado en los modelos será documentado en el changelog ([../../../docs/CHANGELOG.md](../../../docs/CHANGELOG.md)) y en los archivos relevantes. Esto garantiza trazabilidad y evidencia para la evaluación académica y profesional.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:**
Every functional, technical, or security change made to the models will be documented in the changelog ([../../../docs/CHANGELOG.md](../../../docs/CHANGELOG.md)) and in the relevant files. This ensures traceability and evidence for academic and professional evaluation.