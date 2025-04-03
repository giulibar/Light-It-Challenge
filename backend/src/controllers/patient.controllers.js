const patientService = require('../services/patientService');
const NotificationManager = require('../services/notificationManager');

exports.getAllPatients = async (req, res, next) => {
    try {
        const patients = await patientService.getAllPatients();
        res.json(patients);
    } catch (error) {
        next(error);
    }
};

exports.createPatient = async (req, res, next) => {
    try {
        const patientData = {
            ...req.body,
            document: req.file ? req.file.path : null,
        };

        const patient = await patientService.createPatient(patientData);

        try {
            const notificationManager = new NotificationManager();
            const to = patient.email; 
            const subject = "¡Gracias por registrarte!";
            const text = `Hola ${patient.fullName}, gracias por registrarte en nuestro sistema.`;
            const html = `<h1>¡Hola ${patient.fullName}!</h1><p>Gracias por registrarte en nuestro sistema.</p>`;
            await notificationManager.sendNotification('email', to, subject, text, html);
        } catch (error) {
            console.error("Error al enviar el correo de agradecimiento:", error);
        }

        res.status(201).json(patient);
    } catch (error) {
        next(error);
    }
};
