# Dockerfile para el servicio Flask IA Panel
FROM python:3.11-slim
WORKDIR /app

# Dependencias necesarias para el panel IA
RUN pip install --no-cache-dir flask pandas scikit-learn

# Código y modelo
COPY ia_panel.py ./
COPY ia_model.pkl ./

EXPOSE 5001
CMD ["python", "ia_panel.py"]
