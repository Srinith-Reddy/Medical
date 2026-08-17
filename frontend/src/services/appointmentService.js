import axios from "axios";


const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


// --------------------------------------------------
// CREATE APPOINTMENT
// --------------------------------------------------

export const createAppointment = async (appointmentData) => {

    const response = await API.post(
        "/appointments",
        appointmentData
    );

    return response.data;

};


// --------------------------------------------------
// GET APPOINTMENT BY ID
// --------------------------------------------------

export const getAppointmentById = async (appointmentId) => {

    const response = await API.get(
        `/appointments/${appointmentId}`
    );

    return response.data;

};


// --------------------------------------------------
// GET PATIENT APPOINTMENTS
// --------------------------------------------------

export const getPatientAppointments = async (patientId) => {

    const response = await API.get(
        `/appointments/patient/${patientId}`
    );

    return response.data;

};


// --------------------------------------------------
// GET ORGANIZATION APPOINTMENTS
// --------------------------------------------------

export const getOrganizationAppointments = async (organizationId) => {

    const response = await API.get(
        `/appointments/organization/${organizationId}`
    );

    return response.data;

};


// --------------------------------------------------
// GET DOCTOR APPOINTMENTS
// --------------------------------------------------

export const getDoctorAppointments = async (doctorId) => {

    const response = await API.get(
        `/appointments/doctor/${doctorId}`
    );

    return response.data;

};


// --------------------------------------------------
// UPDATE APPOINTMENT STATUS
// --------------------------------------------------

export const updateAppointmentStatus = async (
    appointmentId,
    status
) => {

    const response = await API.patch(
        `/appointments/${appointmentId}/status`,
        {
            status: status
        }
    );

    return response.data;

};