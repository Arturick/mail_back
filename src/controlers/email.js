const nodemailer = require("nodemailer");
const mailConfig = require('../../data/config')
const mailModule = require('../models/email')


class Email {
    async send(cxt) {
        console.log(1)
        const {name, email, company, website, message} = cxt.request.body;
        let mess
        if (!name || !email || !company || !website || !message) {
            cxt.status = 200;
            return cxt.body = {
                answer: "fail"
            }
        }
        if(!await mailModule.check(email)){
            cxt.status = 200;
            return cxt.body = {
                answer: "fail"
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

        let nick = name.substring(0,99),
            mail = email.substring(0,99),
            comp = company.substring(0,99),
            comp_web = website.substring(0,99)

        if(message.length > 499){
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
            subject: "Hello ???", // Subject line
            text: mess, // plain text body

        });
        console.log(new Date().toLocaleDateString(),new Date().toLocaleTimeString(),email)
        cxt.code = 200;
        cxt.body = {
            answer : 'success'
        }



    }
}










module.exports = new Email();