import nodeMailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path'

const EMAIL_SEND = 'ruhu.ruhu19@gmail.com'
const EMAIL_SEND_PASS = 'ruhu.ruhu19'
const BASE_URL = 'http://localhost:4001/reset-password'

export const sendMail = (receivers, subject, html='', text='') => {
    return new Promise((resolve, reject) => {
        let transporter = nodeMailer.createTransport({
            service: 'gmail',
            auth: {
                user: EMAIL_SEND,
                pass: EMAIL_SEND_PASS
            }
        });
    
        let mailOptions = {
            from: EMAIL_SEND,
            to: receivers,
            subject: subject
        };
    
        if (html)
            mailOptions.html = html
    
        if (text)
            mailOptions.text = text
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log("=========", error);
                return reject(err)
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            resolve(info.response)
        });
    })
    
}

export const sendMailForgot = (code, email) => {
    return new Promise((resolve, reject) => {
        let link = BASE_URL + '?code=' + code
        let pathFile = path.join(__dirname, '../../views/email/email_forgot_password.ejs');
        ejs.renderFile(pathFile,{ email, link }, function (err, result) {
            if (err) {
                console.log('11111',err)
                return reject(err)
            }
            sendMail(email, 'Quên mật khẩu', result)
                .then(resp => resolve(resp))
                .catch(err => reject(err))
        });
    })
}