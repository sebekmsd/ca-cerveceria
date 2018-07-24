#!/bin/bash

docker run -ti --rm -v $(pwd)/autcontrol:/app -p 80:3000 node:4.3.1 node /app/bin/www
