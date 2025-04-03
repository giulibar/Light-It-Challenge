const express = require('express');
const patientController = require('../controllers/patient.controllers');
const validatePatient = require("../middlewares/patient.validators");
const upload = require("../middlewares/uploadImg");

const router = express.Router();

router.get('/', patientController.getAllPatients);
router.post("/", upload.single("document"), validatePatient, patientController.createPatient);

module.exports = router;
