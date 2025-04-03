const patientService = require('../services/patient.service');

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
        res.status(201).json(patient);
    } catch (error) {
        next(error);
    }
};
