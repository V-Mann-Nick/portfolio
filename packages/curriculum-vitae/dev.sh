#!/usr/bin/env bash

# This script is used to run the development server.

pnpm tsx --watch-preserve-output --watch src/build.tsx &

if command -v zathura &> /dev/null
then
    while [ ! -f dist/cv.pdf ]
    do
      sleep 1
    done
    zathura dist/cv.pdf
fi

fg
