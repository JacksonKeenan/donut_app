import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { updateOrder } from '../../services/orderService';
import { objectToFormData } from "../../utils/formDataHelper";

import OrderSearch from "./OrderSearch";
import useOrdersData from "../../hooks/useOrdersData"
import useURLSearchParam from "../../hooks/useURLSearchParam"

import "../../assets/stylesheets/Order.css"
import Pagination from './Pagination';

function OrderList() {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useURLSearchParam("search")
    const [searchParams, setSearchParams] = useSearchParams()
    const initialPageFromURL = Number(searchParams.get("page") || "1")
    const [currentPage, setCurrentPage] = useState(initialPageFromURL)
    const {orders: fetchedOrders, totalOrders, loading, error, perPage} = useOrdersData(debouncedSearchTerm, currentPage)

    useEffect(() => {
        if (fetchedOrders) {
            setOrders(fetchedOrders)
        }
    }, [fetchedOrders])

    useEffect(() => {
        const initialSearchTerm = searchParams.get("search") || ""
        setSearchTerm(initialSearchTerm)

        const pageFromURL = searchParams.get("page") || "1"
        setCurrentPage(Number(pageFromURL))
    }, [searchParams])

    const completeOrder = async (id) => {
        const sanitizedData = {
            completed: true,
        }
        const formData = objectToFormData({order: sanitizedData})
        try {
            await updateOrder(id, formData)
            window.location.reload(); 
        }
        catch (e) {console.error("Failed to complete order: ", e)}
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
            <h2>Orders</h2>
            <OrderSearch
                value={searchTerm}
                onSearchChange={handleDebouncedSearchChange}
                onImmediateChange={handleImmediateSearchChange}
            />
            {loading && <p>Loading...</p>}
            {error && <p>Error loading orders...</p>}
            <div className="order-list">
                {orders.map((order) => (
                    <div key={order.id} className='order-container'>
                        <Link to={`/orders/${order.id}`} className="order-info">
                            <h3>Order #{order.id}</h3>
                            <p>Customer: {order.customer_name}</p>
                            <p>Email: {order.customer_email}</p>
                            <p>Phone: {order.customer_phone}</p>
                            <p>${order.total_price.toFixed(2)}</p>
                        </Link>
                        {!order.completed ? (
                            <div className='order-links'>
                                <button onClick={() => completeOrder(order.id)}>Complete Order</button>
                            </div>
                        ) : (
                            <p>Order Completed</p>
                        )}
                        
                    </div>
                ))}
            </div>
            <Pagination
                currentPage={currentPage}
                totalOrders={totalOrders}
                ordersPerPage={perPage}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default OrderList
