import { API_URL } from "../constants";

async function fetchAllDonuts(page = 1) {
    const response = await fetch(`${API_URL}/donuts?page=${page}`);
    if (!response.ok) {throw new Error(response.statusText);}
    return response.json();
}

async function fetchDonut(id) {
    const response = await fetch(`${API_URL}/donuts/${id}`);
    if (!response.ok) {throw new Error(response.statusText);}
    return response.json();
}

async function createDonut(donutData) {
    const response = await fetch(`${API_URL}/donuts`, {
        method: "POST",
        body: donutData,
    });

    if (!response.ok) {throw new Error(response.statusText);}
    return response.json()
}

async function updateDonut(id, donutData) {
    const response = await fetch(`${API_URL}/donuts/${id}`, {
        method: "PUT",
        body: donutData,
    });

    if (!response.ok) {throw new Error(response.statusText);}
    return response.json()
}

async function deleteDonut(id) {
    const response = await fetch(`${API_URL}/donuts/${id}`, {method: "DELETE"});
    if (response.status === 204) {return null}
    throw new Error(response.statusText);
}

async function searchDonuts(query, page = 1) {
    const response = await fetch(`${API_URL}/search/donuts/?q=${query}&page=${page}`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json();
}
export { fetchAllDonuts, fetchDonut, createDonut, updateDonut, deleteDonut, searchDonuts }