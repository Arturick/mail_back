const config = require('../../data/config');
const {Pool} = require('pg')
const connection = new Pool(config.DB_LOG)

const comment = {
    add: async (userId, postId, commentId, text) =>
        connection.query(`INSERT INTO comment (userid, postid, commentid, text) VALUES('${userId}','${postId}','${commentId}','${text}')
        `),
    change: async (userId, postId, commentId, newText) =>
        connection.query(`UPDATE comment SET text = '${newText}' WHERE userid = '${userId}' AND postid = '${postId}' AND commentid = '${commentId}'`
        ),
    delete:async (userId, postId, commentId) =>
        connection.query(`DELETE FROM comment WHERE userid = '${userId}' AND postid = '${postId}' AND commentid = '${commentId}'`),
    getAll : async (userId, postId) =>
        connection.query(`SELECT * FROM comment WHERE userid = '${userId}' AND postid = '${postId}'`)

}

module.exports = comment;