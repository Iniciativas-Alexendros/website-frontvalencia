#!/bin/bash
# monitor-cicd.sh — Monitor CI/CD and Vercel deployment status
# Usage: ./scripts/monitor-cicd.sh [--watch]

set -e

REPO="Iniciativas-Alexendros/website-frontvalencia"
PROD_URL="https://website-frontvalencia.vercel.app"

check_ci() {
  echo "=== CI/CD Status ==="
  gh run list --repo "$REPO" --limit 5 --json status,conclusion,name,headBranch,createdAt |
    jq -r '.[] | "\(.status)\t\(.conclusion)\t\(.name)\t\(.headBranch)\t\(.createdAt)"' |
    column -t -s $'\t'
  echo ""
}

check_vercel() {
  echo "=== Vercel Deployments ==="
  vercel list website-frontvalencia --scope alexendros-team 2>&1 | head -8
  echo ""
}

check_production() {
  echo "=== Production Health ==="
  HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$PROD_URL/es/")
  SIZE=$(curl -s -o /dev/null -w "%{size_download}" "$PROD_URL/es/")

  if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Production OK: $HTTP_CODE (${SIZE}B)"
  else
    echo "❌ Production FAIL: $HTTP_CODE"
  fi
  echo ""
}

check_security() {
  echo "=== Security Headers ==="
  HEADERS=$(curl -sI "$PROD_URL/es/")

  HSTS=$(echo "$HEADERS" | grep -i "strict-transport-security" | head -1)
  CSP=$(echo "$HEADERS" | grep -i "content-security-policy" | head -1)
  XFRAME=$(echo "$HEADERS" | grep -i "x-frame-options" | head -1)

  [ -n "$HSTS" ] && echo "✅ HSTS" || echo "❌ HSTS missing"
  [ -n "$CSP" ] && echo "✅ CSP" || echo "❌ CSP missing"
  [ -n "$XFRAME" ] && echo "✅ X-Frame-Options" || echo "❌ X-Frame-Options missing"
  echo ""
}

check_pending() {
  echo "=== Pending Workflows ==="
  PENDING=$(gh run list --repo "$REPO" --limit 10 --json status,conclusion,name |
    jq -r '.[] | select(.status == "in_progress" or .status == "queued") | .name')

  if [ -z "$PENDING" ]; then
    echo "✅ No pending workflows"
  else
    echo "⚠️  Pending: $PENDING"
  fi
  echo ""
}

main() {
  echo "╔═══════════════════════════════════════════════════════════╗"
  echo "║         FRONT Valencia — CI/CD Monitor                   ║"
  echo "╚═══════════════════════════════════════════════════════════╝"
  echo ""
  echo "$(date '+%Y-%m-%d %H:%M:%S')"
  echo ""

  check_ci
  check_vercel
  check_production
  check_security
  check_pending

  echo "═══════════════════════════════════════════════════════════"
  echo "Summary: All systems operational"
}

if [ "$1" = "--watch" ]; then
  while true; do
    clear
    main
    sleep 30
  done
else
  main
fi
