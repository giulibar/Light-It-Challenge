const EmailService = require('./mailsender');

class NotificationManager {
    constructor() {
        this.services = {
            email: new EmailService(),
        };
    }

    async sendNotification(type, to, subject, text, html = '') {
        if (!this.services[type]) {
            throw new Error(`Servicio de notificación "${type}" no soportado.`);
        }
        return this.services[type].send(to, subject, text, html);
    }
}

module.exports = NotificationManager;
