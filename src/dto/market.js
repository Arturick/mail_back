const marketDB = require('../models/market')

const market = {
    async add(email, tovarId, phone, firstC, secondC, thirdC, fourthC, fifthC, photo, price, adres){
        await marketDB.add(email, tovarId, phone, firstC, secondC, thirdC, fourthC, fifthC, photo, price, adres)
            .then()
            .catch()
    },
    async delete(email, tovarId){
        await marketDB.delete(email, tovarId)
            .then()
            .catch()

    },
    async get5(arg1, arg2, arg3, arg4, arg5){
        return await marketDB.get5(arg1, arg2, arg3, arg4, arg5)
            .then(answer => {
                return answer.rows
            })
    },
    async get4(arg1, arg2, arg3, arg4){
        return await marketDB.get4(arg1, arg2, arg3, arg4)
            .then(answer => {
                return answer.rows
            })

    },
    async get3(arg1, arg2, arg3){
        return await marketDB.get3(arg1, arg2, arg3)
            .then(answer => {
                return answer.rows
            })
    },
    async get2(arg1, arg2){
        return await marketDB.get2(arg1, arg2)
            .then(answer => {
                return answer.rows
            })
    },
    async get1(arg1){
        return await marketDB.get1(arg1)
            .then(answer => {
                return answer.rows
            })
    },
    async getAll(){
        return await marketDB.getAll()
            .then(answer => {
                return answer.rows
            })
    },
    async getMy(email){
        return await marketDB.getMy(email)
            .then(answer => {
                console.log(answer.rows)
                return answer.rows
            })
    }
}

module.exports = market;