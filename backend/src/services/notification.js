const mailsender = require('./mailsender')

exports.sendEmail = async (to, name) => {
    mailsender.sendEmail(to, `Welcome ${name}!`, "Welccome!", `<h1>Welcome to our platform ${name}!</h1>`);
}