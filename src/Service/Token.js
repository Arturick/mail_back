const jwt = require('jsonwebtoken');
const config = require("../../data/config")
const uuid = require('uuid').v4;
const tokenModel = require('../models/token');

const token = {
    async createToken(userId){
        let aToken = jwt.sign({data: userId}, config.secretJWT, { expiresIn: '1h' });
        let refresh = uuid();
        await tokenModel.delete(userId);

        await tokenModel.add(userId,refresh);

        return  {refreshToken : refresh, accessToken : aToken}

    },
    async delete(userId){
        await tokenModel.delete(userId);
    },
    verifyToken(token) {
        try {
            jwt.verify(token, config.secretJWT);
            return true;
        } catch (e) {
            return false
        }

    },
    async update(userId, rToken){
        console.log(1)
        await tokenModel.find(userId, rToken)
            .then(answer => {

                if(!answer.rows[0]){
                    throw Error('invalid Token')
                }
            })
            .catch(err => {console.log(err)})

        let aToken = jwt.sign({data: userId}, config.secretJWT, { expiresIn: '1h' });
        let refresh = uuid();
        await tokenModel.delete(userId);

        await tokenModel.add(userId,refresh);

        return {refreshToken : refresh, accessToken : aToken}

    }
}

module.exports = token;