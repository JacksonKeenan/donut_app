import { API_URL } from "../constants";

async function fetchAllOrders(page = 1) {
    const response = await fetch(`${API_URL}/orders?page=${page}`);
    if (!response.ok) {throw new Error(response.statusText);}
    return response.json();
}

async function fetchOrder(id) {
    const response = await fetch(`${API_URL}/orders/${id}`);
    if (!response.ok) {throw new Error(response.statusText);}
    return response.json();
}

async function createOrder(orderData) {
    const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        body: orderData,
    });

    if (!response.ok) {throw new Error(response.statusText);}
    return response.json()
}

async function updateOrder(id, orderData) {
    const response = await fetch(`${API_URL}/orders/${id}`, {
        method: "PUT",
        body: orderData,
    });

    if (!response.ok) {throw new Error(response.statusText);}
    return response.json()
}

async function deleteOrder(id) {
    const response = await fetch(`${API_URL}/orders/${id}`, {method: "DELETE"});
    if (response.status === 204) {return null}
    throw new Error(response.statusText);
}

async function searchOrders(query, page = 1) {
    const response = await fetch(`${API_URL}/search/orders/?q=${query}&page=${page}`)
    if (!response.ok) {
        throw new Error(response.statusText)
    }
    return response.json();
}
export { fetchAllOrders, fetchOrder, createOrder, updateOrder, deleteOrder, searchOrders }