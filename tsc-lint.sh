#!/usr/bin/env bash

# This script is used to run TypeScript as a linter on a subset of files.

TMP=".lint-tsconfig.json"

function cleanup {
    rm $TMP
}
trap cleanup EXIT

cat >$TMP <<EOF
{
  "extends": "./tsconfig.json",
  "include": [
EOF
# For each argument, add a line to the include array with no comma on the last
for file in "$@"; do
    echo "    \"$file\"," >>$TMP
done
cat >>$TMP <<EOF
    "**/env.d.ts"
  ]
}
EOF

pnpm tsc --project $TMP --skipLibCheck --noEmit
