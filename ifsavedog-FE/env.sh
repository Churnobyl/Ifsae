#!/bin/sh

# Debug: Print environment variables to check if they are set
echo "VITE_BASE_URL: $VITE_BASE_URL"
echo "VITE_AXIOS_TIMEOUT: $VITE_AXIOS_TIMEOUT"
echo "VITE_COOKIE_NAME_FOR_LANDING_PAGE: $VITE_COOKIE_NAME_FOR_LANDING_PAGE"
echo "VITE_COOKIE_MAX_AGE: $VITE_COOKIE_MAX_AGE"
echo "VITE_S3_VIDEO_URL: $VITE_S3_VIDEO_URL"

# Create env-config.js file
echo "window._env_ = {" > ./dist/env-config.js
echo "  VITE_BASE_URL: '${VITE_BASE_URL}'," >> ./dist/env-config.js
echo "  VITE_AXIOS_TIMEOUT: ${VITE_AXIOS_TIMEOUT}," >> ./dist/env-config.js
echo "  VITE_COOKIE_NAME_FOR_LANDING_PAGE: '${VITE_COOKIE_NAME_FOR_LANDING_PAGE}'," >> ./dist/env-config.js
echo "  VITE_COOKIE_MAX_AGE: '${VITE_COOKIE_MAX_AGE}'," >> ./dist/env-config.js
echo "  VITE_S3_VIDEO_URL: ${VITE_S3_VIDEO_URL}" >> ./dist/env-config.js
echo "};" >> ./dist/env-config.js

# Debug: Show contents of env-config.js to verify it's created
cat ./dist/env-config.js
