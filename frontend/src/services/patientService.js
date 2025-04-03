import axios from 'axios';

const API_URL = "http://localhost:3000/api/patients";

export const getPatients = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching patients:", error);
        throw error;
    }
};

export const addPatient = async (patientData) => {
    try {
        const response = await axios.post(API_URL, patientData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error adding patient:", error);
        throw error;
    }
}

