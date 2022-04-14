const userDB = require('../models/user')

const dto = {
    async register(email, name, password) {

        return await userDB.register(email, name, password)
            .then(answer => {
                return true;
            })
            .catch(err => {
                throw Error(err);
            })

    },
    async findMail(email){
        return await userDB.findOne(email)
            .then(answer => {
                console.log(answer.rows[0].count == '0')
                if(answer.rows[0].count != '0'){
                    return true
                } else {
                    return false
                }
            })

    },
    async login(email, password){
        return await userDB.login(email, password)
            .then(answer => {

                if(answer.rows[0]){
                    return 200;
                } else {
                    return 404;
                }
            })
            .catch(err => {
                console.log(err)
                throw Error(err);
            })
    },
    async getCode(email){
        return await userDB.getCode(email)
            .then(answer => {
                console.log(email,answer )

                return answer.rows[0].resetcode || 1234
            })
            .catch(err => {
                console.log(err)
                throw Error(err);
            })

    },
    async changePassword(email, code, newPassword){
        return await userDB.changePassword(email, code, newPassword)
            .then(  answer => {
                console.log(answer.rowCount)
                if(answer.rowCount == 1){
                    userDB.updateCode(email, Math.floor(Math.random() * (9999 - 1000)) + 1000)
                    return true;
                } else {
                    return false;
                }


            })
            .catch(err => {
                console.log(err)
                throw Error(err);
            })


    },
    async checkActivate(email, password){
        return await userDB.checkActivate(email)
            .then(answer => {
                if(answer.rows[0]){
                    console.log(answer.rows[0])
                    return answer.rows[0].activate
                } else {
                    return false
                }

            })
    },
    async getLink(email){
        return userDB.getLink(email)
            .then(answer => {
                console.log(answer)
                return answer.rows[0].link
            })
    }

}

module.exports = dto;