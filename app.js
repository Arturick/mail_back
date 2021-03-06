let Koa = require('koa');
let Router = require('koa-router');
let cors = require('@koa/cors');

const app = new Koa();
app.use(cors({
    credentials: true,
    origin: '*'
}))
const router = new Router();
const bodyParser = require("koa-bodyparser");
const PORT = require('./data/config').PORT

const emailRoute = require('./src/router/email')

router.use('/mail', emailRoute.routes())

if(!module.parent) {
    app
        .use(router.routes())
        .use(bodyParser())
        .listen(PORT,() => {
            console.log(`server in: 127.0.0.1:${PORT}`);
        });
}


