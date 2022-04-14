
let Koa = require('koa');
let Router = require('koa-router');
const app = new Koa();
const router = new Router();
const bodyParser = require("koa-bodyparser");
const userRouter = require('./src/router/user')
const postRouter = require('./src/router/post')
const commentRouter = require('./src/router/comment')
const marketRouter = require('./src/router/market')

const PORT = require('./data/config').PORT
router.use('/user', userRouter.routes())
router.use('/post', postRouter.routes())
router.use('/comment', commentRouter.routes())
router.use('/market', marketRouter.routes())

app.use(router.routes())
app.use(bodyParser());


const start = async () => {
    try {
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    } catch (e) {
        console.log(e)
    }
}


start();