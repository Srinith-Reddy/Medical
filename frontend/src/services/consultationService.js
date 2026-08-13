import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const getConsultationsByPatient = async (patientId) => {
    const response = await API.get(
        `/consultations/patient/${patientId}`
    );
    return response.data;
};

export const getConsultationById = async (id) => {
    const response = await API.get(
        `/consultations/${id}`
    );
    return response.data;
};