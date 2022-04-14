const config		= require('../../data/config');
const {Pool} = require('pg')
const connection = new Pool(config.DB_LOG)

const postModule = {
    create : async (userId, postId ,title, text) =>
        connection.query(`INSERT INTO posts (userid, postid ,title, text) 
        VALUES ('${userId}', '${postId}', '${title}', '${text}')`
        ),
    delete : async (userId, postId) =>
        connection.query(`DELETE FROM posts WHERE userid = '${userId}' AND postid = '${postId}'`),
    getMy : async (userId) =>
        connection.query(`SELECT * FROM posts WHERE  userid = '${userId}'`),
    getAll : async () =>
        connection.query(`SELECT * FROM posts`),
    getOne : async (userId, postId) =>
        connection.query(`SELECT * FROM posts WHERE  userid = '${userId}' AND postid = '${postId}'`)

}

module.exports = postModule;