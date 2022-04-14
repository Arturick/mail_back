const userDTO = require('../dto/user')
const userModel = require('../models/user')
const postman = require('../Service/postman')
const token = require('../Service/Token')

function answer(cxt, tokens) {
    cxt.code = 200;
    cxt.body = {
        token: tokens
    }

}

class User {
    async register(cxt) {
        try {
            const {email, name, password} = cxt.request.body;
            console.log(1)
            if (!email || !name || !password) {
                cxt.code = 405
                cxt.body = {
                    error: 'need all data'
                }
                return 0;
            }
            if (await userDTO.findMail(email)) {
                cxt.code = 200;
                cxt.body = {
                    answer: 'not qunike email'
                }
                return 0;
            }
            await userDTO.register(email, name, password)
            postman.confirmLink(email)
            let tokens = await token.createToken(email)
            answer(cxt, tokens)

        } catch (e) {
            console.log(e)
            cxt.code = 500;
            cxt.body = {
                error: e
            }
        }


    }

    async login(cxt) {
        try {
            const {email, password} = cxt.request.body;
            if (!email || !password) {
                cxt.code = 405
                cxt.body = {
                    error: 'need all data'
                }
                return 0;
            }
            let verify = await userDTO.checkActivate(email, password)
            if(verify == 'false'){
                cxt.body = {
                    answer : 'email'
                }
            }

            let code = await userDTO.login(email,password)
            if(code == 200){
                let tokens = await token.createToken(email)
                answer(cxt, tokens)
                return 0;
            } else {
                cxt.code = 404;
                cxt.body = {
                    err : 'Not found'
                }

            }


        } catch (e) {
            cxt.code = 500;
            cxt.body = {
                error: e
            }

        }

    }
    async logout(cxt){
        try {
            const {email, tokens} = cxt.request.body;
            if(token.verifyToken(tokens)){
                token.delete(email);

            } else {
                cxt.code = 403;
                cxt.body = {
                    answer : 'invalid tokens'
                }
            }

        } catch (e) {
            cxt.code = 500;
            cxt.body = {
                error: e
            }
        }
    }
    async changePassword(cxt){
        try {
            const {email, code, newPassword} = cxt.request.body;
            let answ =  await userDTO.changePassword(email, code, newPassword)
            console.log(answ,1)
            if(!answ){
                cxt.body = {
                    answer : 'invalid code'
                }
                return 0;
            }
            cxt.code = 200;
            cxt.body = {
                answer : 'success'

            }

        } catch (e) {
            cxt.code = 500;
            cxt.body = {
                error: e
            }
        }
    }
    async sendCode(cxt){
        try {
            const { email } = cxt.request.body;
            if(!email){
                cxt.code = 403;
                cxt.body = {
                    answer : 'need all data!!'
                }
            }
            let code = await userDTO.getCode(email)
            postman.sendCode(email, code)


        } catch (e) {
            cxt.code = 500;
            cxt.body = {
                error: e
            }
        }
    }
    async confirmEmail(cxt){
        try {
            if (!cxt.params.code) {
                cxt.code = 403;
                return 0;
            }
            console.log(cxt.params.code,1)
            await userModel.confirmEmail(cxt.params.code)

        } catch (e) {
            cxt.code = 500;
            cxt.body = {
                error: e
            }
        }
    }
    async refresh(cxt){
        try {
            const {email, tokenR} = cxt.request.body;

            let tokens = await token.update(email, tokenR)
            console.log(1)
            answer(cxt, tokens)

        } catch (e) {
            cxt.code = 500;
            cxt.body = {
                error: e
            }
        }
    }
}

module.exports = new User()