const config = require('../../data/config');
const md5 = require('md5');
const {Pool} = require('pg')
const connection = new Pool(config.DB_LOG)
const uuid = require('uuid').v4

const userModule = {
    register: async (email, name, password) =>
        connection.query(
            `INSERT INTO users (email, name, password, link, activate, resetcode) 
        VALUES ('${email}', '${name}', '${md5(password)}' ,  '${uuid()}' , 'false' , ${Math.floor(Math.random() * (9999 - 1000)) + 1000})`
        ),
    login: async (email, password) =>
        connection.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${md5(password)}'`),

    changePassword: async (email, validCode, newPassword) =>
        connection.query(`UPDATE users SET password = '${md5(newPassword)}' WHERE email = '${email}' AND resetCode = '${validCode}'`),

    confirmEmail: async (link) =>
        connection.query(`UPDATE users SET activate = 'true' WHERE link = '${link}'`),
    updateCode: async (email, newCode) =>
        connection.query(`UPDATE users SET resetcode = '${newCode}' WHERE  email = '${email}'`),
    getLink: async (email) =>
        connection.query(`SELECT link FROM users WHERE email = '${email}'`),
    findOne: async (email) =>
        connection.query(`SELECT count(*) FROM users WHERE email = '${email}'`),
    checkActivate : async email =>
        connection.query(`SELECT activate FROM users WHERE email = '${email}'`),
    getCode: async (email) =>
        connection.query(`SELECT resetcode FROM users WHERE email = '${email}'`)

}

module.exports = userModule;