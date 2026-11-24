# Dockerfile para el servicio Flask IA Panel
FROM python:3.11-slim
WORKDIR /app

# Dependencias necesarias para el panel IA
RUN pip install --no-cache-dir flask pandas scikit-learn

# Código y entrenamiento del modelo dentro de la imagen
# (así el modelo siempre coincide con la versión de scikit-learn instalada)
COPY ia_panel.py train_ia_model.py ./
RUN python train_ia_model.py

EXPOSE 5001
CMD ["python", "ia_panel.py"]
