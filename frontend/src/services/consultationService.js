import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


// Create a new consultation
export const createConsultation = async (data) => {
    const response = await API.post(
        "/consultations",
        data
    );

    return response.data;
};


// Get all consultations for a patient
export const getConsultationsByPatient = async (patientId) => {
    const response = await API.get(
        `/consultations/patient/${patientId}`
    );

    return response.data;
};


// Get a single consultation by ID
export const getConsultationById = async (id) => {
    const response = await API.get(
        `/consultations/${id}`
    );

    return response.data;
};