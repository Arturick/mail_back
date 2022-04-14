const Router = require('koa-router');
const Comment = new Router();
const comment = require('../controllers/comment');
const bodyparser = require('koa-bodyparser');

Comment.post('/add', bodyparser(), comment.add)
Comment.post('/fix', bodyparser(), comment.fix)
Comment.post('/delete', bodyparser(), comment.delete)
Comment.post('/get-all', bodyparser(), comment.getAll)

module.exports = Comment;