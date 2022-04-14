const postDTO = require('../dto/post')
const tokenS = require('../Service/Token')

class Post {
    async create(cxt) {
        try {

            const {email, title, text, Atoken} = cxt.request.body;
            if (!email || !title || !text || !Atoken) {
                cxt.code = 200;
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

            let postId = Math.floor(Math.random() * (999999999999999 - 100000000000000) + 100000000000000);
            await postDTO.create(email, postId, title, text)
            cxt.code = 200;
            cxt.body = {
                answer: {pid: postId}
            }

        } catch (e) {
            cxt.code = 500;
            cxt.body = {
                err: e
            }
        }
    }

    async delete(cxt) {
        try {

            const {email, postId, Atoken} = cxt.request.body;
            console.log(email, postId, Atoken, 1)
            if (!email || !postId || !Atoken) {
                cxt.code = 200;
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
            await postDTO.delete(email, postId)
            cxt.code = 200;

        } catch (e) {
            cxt.code = 500;
            cxt.body = {
                err: e
            }
        }
    }

    async getMy(cxt) {
        const {email, Atoken} = cxt.request.body;
        if (!email || !Atoken) {
            cxt.code = 200;
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
        let postList = await postDTO.getMy(email)
        cxt.code = 200;
        cxt.body = {
            answer: postList
        }
    }

    async getAll(cxt) {
        let postList = await postDTO.getAll()
        cxt.code = 200;
        cxt.body = {
            answer: postList
        }
    }

    async getOne(cxt) {
        const {email, postId, Atoken} = cxt.request.body;

        if (!email || !postId || !Atoken) {
            cxt.code = 200;
            cxt.body = {
                answer : 'need All data'
            }
            return 0;
        }
        if (!tokenS.verifyToken(Atoken)) {
            cxt.body = {
                answer: 'unauth'
            }
        }
        let post = await postDTO.getOne(email, postId)
        cxt.code = 200;
        cxt.body = {
            answer : post
        }

    }
}

module.exports = new Post()