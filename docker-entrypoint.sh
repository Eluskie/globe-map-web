#!/bin/sh
set -eu

token="${VITE_MAPBOX_TOKEN:-}"

# Escape backslashes and double quotes for a safe JS string literal.
escaped=$(printf '%s' "$token" | sed 's/\\/\\\\/g; s/"/\\"/g')

cat > /usr/share/nginx/html/config.js <<EOF
window.__ENV__ = {
  VITE_MAPBOX_TOKEN: "${escaped}"
};
EOF

exec nginx -g "daemon off;"
