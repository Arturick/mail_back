const nodemailer = require('nodemailer')
const config = require('../../data/config');
const userDTO = require('../dto/user')

let transporter = nodemailer.createTransport({
    host: config.emailHost,
    port: config.emailPort,
    secure: true,
    auth: {
        user: config.emailUser,
        pass: config.emailPassword,
    },
})

const  email = {
    confirmLink: async (email) => {

        let link = await userDTO.getLink(email)

        let info = await transporter.sendMail({
            from: config.emailUser, // sender address
            to: email , // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Здравствуйте, чтобы активировать свой аккаунт перейдите по ссылке" , // plain text body
            html: `<a href='http://localhost/user/confirmEmail/${link}'>http://127.0.0.1:8000/user/confirmEmail/${link}<a/>`, // html body
        });
        console.log(info);

    },
    sendCode : async (email, code) => {
        let info = await transporter.sendMail({
            from: config.emailUser, // sender address
            to: email , // list of receivers
            subject: "Hello ✔", // Subject line
            text: "Ниже прежставлен код с помощью которого вы можете заного авторизироваться" , // plain text body
            html: `<h1>${code}</h1>`, // html body
        });
        console.log(info);
    }

}
module.exports = email;