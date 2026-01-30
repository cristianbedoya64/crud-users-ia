
# 🧠 Controllers / Controllers

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: define la responsabilidad de los controladores como capa de orquestación de casos de uso.

---

## 📌 Propósito / Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Este directorio contiene la lógica de negocio por módulo (Users, Roles, Permissions, Auth, Audit). Los controladores reciben `req/res` y coordinan modelos/servicios.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** This folder contains per-module business logic (Users, Roles, Permissions, Auth, Audit). Controllers handle `req/res` and coordinate models/services.

---

## 🧪 Ejemplo / Example
```js
// userController.js
exports.createUser = async (req, res) => {
	/* ... */
};
```

---

## ✅ Recomendaciones / Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Mantén los controladores delgados: validación, orquestación y respuesta HTTP. Evita lógica de presentación.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Keep controllers thin: validation, orchestration, and HTTP responses. Avoid presentation logic.