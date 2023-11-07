#!/usr/bin/env bash

# This script is used to run the development server.

pnpm tsx --watch-preserve-output --watch $1 &

if command -v zathura &> /dev/null
then
    while [ ! -f dist/cv.pdf ]
    do
      sleep 1
    done
    zathura $2
fi
