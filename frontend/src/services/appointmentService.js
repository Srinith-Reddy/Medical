import axios from "axios";


const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


// Create appointment

export const createAppointment = async (appointmentData) => {

    const response = await API.post(
        "/appointments",
        appointmentData
    );

    return response.data;

};


// Get appointment by ID

export const getAppointmentById = async (appointmentId) => {

    const response = await API.get(
        `/appointments/${appointmentId}`
    );

    return response.data;

};


// Get all appointments for a patient

export const getPatientAppointments = async (patientId) => {

    const response = await API.get(
        `/appointments/patient/${patientId}`
    );

    return response.data;

};


// Get all appointments for an organization

export const getOrganizationAppointments = async (organizationId) => {

    const response = await API.get(
        `/appointments/organization/${organizationId}`
    );

    return response.data;

};