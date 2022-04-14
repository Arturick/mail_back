const postDB = require('../models/post')

const post = {
    async create(email, postId, title, text){
        await postDB.create(email, postId, title, text)
            .then(answer => console.log(answer))
            .catch(err => console.log(err))
    },
    async delete(email, postId) {
        await postDB.delete(email, postId)
            .then(answer => {})
            .catch(err => {})

    },
    async getMy(email){
        return await postDB.getMy(email)
            .then(answer => {
                return answer.rows
            })
            .catch()
    },
    async getAll(){
        return await postDB.getAll().then(answer => answer.rows)
    },
    async getOne(email, postId){
        return await postDB.getOne(email, postId).then(answer => answer.rows)
    }

}
module.exports = post;