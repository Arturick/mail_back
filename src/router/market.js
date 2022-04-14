const Router = require('koa-router');
const Market = new Router();
const market = require('../controllers/market');
const bodyparser = require('koa-bodyparser');

Market.post('/add', bodyparser(), market.add)
Market.post('/delete', bodyparser(), market.delete)
Market.post('/get-all', bodyparser(), market.getAll)
Market.post('/get-1', bodyparser(), market.get1)
Market.post('/get-2', bodyparser(), market.get2)
Market.post('/get-3', bodyparser(), market.get3)
Market.post('/get-4', bodyparser(), market.get4)
Market.post('/get-5', bodyparser(), market.get5)
Market.post('/get-my', bodyparser(), market.getMy)

module.exports = Market;