class NotificationInterface {
    async send(to, subject, text, html) {
        throw new Error("Metodo de envio de notificaciones");
    }
}

module.exports = NotificationInterface;
