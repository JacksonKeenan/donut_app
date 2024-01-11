import { useState, useEffect } from "react";
import { fetchAllToppings, searchToppings } from "../services/toppingService";

function useToppingsData(searchTerm, page = 1) {
    const [toppings, setToppings] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalToppings, setTotalToppings] = useState(0)
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        async function loadToppings() {
            try {
                let data;
                if (searchTerm) {
                    data = await searchToppings(searchTerm, page)
                } else {
                    data = await fetchAllToppings(page)
                } 
                if (data.toppings) {
                    setToppings(data.toppings)
                    setTotalToppings(data.total_count)
                    setPerPage(data.per_page)
                }
            } catch (e) {
                setError(e)
                console.error("Failed to fetch toppings: ", e)
            } finally {
                setLoading(false)
            }
        }
        loadToppings();
    }, [searchTerm, page])
    

    return { toppings, loading, error, totalToppings, perPage }
}

export default useToppingsData