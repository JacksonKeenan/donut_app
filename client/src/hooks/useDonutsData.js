import { useState, useEffect } from "react";
import { fetchAllDonuts, searchDonuts } from "../services/donutService";

function useDonutsData(searchTerm, page = 1) {
    const [donuts, setDonuts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [totalDonuts, setTotalDonuts] = useState(0)
    const [perPage, setPerPage] = useState(10)

    useEffect(() => {
        async function loadDonuts() {
            try {
                let data;
                if (searchTerm) {
                    data = await searchDonuts(searchTerm, page)
                } else {
                    data = await fetchAllDonuts(page)
                } 
                if (data.donuts) {
                    setDonuts(data.donuts)
                    setTotalDonuts(data.total_count)
                    setPerPage(data.per_page)
                }
            } catch (e) {
                setError(e)
                console.error("Failed to fetch donuts: ", e)
            } finally {
                setLoading(false)
            }
        }
        loadDonuts();
    }, [searchTerm, page])
    

    return { donuts, loading, error, totalDonuts, perPage }
}

export default useDonutsData