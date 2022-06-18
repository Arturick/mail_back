const nodemailer = require("nodemailer");
const mailConfig = require('../../data/config')
const mailModule = require('../models/email')


class Email {
    async send(cxt) {
        console.log(1)
        const {name, email, company, company_website, message} = cxt.request.body;
        let mess
        if (!name || !email || !company || !company_website || !message) {
            cxt.status = 200;
            return cxt.body = {
                answer: "not enough data"
            }
        }
        if(!await mailModule.check(email)){
            cxt.status = 200;
            return cxt.body = {
                answer: "too often req"
            }
        }

        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: mailConfig.emailHost,
            port: mailConfig.emailPort,
            secure: true, // true for 465, false for other ports
            auth: {
                user: mailConfig.emailUser, // generated ethereal user
                pass: mailConfig.emailPassword, // generated ethereal password
            },
        });

        let nick = name.substring(0,100),
            mail = email.substring(0,100),
            comp = company.substring(0,100),
            comp_web = company_website.substring(0,100)

        if(message.length > 500){
            mess =`
                Name: ${nick}
                Email: ${mail}
                Company: ${comp}
                Company website: ${comp_web}
                Message: Message length was trimmed due to long message. Original message length was ${message.length} chars.
            `
        } else {
            mess = `
                Name: ${nick}
                Email: ${mail}
                Company: ${comp}
                Company website: ${comp_web}
                Message: ${message}
            `
        }

        let info = await transporter.sendMail({
            from: mailConfig.emailUser, // sender address
            to: "testforcontactformnode@gmail.com", // list of receivers
            subject: "Hello ✔", // Subject line
            text: mess, // plain text body

        });
        console.log(new Date().toLocaleDateString(),new Date().toLocaleTimeString(),email)



    }
}










module.exports = new Email();