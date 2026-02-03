#!/usr/bin/env bash
set -euo pipefail

# Arranca todos los servicios en segundo plano (incluye override de desarrollo si existe)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
DockerComposeCmd="docker compose"
pushd "$ROOT_DIR" > /dev/null
${DockerComposeCmd} up -d --build

# Ejecuta seed para asegurar credenciales y datos demo
set +e
seed_ok=0
for i in {1..10}; do
  ${DockerComposeCmd} exec -T backend node src/seed.js
  if [[ $? -eq 0 ]]; then
    seed_ok=1
    echo "Seed completado."
    break
  fi
  echo "Seed falló (intento $i/10). Reintentando en 3s..."
  sleep 3
done
set -e
if [[ $seed_ok -ne 1 ]]; then
  echo "No se pudo ejecutar el seed automáticamente. Revisa el backend/logs."
fi

# Si estamos en Codespaces, expone puertos para evitar bloqueos/CORS por túnel privado
if [[ -n "${CODESPACE_NAME:-}" ]]; then
  gh codespace ports visibility 3000:public 5173:public -c "$CODESPACE_NAME" || true
  echo "Ports 3000, 5173 set to public for codespace $CODESPACE_NAME"
fi

popd > /dev/null

echo "Services up. Frontend: http://localhost:5173 | Backend: http://localhost:3000 | IA (via backend): http://localhost:3000/api/ia-panel"
