const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'roseordinals@gmail.com',
        pass: 'zutc owgr fqsx buul'
    }
});

exports.sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
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
};

