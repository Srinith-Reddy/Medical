import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const getDoctors = async (organizationId) => {
    const response = await API.get(
        `/staff/organization/${organizationId}/doctors`
    );

    return response.data;
};