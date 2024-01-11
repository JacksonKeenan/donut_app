import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { deleteDonut } from '../../services/donutService';

import DonutSearch from "./DonutSearch";
import useDonutsData from "../../hooks/useDonutsData"
import useURLSearchParam from "../../hooks/useURLSearchParam"

import "../../assets/stylesheets/Donut.css"
import Pagination from './Pagination';

function DonutList() {
    const navigate = useNavigate();
    const [donuts, setDonuts] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search")
    const [searchParams, setSearchParams] = useSearchParams()
    const initialPageFromURL = Number(searchParams.get("page") || "1")
    const [currentPage, setCurrentPage] = useState(initialPageFromURL)
    const {donuts: fetchedDonuts, totalDonuts, loading, error, perPage} = useDonutsData(debouncedSearchTerm, currentPage)

    useEffect(() => {
        if (fetchedDonuts) {
            setDonuts(fetchedDonuts)
        }
    }, [fetchedDonuts])

    useEffect(() => {
        const initialSearchTerm = searchParams.get("search") || ""
        setSearchTerm(initialSearchTerm)

        const pageFromURL = searchParams.get("page") || "1"
        setCurrentPage(Number(pageFromURL))
    }, [searchParams])

    const removeDonut = async (id) => {
        try {
            await deleteDonut(id)
            setDonuts((prevDonuts) => prevDonuts.filter((donut) => donut.id !== id))
        }
        catch (e) {setError(e)}
    }

    const handleImmediateSearchChange = (searchValue) => {
        setSearchTerm(searchValue)
    }

    const handleDebouncedSearchChange = (searchValue) => {
        setDebouncedSearchTerm(searchValue)
    }

    const handlePageChange = (page) => {
        setCurrentPage(page)
        setSearchParams({ search: debouncedSearchTerm, page: page })
    }

    return (
        <div>
            <h2>Donuts</h2>
            <DonutSearch
                value={searchTerm}
                onSearchChange={handleDebouncedSearchChange}
                onImmediateChange={handleImmediateSearchChange}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error loading donuts...</p>}
            <div className="donut-list">
                {donuts.map((donut) => (
                    <div key={donut.id} className='donut-container'>
                        <Link to={`/menu/${donut.id}`} className="donut-info">
                            <h3>{donut.name}</h3>
                            <div>
                                {donut.image_url ? (
                                    <img
                                        src={donut.image_url}
                                        alt={donut.title}
                                        className="donut-image"
                                    />
                                ) : (
                                    <div className="donut-image-stub">No Image Available</div>
                                )}
                            </div>
                            <p>{donut.description}</p>
                            <p>{donut.price}</p>
                        </Link>
                        <div className='donut-links'>
                            <button onClick={() => navigate(`/menu/${donut.id}/edit`)}>Edit</button>
                            {" | "}
                            <button onClick={() => removeDonut(donut.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalDonuts={totalDonuts}
                donutsPerPage={perPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default DonutList
