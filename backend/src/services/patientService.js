const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getPatientByEmail = async (email) => {
    const patient = await prisma.patient.findUnique({
        where: { email }
    });
    return patient;
};

exports.getAllPatients = async () => {
    return await prisma.Patient.findMany();
};

exports.createPatient = async (patientData) => {
    const existingPatient = await getPatientByEmail(patientData.email);
    if (existingPatient) {
        console.log("patient alr founnd")
        throw new Error("Email already in use");
    }

    const newPatient = await prisma.patient.create({
        data: patientData
    });

    return newPatient;
};
