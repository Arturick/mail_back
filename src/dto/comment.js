const commentDB = require('../models/comment')

const Comment = {
    async add(email, postId, commentId, text) {
        await commentDB.add(email, postId, commentId)
    },
    async fix(email, postId, commentId, text){
        commentDB.change(email, postId, commentId, text)
    },
    async delete(email, postId, commentId){
        commentDB.delete(email, postId, commentId)
    },
    async getAll(email, postId){
        return await commentDB.getAll(email, postId)
            .then(answer => {
                console.log(answer.rows)
                return answer.rows
            })
    }
}

module.exports = Comment;