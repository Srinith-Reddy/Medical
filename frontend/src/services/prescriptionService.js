import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const createPrescription = async (data) => {
    const response = await API.post("/prescriptions", data);
    return response.data;
};

export const getPrescriptionById = async (id) => {
    const response = await API.get(`/prescriptions/${id}`);
    return response.data;
};