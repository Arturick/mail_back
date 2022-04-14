const config		= require('../../data/config');
const {Pool} = require('pg')
const connection = new Pool(config.DB_LOG)

const postModule = {
    create : async (userId, postId ,title, main) =>
        connection.query(`INSERT INTO article (userId, postId ,title, main) 
        VALUES ('${userId}', '${postId}', '${title}', '${main}')`
        ),
    delete : async (userId, postId) =>
        connection.query(`DELETE FROM article WHERE userId = '${userId}' AND postId = '${postId}'`),
    getMy : async (userId) =>
        connection.query(`SELECT * FROM article WHERE  userId = '${userId}'`),
    getAll : async () =>
        connection.query(`SELECT * FROM article`),
    getOne : async (userId, postId) =>
        connection.query(`SELECT * FROM article WHERE  userId = '${userId}' AND postId = '${postId}'`)

}

module.exports = postModule;