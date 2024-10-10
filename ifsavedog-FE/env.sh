#!/bin/sh

# Debug: Print environment variables to check if they are set
echo "VITE_BASE_URL: $VITE_BASE_URL"
echo "VITE_AXIOS_TIMEOUT: $VITE_AXIOS_TIMEOUT"
echo "VITE_COOKIE_NAME_FOR_LANDING_PAGE: $VITE_COOKIE_NAME_FOR_LANDING_PAGE"
echo "VITE_COOKIE_MAX_AGE: $VITE_COOKIE_MAX_AGE"
echo "VITE_S3_VIDEO_URL: $VITE_S3_VIDEO_URL"

# Create env-config.js file
echo "window._env_ = {" > ./env-config.js
echo "  VITE_BASE_URL: '$VITE_BASE_URL'," >> ./env-config.js
echo "  VITE_AXIOS_TIMEOUT: $VITE_AXIOS_TIMEOUT," >> ./env-config.js
echo "  VITE_COOKIE_NAME_FOR_LANDING_PAGE: '$VITE_COOKIE_NAME_FOR_LANDING_PAGE'," >> ./env-config.js
echo "  VITE_COOKIE_MAX_AGE: $VITE_COOKIE_MAX_AGE," >> ./env-config.js
echo "  VITE_S3_VIDEO_URL: '$VITE_S3_VIDEO_URL'" >> ./env-config.js
echo "};" >> ./env-config.js

# Debug: Show contents of env-config.js to verify it's created
cat ./env-config.js
