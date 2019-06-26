import * as Router from 'koa-router';
let xss = require('xss');

import * as noteController from '../controller/noteController';
import * as userController from '../controller/userController';

import { flag } from '../config';


const indexRouter = new Router();


indexRouter.get('/api', (ctx) => {
    ctx.body = 'Hello World!';
});


indexRouter.post('/api/login', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
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
    if (! result) {
        ctx.body = {"message": "Username or Password Error!"};
        return;
    }
    ctx.session.username = username;
    ctx.session.isAdmin  = false;
    ctx.body = xss(`{"message": "OK!", "username": "${username}"}`);
});


indexRouter.post('/api/register', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
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
        ctx.body = {"message": "Username Already Existed!"};
        return;
    }
    ctx.body = xss(`{"message": "OK!", "username": "${username}"}`);
});


indexRouter.post('/api/note', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
    let title   = ctx.request.body.title;
    let content = ctx.request.body.content;
    console.log(title);
    console.log(content);

    try {
        await noteController.submitNote(title, content);
    } catch (err) {
        ctx.throw(500, {"message": "Error in processing your request!"});
    }
    ctx.body = {"message": "OK!"};
});


indexRouter.get('/api/note/:title', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
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
        // ctx.throw(500, {"message": "Error in processing your request!"});
        ctx.body = {"message": "No Such note!"};
        return;
    }
    ctx.body = xss(`{"message": "OK!", "title": "${title}", "content": "${result}"}`);
});


indexRouter.get('/api/search', async (ctx) => {
    ctx.set('Content-Type', 'application/json');
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
        // ctx.throw(500, {"message": "Error in processing your request!"});
        ctx.body = {"message": "No Such note!"};
        return;
    }
    ctx.body = xss(`{"message": "OK!", "title": "${title}", "content": "${result}"}`);
});


indexRouter.get('/api/admin', (ctx) => {
    ctx.set('Content-Type', 'application/json');
    if (! ctx.session || ctx.session == null) {
        ctx.body = {"message": "Login first!"};
        return;
    }

    if (! ctx.session.isAdmin) {
        ctx.body = {"message": "You are not ADMIN!"};
        return;
    }
    ctx.body = {"message": "OK!", "flag": flag};
});


indexRouter.get('/api/notes', (ctx) => {
    ctx.set('Content-Type', 'application/json');
    ctx.body = {"message": "Yes! I gugugued this!\nAnd, by this time you can't see all notes you have submitted...\nBut, I'm sure that I have stored your note."};
});


indexRouter.get('/api/status', (ctx) => {
    ctx.set('Content-Type', 'application/json');
    if (! ctx.session || ctx.session == null || ! ctx.session.username) {
        ctx.body = {"message": "No session!"};
        return;
    }
    // console.log(ctx.session);
    ctx.body = xss(`{"message": "OK!", "username": "${ctx.session.username}"}`);
});


export { indexRouter }
