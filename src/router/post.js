const Router = require('koa-router');
const Post = new Router();
const post = require('../controllers/post');
const bodyparser = require('koa-bodyparser');
Post.post('/create', bodyparser(), post.create)
Post.post('/delete', bodyparser(), post.delete)
Post.post('/get-my', bodyparser(), post.getMy)
Post.post('/get-all', bodyparser(), post.getAll)
Post.post('/get-one', bodyparser(), post.getOne)

module.exports = Post;