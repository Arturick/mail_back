const config		= require('../../data/config');
const md5 			= require('md5');
const {Pool} = require('pg')
const connection = new Pool(config.DB_LOG)

const list = {
    "change" : 24,
    "login"   :1
}

const spamModel = {
    add:   (id , action) =>
        connection.query(
            `INSERT INTO spam(id, action , date ) VALUES ('${id}', '${action}' , NOW())`
        ),
    delete : (id,action) =>
        connection.query(
            `DELETE  FROM spam WHERE id = '${id}'  AND action = '${action}' AND  date < DATE_SUB(NOW(),INTERVAL '${list[action]}' HOUR) `
        ),
    select  : async (id,action) =>
        connection.query(
            `SELECT count(*) as count FROM spam WHERE id = '${id}' AND action = '${action}' AND date > DATE_SUB(NOW(),INTERVAL ${list[action]} HOUR) `
        ),
}

module.exports = spamModel;