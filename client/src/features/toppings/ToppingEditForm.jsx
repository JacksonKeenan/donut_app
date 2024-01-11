import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { fetchTopping, updateTopping } from "../../services/toppingService"
import ToppingForm from "./ToppingForm";
import { objectToFormData } from "../../utils/formDataHelper";

function ToppingEditForm() {
    const [topping, setTopping] = useState(null)
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentTopping = async () => {
            try {
                const json = await fetchTopping(id)
                setTopping(json)
            }
            catch (e) {console.error("Failed to fetch Topping: ". e)}
        }
        fetchCurrentTopping();

    }, [id])

    const handleEditSubmit = async (rawData) => {
        const sanitizedData = {
            name: rawData.name,
            description: rawData.description,
            price: rawData.price,
            image: rawData.image,
            sold_out: rawData.sold_out
        }
        const formData = objectToFormData({topping: sanitizedData})

        try {
            await updateTopping(id, formData)
            navigate(`/toppings/${id}`)
        }
        catch (e) {console.error("Failed to update Topping: ", e)}
    }

    if (!topping) return <h2>Loading...</h2>

    return (
        <ToppingForm
            topping={topping}
            headerText="Edit Topping"
            buttonText="Update"
            onSubmit={handleEditSubmit}
        />
    )
}

export default ToppingEditForm