import { useState, useEffect } from "react";
import { fetchAllOrders, searchOrders } from "../services/orderService";

function useOrdersData(searchTerm, page = 1) {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalOrders, setTotalOrders] = useState(0)
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        async function loadOrders() {
            try {
                let data;
                if (searchTerm) {
                    data = await searchOrders(searchTerm, page)
                } else {
                    data = await fetchAllOrders(page)
                } 
                if (data.orders) {
                    setOrders(data.orders)
                    setTotalOrders(data.total_count)
                    setPerPage(data.per_page)
                }
            } catch (e) {
                setError(e)
                console.error("Failed to fetch orders: ", e)
            } finally {
                setLoading(false)
            }
        }
        loadOrders();
    }, [searchTerm, page])
    

    return { orders, loading, error, totalOrders, perPage }
}

export default useOrdersData