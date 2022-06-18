const Router = require('koa-router');
const Email = new Router();
const email = require('../controlers/email');
const bodyparser = require('koa-bodyparser');

Email.post('/send',bodyparser(),email.send)

module.exports = Email;
