import axios from "axios";

const API = axios.create({
    baseURL: "http://127.0.0.1:8000",
});

export const getAllOrganizations = async () => {
    const response = await API.get("/organizations");
    return response.data;
};

export const getOrganization = async (id) => {
    const response = await API.get(`/organizations/${id}`);
    return response.data;
};

export const createOrganization = async (organizationData) => {
    const response = await API.post(
        "/organizations",
        organizationData
    );

    return response.data;
};

export const getOrganizationsByType = async (type) => {
    const response = await API.get(
        `/organizations/by-type?type=${type}`
    );

    return response.data;
};