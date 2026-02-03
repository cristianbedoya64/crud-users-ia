#!/usr/bin/env bash
set -euo pipefail

# Arranca todos los servicios en segundo plano (incluye override de desarrollo si existe)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
DockerComposeCmd="docker compose"
pushd "$ROOT_DIR" > /dev/null

RUN_MODE="${RUN_MODE:-}"
if [[ -z "$RUN_MODE" ]]; then
  if [[ -n "${CODESPACE_NAME:-}" ]]; then
    RUN_MODE="codespaces"
  else
    RUN_MODE="local"
  fi
fi

COMPOSE_FILE=""
if [[ "$RUN_MODE" == "prod-demo" ]]; then
  COMPOSE_FILE="-f docker-compose.prod.yml"
fi

echo "Starting services (mode: $RUN_MODE)"
${DockerComposeCmd} $COMPOSE_FILE up -d --build

# Espera a que Postgres esté listo
DB_USER="${DB_USER:-postgres}"
DB_NAME="${DB_NAME:-uarp_ai}"
DB_READY=0
for i in {1..20}; do
  if ${DockerComposeCmd} $COMPOSE_FILE exec -T postgres pg_isready -U "$DB_USER" -d "$DB_NAME" >/dev/null 2>&1; then
    DB_READY=1
    echo "Postgres listo."
    break
  fi
  echo "Esperando Postgres... (intento $i/20)"
  sleep 3
done

if [[ $DB_READY -ne 1 ]]; then
  echo "Postgres no está listo. Revisa logs antes de continuar."
fi

# Migraciones
MIGRATE_MODE="${MIGRATE_MODE:-}"
if [[ -z "$MIGRATE_MODE" ]]; then
  if [[ "$RUN_MODE" == "prod-demo" ]]; then
    MIGRATE_MODE="migrations"
  else
    MIGRATE_MODE="sync"
  fi
fi
MIGRATE_OK=0
for i in {1..5}; do
  MIGRATE_MODE="$MIGRATE_MODE" ${DockerComposeCmd} $COMPOSE_FILE exec -T backend node src/migrate.js
  if [[ $? -eq 0 ]]; then
    MIGRATE_OK=1
    echo "Migración completada (mode: $MIGRATE_MODE)."
    break
  fi
  echo "Migración falló (intento $i/5). Reintentando en 3s..."
  sleep 3
done
if [[ $MIGRATE_OK -ne 1 ]]; then
  echo "No se pudo ejecutar la migración automáticamente. Revisa el backend/logs."
fi

# Ejecuta seed para asegurar credenciales y datos demo
SEED_MODE="${SEED_MODE:-}"
if [[ -z "$SEED_MODE" ]]; then
  if [[ "$RUN_MODE" == "prod-demo" ]]; then
    SEED_MODE="prod"
  else
    SEED_MODE="demo"
  fi
fi
if [[ "$SEED_MODE" != "skip" ]]; then
  set +e
  seed_ok=0
  for i in {1..10}; do
    SEED_MODE="$SEED_MODE" ${DockerComposeCmd} $COMPOSE_FILE exec -T backend node src/seed.js
    if [[ $? -eq 0 ]]; then
      seed_ok=1
      echo "Seed completado (mode: $SEED_MODE)."
      break
    fi
    echo "Seed falló (intento $i/10). Reintentando en 3s..."
    sleep 3
  done
  set -e
  if [[ $seed_ok -ne 1 ]]; then
    echo "No se pudo ejecutar el seed automáticamente. Revisa el backend/logs."
  fi
else
  echo "Seed omitido (SEED_MODE=skip)."
fi

# Si estamos en Codespaces, expone puertos para evitar bloqueos/CORS por túnel privado
if [[ -n "${CODESPACE_NAME:-}" ]]; then
  gh codespace ports visibility 3000:public 5173:public -c "$CODESPACE_NAME" || true
  echo "Ports 3000, 5173 set to public for codespace $CODESPACE_NAME"
fi

popd > /dev/null

echo "Services up. Frontend: http://localhost:5173 | Backend: http://localhost:3000 | IA (via backend): http://localhost:3000/api/ia-panel"
