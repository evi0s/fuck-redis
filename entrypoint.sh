#!/bin/sh

# Start redis server
/etc/init.d/redis-server start

# Install typescript
npm i typescript -g

# Install depds
yarn

exec npm start
