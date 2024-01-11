import { useState } from "react"
import PropTypes from "prop-types"

function DonutForm({ donut, headerText, onSubmit, buttonText }) {
    const [formData, setFormData] = useState(donut || {
        name: "",
        image: "",
        description: "",
        price: null,
        sold_out: false,
    })

    return (
        <div>
            <h2>{headerText}</h2>
            <form className="donut-form" onSubmit={(e) => {
                e.preventDefault()
                onSubmit(formData)
            }}>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({
                            ...formData,
                            name: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="image">Image: </label>
                    <input
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFormData({
                            ...formData,
                            image: e.target.files[0]
                        })}
                    />
                </div>
                <div>
                    <label htmlFor="description">Descripton: </label>
                    <textarea
                        id="description"
                        type="text"
                        value={formData.description}
                        onChange={(e) => setFormData({
                            ...formData,
                            description: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="price">Price: </label>
                    <input
                        id="price"
                        type="number"
                        value={formData.price}
                        step={0.01}
                        onChange={(e) => setFormData({
                            ...formData,
                            price: e.target.value
                        })}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="sold-out">Sold Out: </label>
                    <input
                        id="sold-out"
                        type="checkbox"
                        checked={formData.sold_out}
                        onChange={(e) => {
                            setFormData({...formData, sold_out: !formData.sold_out})
                        }}
                    />
                </div>
                <div>
                    <button type="submit">{buttonText}</button>
                </div>
            </form>
        </div>
    )
}

DonutForm.propTypes = {
    donut: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        sold_out: PropTypes.bool.isRequired,
    }),

    headerText: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    buttonText: PropTypes.string.isRequired,
}

DonutForm.defaultProps = { post: null }

export default DonutForm