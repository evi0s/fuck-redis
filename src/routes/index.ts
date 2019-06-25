import * as Router from 'koa-router';
let xss = require('xss');

import * as noteController from '../controller/noteController';
import * as userController from '../controller/userController';


const indexRouter = new Router();


indexRouter.get('/api', (ctx) => {
    ctx.body = 'Hello World!';
});


indexRouter.post('/api/login', async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    console.log(username);
    console.log(password);

    let result: any;
    try {
        result = await userController.login(username, password);
    } catch (err) {
        ctx.throw(500, {"message": "Error in processing your request!"});
    }
    console.log(result);
    ctx.session.username = username;
    ctx.session.isAdmin  = false;
    ctx.body = xss(`{"message": "OK!", "username": "${username}"}`);
});


indexRouter.post('/api/register', async (ctx) => {
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    console.log(username);
    console.log(password);

    let result: any;
    try {
        result = await userController.register(username, password);
    } catch (err) {
        ctx.throw(500, {"message": "Error in processing your request!"});
    }
    console.log(result);
    if (! result) {
        ctx.body = xss(`{"message": "Username Already Existed!"}`);
        return;
    }
    ctx.body = xss(`{"message": "OK!", "username": "${username}"}`);
});


indexRouter.post('/api/note', async (ctx) => {
    let title   = ctx.request.body.title;
    let content = ctx.request.body.content;
    console.log(title);
    console.log(content);

    try {
        await noteController.submitNote(title, content);
    } catch (err) {
        ctx.throw(500, {"message": "Error in processing your request!"});
    }
    ctx.body = xss(`{"message": "OK!"}`);
});


indexRouter.get('/api/note/:title', async (ctx) => {
    let title = ctx.params.title;
    console.log(title);

    let result: any;
    try {
        result = await noteController.searchNote(title);
    } catch (err) {
        ctx.throw(500, {"message": "Error in processing your request!"});
    }
    console.log(result);
    if (! result) {
        ctx.throw(500, {"message": "Error in processing your request!"});
        return;
    }
    ctx.body = xss(`{"message": "OK!", "title": "${title}", "content": "${result}"}`);
});


indexRouter.get('/api/search', async (ctx) => {
    let title = ctx.request.query.title;
    console.log(title);

    let result: any;
    try {
        result = await noteController.searchNote(title);
    } catch (err) {
        ctx.throw(500, {"message": "Error in processing your request!"});
    }
    console.log(result);
    if (! result) {
        ctx.throw(500, {"message": "Error in processing your request!"});
        return;
    }
    ctx.body = xss(`{"message": "OK!", "title": "${title}", "content": "${result}"}`);
});


indexRouter.get('/api/admin', (ctx) => {
    if (! ctx.session || ctx.session == null) {
        ctx.body = {"message": "Login first!"};
        return;
    }

    if (! ctx.session.isAdmin) {
        ctx.body = {"message": "You are not ADMIN!"};
        return;
    }
    ctx.body = "cnss{xxxxxxxxxxxxxxxxxxxxx}";
});


export { indexRouter }