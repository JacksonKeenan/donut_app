import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { fetchOrder, updateOrder } from "../../services/orderService"
import { objectToFormData } from "../../utils/formDataHelper";


function OrderDetails () {
    const [order, setOrder] = useState(null)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCurrentOrder = async () => {
            try {
                const json = await fetchOrder(id)
                setOrder(json)
            } catch (e) { console.error("Failed to fetch order:", e)}
        }
        fetchCurrentOrder();
    }, [id])

    const completeOrder = async () => {
        const sanitizedData = {
            completed: true,
        }
        const formData = objectToFormData({order: sanitizedData})
        try {
            await updateOrder(order.id, formData)
            navigate(`/orders`)
        }
        catch (e) {console.error("Failed to complete order: ", e)}
    }
    if (!order) return <h2>Loading...</h2>

    return <div className="order-details">
        <h2>Order #{order.id}</h2>
        <p>Customer: {order.customer_name}</p>
        <p>Email: {order.customer_email}</p>
        <p>Phone: {order.customer_phone}</p>
        <h3>Order Breakdown</h3>
        {order.order_items.map((order_item) => (
            <div key={order_item.id} className="order-item">
                <p>{order_item.donut_name} (${order_item.donut_price})</p>
                {order_item.order_item_toppings.map((order_item_topping) => (
                    <div key={order_item_topping.id} className="item-toppings">
                        <h4>Toppings</h4>
                        <p>{order_item_topping.topping_name} (${order_item_topping.topping_price})</p>
                    </div>
                ))}
            </div>
        ))}
        <p>${order.total_price.toFixed(2)}</p>
        <Link to="/orders">Back to Orders</Link>
        {" | "}
        {!order.completed ? (
                <button onClick={() => completeOrder(order.id)}>Complete Order</button>
        ) : (
            <span>Order Completed</span>
        )}
    </div>
}

export default OrderDetails