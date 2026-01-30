
# 🧱 Layouts / Layouts

> **Proyecto de Grado – Ingeniería de Sistemas (Modalidad Virtual)**<br>
> **Universidad Santiago de Cali**<br>
> **Destinatario:** Jueces evaluadores del “proyecto integrador profesional”<br>
>
> Documento técnico orientado a evaluación académica: describe los layouts que estandarizan estructura visual y navegación.

---

## 📌 Propósito / Purpose
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Los layouts definen estructura común (navegación/header/contenedor) para reutilizar entre vistas y mantener consistencia.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Layouts define shared structure (navigation/header/container) to keep views consistent and reusable.

---

## 🧪 Ejemplo / Example
```jsx
// MantineLayout.jsx
export default function MantineLayout({ children }) {
	return <div>{children}</div>;
}
```

---

## ✅ Recomendaciones / Recommendations
<img src="https://flagcdn.com/es.svg" alt="Español" width="20" height="13"> **Español:** Evita lógica de negocio en layouts; prioriza composición UI y navegación.
<br><br>
<img src="https://flagcdn.com/us.svg" alt="English" width="20" height="13"> **English:** Avoid business logic in layouts; focus on UI composition and navigation.
