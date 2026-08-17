import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


export const getPatientRecords = async (patientId) => {

    const response = await API.get(
        `/records/patient/${patientId}`
    );

    return response.data;

};