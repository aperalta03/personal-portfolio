#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "[deploy] Building site..."
npm run build

echo "[deploy] Deploying to Firebase Hosting..."
firebase deploy --only hosting

echo "[deploy] Done."
