#!/usr/bin/env bash
set -euo pipefail
repo="Centrova-ID/ruang-karya"
branch="main"
for file in github-assets/*.webp; do
  name="$(basename "$file")"
  content="$(base64 -w 0 "$file")"
  existing_sha="$(gh api "repos/$repo/contents/$file?ref=$branch" --jq '.sha' 2>/dev/null || true)"
  payload="$(mktemp)"
  if [[ -n "$existing_sha" ]]; then
    printf '{"message":"Add optimized Ruang Karya asset %s","content":"%s","branch":"%s","sha":"%s"}\n' "$name" "$content" "$branch" "$existing_sha" > "$payload"
  else
    printf '{"message":"Add optimized Ruang Karya asset %s","content":"%s","branch":"%s"}\n' "$name" "$content" "$branch" > "$payload"
  fi
  gh api "repos/$repo/contents/$file" --method PUT --input "$payload" --jq '.content.path'
  rm -f "$payload"
done
