const nodemailer = require('nodemailer');
const NotificationInterface = require('./notificationInterface'); 

class EmailService extends NotificationInterface {
    constructor() {
        super();
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'roseordinals@gmail.com',
                pass: 'zutc owgr fqsx buul'
            }
        });
    }

    async send(to, subject, text, html) {
        try {
            const info = await this.transporter.sendMail({
                from: 'roseordinals@gmail.com',
                to,
                subject,
                text,
                html
            });
            console.log('Email enviado:', info.response);
        } catch (error) {
            console.error('Error al enviar el correo:', error);
        }
    }
}


module.exports = EmailService;