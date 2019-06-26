#!/bin/sh

# Start redis server
/etc/init.d/redis-server start

# Install typescript
npm i typescript -g

exec su - www -c "yarn && npm start"
