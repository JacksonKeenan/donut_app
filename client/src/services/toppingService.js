import { API_URL } from "../constants";

async function fetchAllToppings(page = 1) {
    const response = await fetch(`${API_URL}/toppings?page=${page}`);
    if (!response.ok) {throw new Error(response.statusText);}
    return response.json();
}

async function fetchTopping(id) {
    const response = await fetch(`${API_URL}/toppings/${id}`);
    if (!response.ok) {throw new Error(response.statusText);}
    return response.json();
}

async function createTopping(toppingData) {
    const response = await fetch(`${API_URL}/toppings`, {
        method: "POST",
        body: toppingData,
    });

    if (!response.ok) {throw new Error(response.statusText);}
    return response.json()
}

async function updateTopping(id, toppingData) {
    const response = await fetch(`${API_URL}/toppings/${id}`, {
        method: "PUT",
        body: toppingData,
    });

    if (!response.ok) {throw new Error(response.statusText);}
    return response.json()
}

async function deleteTopping(id) {
    const response = await fetch(`${API_URL}/toppings/${id}`, {method: "DELETE"});
    if (response.status === 204) {return null}
    throw new Error(response.statusText);
}

async function searchToppings(query, page = 1) {
    const response = await fetch(`${API_URL}/search/toppings/?q=${query}&page=${page}`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json();
}
export { fetchAllToppings, fetchTopping, createTopping, updateTopping, deleteTopping, searchToppings }