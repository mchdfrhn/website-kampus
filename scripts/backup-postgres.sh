#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

# Load .env file if it exists but DO NOT overwrite existing environment variables
ENV_FILE="${ENV_FILE:-${PROJECT_ROOT}/.env}"
if [[ -f "${ENV_FILE}" ]]; then
  # Use a subshell to avoid polluting the current shell if we only want to load missing vars
  # However, standard practice for these scripts is to source it.
  # We use 'set -a' but we should ideally only set if not already set.
  while IFS='=' read -r key value; do
    # Skip comments and empty lines
    [[ "${key}" =~ ^#.*$ || -z "${key}" ]] && continue
    # Only export if not already set in environment
    if [[ -z "${!key:-}" ]]; then
      export "${key}=${value}"
    fi
  done < "${ENV_FILE}"
fi

# Database Connection (Priority: BACKUP_DATABASE_URL > DATABASE_URI)
export DATABASE_URL="${BACKUP_DATABASE_URL:-${DATABASE_URI:-}}"

# Backup Settings
export BACKUP_DIR="${BACKUP_DIR:-${PROJECT_ROOT}/backups/postgres}"
export BACKUP_RETENTION_DAYS="${BACKUP_RETENTION_DAYS:-14}"
export BACKUP_PREFIX="${BACKUP_PREFIX:-sttpu-postgres}"
export BACKUP_FORMAT="${BACKUP_FORMAT:-custom}"

# S3 / R2 Settings
export BACKUP_S3_ENABLED="${BACKUP_S3_ENABLED:-false}"
export BACKUP_S3_BUCKET="${BACKUP_S3_BUCKET:-${S3_BUCKET:-}}"
export BACKUP_S3_PREFIX="${BACKUP_S3_PREFIX:-postgres}"
export BACKUP_S3_REGION="${BACKUP_S3_REGION:-${S3_REGION:-us-east-1}}"
export BACKUP_S3_ENDPOINT="${BACKUP_S3_ENDPOINT:-${S3_ENDPOINT:-}}"
export BACKUP_S3_STORAGE_CLASS="${BACKUP_S3_STORAGE_CLASS:-STANDARD}"

# AWS SDK Credentials (Common fallbacks)
export AWS_ACCESS_KEY_ID="${BACKUP_S3_ACCESS_KEY_ID:-${AWS_ACCESS_KEY_ID:-${S3_ACCESS_KEY_ID:-}}}"
export AWS_SECRET_ACCESS_KEY="${BACKUP_S3_SECRET_ACCESS_KEY:-${AWS_SECRET_ACCESS_KEY:-${S3_SECRET_ACCESS_KEY:-}}}"
export AWS_DEFAULT_REGION="${BACKUP_S3_REGION}"

UPLOAD_SCRIPT="${PROJECT_ROOT}/scripts/upload-backup-to-s3.mjs"

if [[ -z "${DATABASE_URL}" ]]; then
  echo "Error: set BACKUP_DATABASE_URL or DATABASE_URI first."
  exit 1
fi

if ! command -v pg_dump >/dev/null 2>&1; then
  echo "Error: pg_dump is not installed or not in PATH."
  exit 1
fi

if [[ ! "${BACKUP_FORMAT}" =~ ^(custom|plain)$ ]]; then
  echo "Error: BACKUP_FORMAT must be 'custom' or 'plain'."
  exit 1
fi

if [[ ! "${BACKUP_S3_ENABLED}" =~ ^(true|false)$ ]]; then
  echo "Error: BACKUP_S3_ENABLED must be 'true' or 'false'."
  exit 1
fi

if [[ "${BACKUP_S3_ENABLED}" == "true" ]]; then
  if ! command -v node >/dev/null 2>&1; then
    echo "Error: node is not installed or not in PATH."
    exit 1
  fi

  if [[ ! -f "${UPLOAD_SCRIPT}" ]]; then
    echo "Error: upload script not found: ${UPLOAD_SCRIPT}"
    exit 1
  fi

  if [[ -z "${BACKUP_S3_BUCKET}" ]]; then
    echo "Error: BACKUP_S3_BUCKET is required when BACKUP_S3_ENABLED=true."
    exit 1
  fi

  if [[ -z "${AWS_ACCESS_KEY_ID}" || -z "${AWS_SECRET_ACCESS_KEY}" ]]; then
    echo "Error: set BACKUP_S3_ACCESS_KEY_ID / BACKUP_S3_SECRET_ACCESS_KEY (or AWS_/S3_ equivalents)."
    exit 1
  fi
fi

mkdir -p "${BACKUP_DIR}"

TIMESTAMP="$(date '+%Y-%m-%d_%H-%M-%S')"
TEMP_FILE=""
FINAL_FILE=""

cleanup() {
  if [[ -n "${TEMP_FILE}" && -f "${TEMP_FILE}" ]]; then
    rm -f "${TEMP_FILE}"
  fi
}
trap cleanup EXIT

if [[ "${BACKUP_FORMAT}" == "plain" ]]; then
  TEMP_FILE="${BACKUP_DIR}/${BACKUP_PREFIX}_${TIMESTAMP}.sql"
  FINAL_FILE="${TEMP_FILE}.gz"

  echo "Creating plain SQL backup..."
  pg_dump \
    --dbname="${DATABASE_URL}" \
    --no-owner \
    --no-privileges \
    --verbose \
    --file="${TEMP_FILE}"

  echo "Compressing backup..."
  gzip -f "${TEMP_FILE}"
else
  TEMP_FILE="${BACKUP_DIR}/${BACKUP_PREFIX}_${TIMESTAMP}.dump.part"
  FINAL_FILE="${BACKUP_DIR}/${BACKUP_PREFIX}_${TIMESTAMP}.dump"

  echo "Creating custom-format backup..."
  pg_dump \
    --dbname="${DATABASE_URL}" \
    --format=custom \
    --compress=9 \
    --no-owner \
    --no-privileges \
    --verbose \
    --file="${TEMP_FILE}"

  mv "${TEMP_FILE}" "${FINAL_FILE}"
  TEMP_FILE=""
fi

echo "Cleaning old backups older than ${BACKUP_RETENTION_DAYS} days..."
find "${BACKUP_DIR}" \
  -maxdepth 1 \
  -type f \
  \( -name "${BACKUP_PREFIX}_*.dump" -o -name "${BACKUP_PREFIX}_*.sql.gz" \) \
  -mtime +"${BACKUP_RETENTION_DAYS}" \
  -delete

if [[ -f "${FINAL_FILE}" ]]; then
  FILE_SIZE="$(du -h "${FINAL_FILE}" | awk '{print $1}')"
  echo "Backup completed: ${FINAL_FILE} (${FILE_SIZE})"
else
  echo "Error: backup file was not created."
  exit 1
fi

if [[ "${BACKUP_S3_ENABLED}" == "true" ]]; then
  echo "Uploading backup with Node.js S3 client..."
  node "${UPLOAD_SCRIPT}" "${FINAL_FILE}"
fi
