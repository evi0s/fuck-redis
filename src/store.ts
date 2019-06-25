import * as ioRedis from 'ioredis';

import {
    redishost,
    redisport
} from "./config";

let Redis = new ioRedis(redisport, redishost);

export { Redis };
