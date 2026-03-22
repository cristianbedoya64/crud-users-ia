# ANTEPROYECTO_DRAFT

> **Trabajo de Grado – Facultad de Ingenieria**
> **Universidad Santiago de Cali**
> **Proyecto:** UARP-IA (Propuesta de Investigacion y Desarrollo Tecnologico)
> **Estado:** prueba de concepto desplegada en `iausers.me`.

---

## Planteamiento del Problema
La seguridad en el registro de usuarios es un desafio central para plataformas financieras digitales. La creciente sofisticacion de identidades sinteticas y patrones de fraude exige mecanismos preventivos que superen el control de acceso tradicional. En entornos Fintech colombianos, los procesos de onboarding requieren trazabilidad, control de privilegios y una evaluacion temprana del riesgo para evitar la incorporacion de usuarios maliciosos sin afectar la experiencia legitima.

Actualmente, el sistema UARP-IA dispone de un backend funcional con autenticacion JWT, RBAC por roles y permisos, y auditoria de acciones. Esta base garantiza gobernanza y trazabilidad, pero no ofrece una capa predictiva que permita anticipar riesgo en el registro. La ausencia de una capacidad de scoring limita la deteccion temprana y obliga a depender de validaciones posteriores o revisiones manuales.

En este contexto, se plantea la necesidad de integrar un microservicio de scoring de riesgo con IA, basado en Random Forest, que permita estimar la probabilidad de riesgo durante el registro. Esta capa debe operar como complemento al RBAC existente, controlando el acceso a las predicciones por permisos y registrando cada consulta para trazabilidad institucional.

---

## Justificacion
La propuesta aporta valor academico y tecnologico al combinar un sistema RBAC operativo con un componente de inteligencia artificial para scoring de riesgo. Esta sinergia permite investigar como modelos supervisados pueden reforzar la seguridad en el registro de usuarios sin sustituir los controles de acceso, sino extendiendolos con analitica predictiva.

El proyecto es viable porque parte de un prototipo desplegado (iausers.me) que ya incorpora autenticacion, auditoria y roles. Esto reduce la incertidumbre tecnica y habilita un entorno realista para experimentacion, medicion de metricas y validacion de hipotesis. La eleccion de Random Forest responde a su interpretabilidad, rendimiento y estabilidad en escenarios con variables tabulares, comunes en procesos de verificacion de identidad.

Desde la perspectiva de impacto, el microservicio de scoring puede contribuir a disminuir riesgos de fraude y a fortalecer la toma de decisiones en el onboarding, manteniendo trazabilidad y control por permisos. En el plano academico, la propuesta permite evaluar resultados medibles (precision, recall, AUC, falsos positivos) y generar evidencia de investigacion aplicada en un entorno con demanda real.

---

## Objetivo General
Disenar e integrar un microservicio de scoring de riesgo con IA (Random Forest) para fortalecer la seguridad en el registro de usuarios, complementando el sistema RBAC existente y garantizando trazabilidad y control de acceso.

## Objetivos Especificos
1. Caracterizar el proceso de registro de usuarios y definir el conjunto de variables predictivas (features) alineadas con escenarios Fintech colombianos.
2. Construir y entrenar un modelo Random Forest para estimar riesgo de registro, con enfoque en interpretabilidad y estabilidad.
3. Implementar el microservicio de scoring en FastAPI e integrarlo con el backend mediante endpoints controlados por permisos.
4. Definir el esquema de auditoria y versionamiento del modelo para asegurar trazabilidad de cada consulta y reproducibilidad experimental.
5. Evaluar el desempeno del modelo con metricas de clasificacion (precision, recall, F1, AUC-ROC) y analisis de falsos positivos/negativos.

---

## Metodologia
La metodologia se organiza en fases iterativas con entregables verificables:

1. **Analisis y requisitos**
	- Levantamiento del flujo de registro actual y criterios de riesgo.
	- Definicion de variables de entrada y reglas de calidad de datos.

2. **Ingenieria de datos**
	- Construccion del dataset experimental (limpieza, balanceo, normalizacion).
	- Definicion de splits de entrenamiento/validacion/prueba.

3. **Modelado y entrenamiento**
	- Entrenamiento de Random Forest y ajuste de hiperparametros.
	- Seleccion del modelo con base en metricas y estabilidad.

4. **Implementacion del microservicio**
	- Desarrollo del endpoint de scoring en FastAPI.
	- Exposicion de metadatos de versionamiento y salud del servicio.

5. **Integracion con RBAC y auditoria**
	- Integracion via backend con permisos `view_risk_score` y `manage_risk_models`.
	- Registro de auditoria por solicitud (request_id, userId, risk_level).

6. **Validacion y evaluacion**
	- Pruebas funcionales de integracion end-to-end.
	- Evaluacion cuantitativa del modelo (precision, recall, F1, AUC-ROC).

7. **Documentacion y resultados**
	- Documentacion tecnica del microservicio y protocolo experimental.
	- Analisis de resultados y recomendaciones de mejora.

---

## Esquema de Metricas y Plan Experimental

### 1) Dataset
- **Origen:** registros de onboarding y variables KYC simuladas/anonimizadas (entorno controlado).
- **Balanceo:** aplicar estrategias de submuestreo o sobre-muestreo para mitigar desbalance entre clases de riesgo.
- **Calidad:** verificacion de valores fuera de rango, nulos y duplicados; normalizacion de variables continuas.
- **Particiones:** 70% entrenamiento, 15% validacion, 15% prueba (estratificado por clase).

### 2) Validacion
- **Validacion cruzada:** k-fold (k=5) en entrenamiento para estabilidad.
- **Seleccion de modelo:** comparar variaciones de hiperparametros y elegir el mejor en validacion.
- **Reproducibilidad:** fijar semilla aleatoria y registrar `model_version`.

### 3) Metricas de desempeno
- **AUC-ROC:** capacidad de separacion entre clases de riesgo.
- **Precision/Recall/F1:** equilibrio entre falsos positivos y falsos negativos.
- **Matriz de confusion:** analisis de errores por clase.
- **Tasa de falsos negativos (FNR):** prioridad en riesgos altos.

### 4) Analisis de resultados
- Comparar resultados por segmento (canal, perfil, antiguedad).
- Revisar importancias de features para interpretabilidad.
- Identificar thresholds de decision para niveles low/medium/high.

### 5) Entregables experimentales
- Dataset documentado (diccionario de variables).
- Reporte de metricas (AUC-ROC, precision, recall, F1).
- Curva ROC y tabla de umbrales.
- Informe de errores y recomendaciones.

---

## Declaracion de Asistencia con IA
Este proyecto se desarrollo con apoyo de asistencia de IA (GitHub Copilot) en tareas de redaccion, documentacion y soporte tecnico, bajo validacion y decision final del autor. La politica de transparencia y trazabilidad se documenta en [docs/ai_assistance.md](docs/ai_assistance.md).
