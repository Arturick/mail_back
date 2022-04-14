const commentDTO = require('../dto/comment');
const tokenS = require('../Service/Token');

class Comment {
    async add(cxt) {
        const {email, postId, text, Atoken} = cxt.request.body
        if (!email || !postId || !text || !Atoken) {
            cxt.body = {
                answer: 'need all data'
            }
            return 0;
        }
        if (!tokenS.verifyToken(Atoken)) {
            cxt.body = {
                answer: 'unauth'
            }
        }
        let commentId = Math.floor(Math.random() * (999999999999999 - 100000000000000) + 100000000000000);

        commentDTO.add(email, postId, commentId, text)
        cxt.code = 200;
        cxt.body = {
            answer: {cid: commentId}
        }

    }

    async fix(cxt) {
        const {email, postId, commentId, text, Atoken} = cxt.request.body
        if (!email || !postId || !text || !Atoken || !commentId) {
            cxt.body = {
                answer: 'need all data'
            }
            return 0;
        }
        if (!tokenS.verifyToken(Atoken)) {
            cxt.body = {
                answer: 'unauth'
            }
        }
        commentDTO.fix(email, postId, commentId, text)
        cxt.code = 200;

    }

    async delete(cxt) {
        const {email, postId, commentId, Atoken} = cxt.request.body;
        if (!email || !postId || !Atoken || !commentId) {
            cxt.body = {
                answer: 'need all data'
            }
            return 0;
        }
        if (!tokenS.verifyToken(Atoken)) {
            cxt.body = {
                answer: 'unauth'
            }
        }
        commentDTO.delete(email, postId, commentId, Atoken)
        cxt.code = 200;
    }
    async getAll(cxt){
        const {email, postId, Atoken} = cxt.request.body;
        if (!tokenS.verifyToken(Atoken)) {
            cxt.body = {
                answer: 'unauth'
            }
        }
        let list = await commentDTO.getAll(email, postId)
        cxt.code = 200;
        cxt.body = {
            answer : list
        }
    }

}

module.exports = new Comment()