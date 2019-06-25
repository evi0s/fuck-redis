import * as Koa from 'koa';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as bodyparser from 'koa-bodyparser';
import * as helmet from 'koa-helmet';
import * as koastatic from 'koa-static';

import * as config from './config';

const session = require('koa-session');
const RedisStore = require('koa2-session-redis');
const onerror = require('koa-onerror');

import { indexRouter } from './routes/index';

const app = new Koa();

onerror(app);

let sessionOpt = {
    store: new RedisStore({
        host: config.redishost,
        port: config.redisport
    }),
    key: 'SESSIONID',
    cookie: {
        maxAge: config.sessmaxage,
        httpOnly: true
    }
};

app.use(bodyparser());
app.use(json());
app.use(helmet());
app.use(logger());

app.keys = config.sesskey;
app.use(session(sessionOpt, app));

app.use(koastatic(__dirname + '/../static'));
app.use(indexRouter.routes());
app.use(indexRouter.allowedMethods());

app.listen(config.listenport, () => {
    console.log(`Running on port ${config.listenport}`);
});
