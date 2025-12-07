# Dockerfile para el servicio Flask IA Panel
FROM python:3.11-slim
WORKDIR /app
COPY ia_panel.py ./
RUN pip install flask
EXPOSE 5001
CMD ["python", "ia_panel.py"]
