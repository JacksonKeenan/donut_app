import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { deleteTopping } from '../../services/toppingService';

import ToppingSearch from "./ToppingSearch";
import useToppingsData from "../../hooks/useToppingsData"
import useURLSearchParam from "../../hooks/useURLSearchParam"

import "../../assets/stylesheets/Topping.css"
import Pagination from './Pagination';

function ToppingList() {
    const navigate = useNavigate();
    const [toppings, setToppings] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search")
    const [searchParams, setSearchParams] = useSearchParams()
    const initialPageFromURL = Number(searchParams.get("page") || "1")
    const [currentPage, setCurrentPage] = useState(initialPageFromURL)
    const {toppings: fetchedToppings, totalToppings, loading, error, perPage} = useToppingsData(debouncedSearchTerm, currentPage)

    useEffect(() => {
        if (fetchedToppings) {
            setToppings(fetchedToppings)
        }
    }, [fetchedToppings])

    useEffect(() => {
        const initialSearchTerm = searchParams.get("search") || ""
        setSearchTerm(initialSearchTerm)

        const pageFromURL = searchParams.get("page") || "1"
        setCurrentPage(Number(pageFromURL))
    }, [searchParams])

    const removeTopping = async (id) => {
        try {
            await deleteTopping(id)
            setToppings((prevToppings) => prevToppings.filter((topping) => topping.id !== id))
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
            <h2>Toppings</h2>
            <ToppingSearch
                value={searchTerm}
                onSearchChange={handleDebouncedSearchChange}
                onImmediateChange={handleImmediateSearchChange}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error loading toppings...</p>}
            <div className='topping-list'>
                {toppings.map((topping) => (
                    <div key={topping.id} className='topping-container'>
                        <Link to={`/toppings/${topping.id}`} className="topping-info">
                            <h3>{topping.name}</h3>
                            <div>
                                {topping.image_url ? (
                                    <img
                                        src={topping.image_url}
                                        alt={topping.title}
                                        className="topping-image"
                                    />
                                ) : (
                                    <div className="topping-image-stub">No Image Available</div>
                                )}
                            </div>
                            <p>{topping.description}</p>
                            <p>{topping.price}</p>
                        </Link>
                        <div className='topping-links'>
                            <button onClick={() => navigate(`/toppings/${topping.id}/edit`)}>Edit</button>
                            {" | "}
                            <button onClick={() => removeTopping(topping.id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalToppings={totalToppings}
                toppingsPerPage={perPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default ToppingList
