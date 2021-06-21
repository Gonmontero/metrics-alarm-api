const sgMail = require('@sendgrid/mail')
const { EMAIL } = require('../config/environments')
const config = EMAIL


sgMail.setApiKey(config.SENDGRID_API_KEY)

const sendEmail = async (recipient, subject, text) => {
    try {
        await sgMail.send({
            to: recipient,
            from: 'montero.gonzalo90@gmail.com',
            subject: subject,
            text: text
        })
    } catch (err) {
        console.error(err);
    }
}

module.exports = {
    sendEmail,
}