import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { fetchTopping, deleteTopping } from "../../services/toppingService"


function ToppingDetails () {
    const [topping, setTopping] = useState(null)
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchCurrentTopping = async () => {
            try {
                const json = await fetchTopping(id)
                setTopping(json)
            } catch (e) { console.error("Failed to fetch post:", e)}
        }
        fetchCurrentTopping();
    }, [id])

    const removeTopping = async () => {
        try {
            await deleteTopping(topping.id)
            navigate("/")
        } catch (e) {console.log("Failed to remove topping: ", e)}
    }

    if (!topping) return <h2>Loading...</h2>

    return <div>
        <h2>{topping.name}</h2>
        <div>
            {topping.image_url ?
            (<img src={topping.image_url} alt={topping.title} className="topping-image"/>) :
            (<div className="topping-image-stub">No Image Available</div>)}
        </div>
        <p>{topping.description}</p>
        <p>{topping.price}</p>
        <Link to={`/toppings/${topping.id}/edit`}>Edit</Link>
        {" | "}
        <Link to="/toppings">Back to Toppings</Link>
        {" | "}
        <button onClick={removeTopping}>Remove</button>
    </div>
}

export default ToppingDetails