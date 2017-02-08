#!/bin/bash
# Create new bundle
RELEASE_VERSION=$(node -pe "require('./package.json').version")

echo "Creating new bundle"
react-native bundle \
  --dev false \
  --platform ios \
  --entry-file index.ios.js \
  --bundle-output main.jsbundle \
  --sourcemap-output main.jsbundle.map

# Create new release on sentry
echo "Creating new realease on sentry"
curl "https://sentry.io/api/0/projects/shopster/fri-informativni-dan/releases/" \
  -X POST \
  -H "Authorization: Bearer 04985e56e12c485390fd338d17832145c84eb4c40a5849299142f9858ad53d63" \
  -H "Content-Type: application/json" \
  -d "{ \"version\": \"${RELEASE_VERSION}\" }"

# Upload source
echo "Uploading source to sentry"
curl "https://sentry.io/api/0/projects/shopster/fri-informativni-dan/releases/${RELEASE_VERSION}/files/" \
  -X POST \
  -H "Authorization: Bearer 04985e56e12c485390fd338d17832145c84eb4c40a5849299142f9858ad53d63" \
  -F file=@main.jsbundle \
  -F name="/main.jsbundle"

# Upload sourcemaps
echo "Uploading sourcemaps to sentry"
curl "https://sentry.io/api/0/projects/shopster/fri-informativni-dan/releases/${RELEASE_VERSION}/files/" \
  -X POST \
  -H "Authorization: Bearer 04985e56e12c485390fd338d17832145c84eb4c40a5849299142f9858ad53d63" \
  -F file=@main.jsbundle.map \
  -F name="/main.jsbundle.map"
