import { useNavigate } from "react-router-dom"
import { createDonut } from "../../services/donutService"
import DonutForm from "./DonutForm"
import { objectToFormData } from "../../utils/formDataHelper";

function DonutAddForm() {
    const navigate = useNavigate();

    const handleAddSubmit = async(rawData) => {
        try {
            const response = await createDonut(objectToFormData({donut: rawData}))
            navigate(`/menu/${response.id}`)
        }
        catch (e) {console.error("Failed to create donut: ", e)}
    }

    return (
        <DonutForm
            headerText="Add Donut"
            buttonText="Add"
            onSubmit={handleAddSubmit}
        />
    )
}

export default DonutAddForm
