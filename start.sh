#!/usr/bin/env bash
set -euo pipefail

# Arranca todos los servicios en segundo plano (incluye override de desarrollo si existe)
DockerComposeCmd="docker compose"
${DockerComposeCmd} up -d --build

# Si estamos en Codespaces, expone puertos para evitar bloqueos/CORS por túnel privado
if [[ -n "${CODESPACE_NAME:-}" ]]; then
  gh codespace ports visibility 3000:public 5173:public 5001:public -c "$CODESPACE_NAME" || true
  echo "Ports 3000, 5173, 5001 set to public for codespace $CODESPACE_NAME"
fi

echo "Services up. Frontend: http://localhost:5173 | Backend: http://localhost:3000 | IA: http://localhost:5001"
