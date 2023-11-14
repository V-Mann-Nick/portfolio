#!/usr/bin/env bash

# This script is used to run the development server.

pids=()

function cleanup {
  for pid in "${pids[@]}"
  do
    kill $pid
  done
}

trap cleanup EXIT

pnpm tsx --watch-preserve-output --watch ./src/build.tsx $1 &
pids+=($!)

if command -v zathura &> /dev/null
then
    while [ ! -f $2 ]
    do
      sleep 1
    done
    zathura $2 &
    pids+=($!)
fi

wait
