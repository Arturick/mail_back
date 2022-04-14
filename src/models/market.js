const config = require('../../data/config');
const {Pool} = require('pg')
const connection = new Pool(config.DB_LOG)

const market = {
    add: async (userId, tovarId, phone, firstC, secondC, thirdC, fourthC, fifthC, photo, link, price, adres) =>
        connection.query(`INSERT INTO market(userid, tovarid, phone, firstc, secondc, thirdc, fourthc, fifthc, photo, link, price,adres)
        VALUES('${userId}', '${tovarId}', '${phone}', '${firstC}', '${secondC}', '${thirdC}', '${fourthC}', '${fifthC}', '${photo}', '${link}', '${price}', '${adres}')
        `),
    delete: async (userId, tovarId) =>
        connection.query(`DELETE FROM market WHERE userId = '${userId} 'AND tovarId = '${tovarId}'`),
    getAll : async () =>
        connection.query(`SELECT * FROM market`),
    get1 : async (arg1) =>
        connection.query(`SELECT * FROM market WHERE firstc = '${arg1}'`),
    get2 : async (arg1, arg2) =>
        connection.query(`SELECT * FROM market WHERE firstc = '${arg1}' AND secondc = '${arg2}'`),
    get3 : async (arg1, arg2, arg3) =>
        connection.query(`SELECT * FROM market WHERE firstc = '${arg1}' AND secondc = '${arg2}' AND thirdc = '${arg3}'`),
    get4 : async (arg1, arg2, arg3, arg4) =>
        connection.query(`SELECT * FROM market WHERE firstc = '${arg1}' AND secondc = '${arg2}' AND thirdc = '${arg3}' AND fourthc = '${arg4}'`),
    get5 : async (arg1, arg2, arg3, arg4, arg5) =>
        connection.query(`SELECT * FROM market WHERE firstc = '${arg1}' AND secondc = '${arg2}' AND thirdc = '${arg3}' AND fourthc = '${arg4}' AND fifthc = '${arg5}'`),
    getMy: async (userId) =>
        connection.query(`SELECT * FROM market WHERE userid = ${userId}`),

}

module.exports = market;