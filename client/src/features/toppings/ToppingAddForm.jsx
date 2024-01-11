import { useNavigate } from "react-router-dom"
import { createTopping } from "../../services/toppingService"
import ToppingForm from "./ToppingForm"
import { objectToFormData } from "../../utils/formDataHelper";

function ToppingAddForm() {
    const navigate = useNavigate();

    const handleAddSubmit = async(rawData) => {
        try {
            const response = await createTopping(objectToFormData({topping: rawData}))
            navigate(`/toppings/${response.id}`)
        }
        catch (e) {console.error("Failed to create topping: ", e)}
    }

    return (
        <ToppingForm
            headerText="Add Topping"
            buttonText="Add"
            onSubmit={handleAddSubmit}
        />
    )
}

export default ToppingAddForm
