const Router = require('koa-router');
const User = new Router();
const user = require('../controllers/user');
const bodyparser = require('koa-bodyparser');


User.post('/register', bodyparser(), user.register);
User.post('/login', bodyparser(), user.login);
User.post('/logout',bodyparser(), user.logout);
User.post('/change-password',bodyparser(), user.changePassword);
User.get('/confirmEmail/:code', bodyparser(), user.confirmEmail);
User.post('/sendCode', bodyparser(), user.sendCode);
User.post('/refresh-access-token', bodyparser(), user.refresh);




module.exports = User;