import React, { useEffect, useState } from "react"
import { useParams, useNavigate, Link, Navigate } from "react-router-dom";
import { fetchDonut, deleteDonut } from "../../services/donutService"


function DonutDetails () {
    const navigate = useNavigate();
    const [donut, setDonut] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const fetchCurrentDonut = async () => {
            try {
                const json = await fetchDonut(id)
                setDonut(json)
            } catch (e) { console.error("Failed to fetch post:", e)}
        }
        fetchCurrentDonut();
    }, [id])

    const removeDonut = async () => {
        try {
            await deleteDonut(donut.id)
            navigate("/")
        } catch (e) {console.log("Failed to remove donut: ", e)}
    }

    if (!donut) return <h2>Loading...</h2>

    return <div>
        <h2>{donut.name}</h2>
        <div>
            {donut.image_url ?
            (<img src={donut.image_url} alt={donut.title} className="donut-image"/>) :
            (<div className="donut-image-stub">No Image Available</div>)}
        </div>
        <p>{donut.description}</p>
        <p>{donut.price}</p>
        <Link to={`/menu/${donut.id}/edit`}>Edit</Link>
        {" | "}
        <Link to="/">Back to Menu</Link>
        {" | "}
        <button onClick={removeDonut}>Remove</button>
    </div>
}

export default DonutDetails