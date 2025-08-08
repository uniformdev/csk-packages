#!/usr/bin/env bash
set -euo pipefail

# --- Find monorepo root ---
get_repo_root() {
  local git_root script_dir derived_root

  git_root=$(git rev-parse --show-toplevel 2>/dev/null || true)
  if [[ -n "${git_root}" && -d "${git_root}/packages" ]]; then
    echo "${git_root}"
    return
  fi

  script_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" >/dev/null 2>&1 && pwd)"
  if [[ "${script_dir}" == *"/packages/"* ]]; then
    derived_root="$(echo "${script_dir}" | sed -E 's|(.*)/packages/.*|\1|')"
    if [[ -d "${derived_root}/packages" ]]; then
      echo "${derived_root}"
      return
    fi
  fi

  if [[ -d "./packages" ]]; then
    pwd
    return
  fi

  echo "❌ Unable to determine repo root." >&2
  exit 1
}

ROOT_DIR="$(get_repo_root)"
OUTPUT_DIR="${ROOT_DIR}/tgz"

echo "🗂  Repo root: ${ROOT_DIR}"
echo "📁 Output dir: ${OUTPUT_DIR}"

command -v jq >/dev/null || { echo "❌ 'jq' is required. Install it and re-run."; exit 1; }
mkdir -p "${OUTPUT_DIR}"

cd "${ROOT_DIR}"

for pkg in packages/*; do
  if [[ -f "${pkg}/package.json" ]]; then
    VERSION=$(jq -r '.version' "${pkg}/package.json")
    NAME=$(jq -r '.name' "${pkg}/package.json")
    echo "📦 Packing ${NAME}@${VERSION} from ${pkg}"

    (cd "${pkg}" && npm pack --pack-destination "${OUTPUT_DIR}")
  fi
done

echo "✅ Success. All .tgz saved to ${OUTPUT_DIR}"