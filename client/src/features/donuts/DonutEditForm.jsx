import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchDonut, updateDonut } from "../../services/donutService"
import DonutForm from "./DonutForm";
import { objectToFormData } from "../../utils/formDataHelper";

function DonutEditForm() {
    const navigate = useNavigate();
    const [donut, setDonut] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        const fetchCurrentDonut = async () => {
            try {
                const json = await fetchDonut(id)
                setDonut(json)
            }
            catch (e) {console.error("Failed to fetch Donut: ". e)}
        }
        fetchCurrentDonut();

    }, [id])

    const handleEditSubmit = async (rawData) => {
        const sanitizedData = {
            name: rawData.name,
            description: rawData.description,
            price: rawData.price,
            image: rawData.image,
            sold_out: rawData.sold_out
        }
        const formData = objectToFormData({donut: sanitizedData})

        try {
            await updateDonut(id, formData)
            navigate(`/menu/${id}`)
        }
        catch (e) {console.error("Failed to update Donut: ", e)}
    }

    if (!donut) return <h2>Loading...</h2>

    return (
        <DonutForm
            donut={donut}
            headerText="Edit Donut"
            buttonText="Update"
            onSubmit={handleEditSubmit}
        />
    )
}

export default DonutEditForm