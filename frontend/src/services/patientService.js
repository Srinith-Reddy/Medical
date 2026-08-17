import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


export const getPatient = async (patientId) => {

    const response = await API.get(
        `/patients/${patientId}`
    );

    return response.data;
};


export const getAllPatients = async () => {

    const response = await API.get(
        "/patients"
    );

    return response.data;
};


export const getPatientsByOrganization = async (organizationId) => {

    const response = await API.get(
        `/patients/organization/${organizationId}`
    );

    return response.data;
};


// --------------------------------------------------
// GET PATIENTS BY DOCTOR
// --------------------------------------------------

export const getPatientsByDoctor = async (doctorId) => {

    const response = await API.get(
        `/patients/doctor/${doctorId}`
    );

    return response.data;
};


export const createPatient = async (patientData) => {

    const response = await API.post(
        "/patients",
        patientData
    );

    return response.data;
};


export const updatePatient = async (
    patientId,
    patientData
) => {

    const response = await API.patch(
        `/patients/${patientId}`,
        patientData
    );

    return response.data;
};