import axios from "axios";

const API_URL = "http://127.0.0.1:8000/medicines";

export const getAllMedicines = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createMedicine = async (medicineData) => {
    const response = await axios.post(API_URL, medicineData);
    return response.data;
};

export const getMedicineById = async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};

export const searchMedicines = async (name) => {
    const response = await axios.get(`${API_URL}/search`, {
        params: { name }
    });

    return response.data;
};