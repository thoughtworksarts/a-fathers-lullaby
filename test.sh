#!/bin/bash

if ! lsof -Pi :3000 -sTCP:LISTEN >/dev/null; then
  echo "local host not running"
  echo "npm start"
  npm start&
  while ! nc -z localhost 3000 </dev/null; do sleep 2; done
fi

$(npm bin)/cypress run

lsof -ti tcp:3000 | xargs kill