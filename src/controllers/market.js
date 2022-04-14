const tokenS = require('../Service/Token')
const marketDTO = require('../dto/market')

class Market {
    async add(cxt){
        const {email,  phone, firstC, secondC, thirdC, fourthC, fifthC, photo, price, link, adres, token} = cxt.request.body;
        if( !email ||  !phone || !firstC || !secondC || !thirdC || !fourthC || !fifthC || !photo || !price || !adres || !token){
            cxt.code = 403;
            cxt.body = {
                answer : "need all data"
            }
        }
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        let tovarId = Math.floor(Math.random() * (999999999999999 - 100000000000000) + 100000000000000);
        await marketDTO.add(email, tovarId, phone, firstC, secondC, thirdC, fourthC, fifthC, photo, link, price, adres)
        cxt.code = 200;
        cxt.body = {
            answer : {tid : tovarId}
        }


    }
    async delete(cxt){
        const {email, tovarId} = cxt.request.body;
        if(!email || !tovarId){
            cxt.code = 403;
            cxt.body = {
                answer : "need all data"
            }
        }
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        marketDTO.delete(email, tovarId)
        cxt.code = 200;

    }
    async get1(cxt){
        const { arg1, token } = cxt.request.body;
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        let list = await marketDTO.get1(arg1)
        cxt.code = 200;
        cxt.body = {
            answer : list
        }
    }
    async get2(cxt){
        const { arg1, arg2, token } = cxt.request.body;
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        let list = await marketDTO.get2(arg1, arg2)
        cxt.code = 200;
        cxt.body = {
            answer : list
        }
    }
    async get3(cxt){
        const { arg1, arg2, arg3, token } = cxt.request.body;
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        let list = await marketDTO.get3(arg1, arg2, arg3)
        cxt.code = 200;
        cxt.body = {
            answer : list
        }
    }
    async get4(cxt){
        const { arg1, arg2, arg3, arg4, token } = cxt.request.body;
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        let list = await marketDTO.get4(arg1, arg2, arg3, arg4)
        cxt.code = 200;
        cxt.body = {
            answer : list
        }
    }
    async get5(cxt){
        const { arg1, arg2, arg3, arg4, arg5, token } = cxt.request.body;
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        let list = await marketDTO.get5(arg1, arg2, arg3, arg4, arg5)
        cxt.code = 200;
        cxt.body = {
            answer : list
        }
    }

    async getAll(cxt){
        const  { token } = cxt.request.body;
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        let list = await marketDTO.getAll()
        cxt.code = 200;
        cxt.body = {
            answer : list
        }
    }
    async getMy(cxt){
        const  { token, email } = cxt.request.body;
        if(!tokenS.verifyToken(token)){
            cxt.body = {
                answer : 'invalid token'
            }
        }
        let list = await marketDTO.getMy(email)
        cxt.code = 200;
        cxt.body = {
            answer : list
        }
    }
}

module.exports = new Market();