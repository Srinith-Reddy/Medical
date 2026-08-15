import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});


// Get all staff belonging to an organization
export const getStaffByOrganization = async (organizationId) => {

    const response = await API.get(
        `/staff/organization/${organizationId}`
    );

    return response.data;
};


// Get doctors belonging to an organization
export const getDoctorsByOrganization = async (organizationId) => {

    const response = await API.get(
        `/staff/organization/${organizationId}/doctors`
    );

    return response.data;
};


// Get a single staff member
export const getStaff = async (staffId) => {

    const response = await API.get(
        `/staff/${staffId}`
    );

    return response.data;
};